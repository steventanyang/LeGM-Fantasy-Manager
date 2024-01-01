import '../static/Team.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';

const PlayerStatus = (props: 
    { name: string; score: number; status: string }) => {

  const getStatusClass = () => {
    switch (props.status) {
      case 'ACTIVE':
        return 'status-in';
      case 'OUT':
        return 'status-out';
      case 'DAY_TO_DAY':
        return 'status-dtd';
      default:
        return 'status-unknown';
    }
  };

  const getDisplayStatus = () => {
    switch (props.status) {
      case 'ACTIVE':
        return 'ACT';
      case 'DAY_TO_DAY':
        return 'DTD';
      default:
        return props.status;
    }
  };

  return (
    <div className="team-player-status">
      <div className="team-player-score" style={{ backgroundColor: scoreColor(props.score) }}>{props.score}</div>
      <div className="team-player-name">{props.name}</div>
      <div className={`team-player-status-indicator ${getStatusClass()}`}>{getDisplayStatus()}</div>
    </div>
  );
};

const BigPlayerCard = () => {
  return (
    <>
      <div className='team-player-info-container'>

        <div className='horizontal-player-card'>

          <span className='image-status'>
            <span className="team-player-image-container">
              <img
                src='https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png'
                alt='name'
                className="team-player-image"
              />
            </span>
            <span className='team-player-card-status'>active</span>
          </span>

          <div className='home-stats-table-container'>
            <div className='home-stats-table-titles'>
              <p className='home-stats-table-titles-text'>FPPG</p>
              <p className='home-stats-table-titles-text'>position</p>
              <p className='home-stats-table-titles-text'>LeGM score</p>
              <p className='home-stats-table-titles-text'>pos rank</p>
              <p className='home-stats-table-titles-text'>ovr rank</p>
            </div>

            <div className='home-stats-table-values'>
              <p className='home-stats-table-values-text'>4</p>
              <p className='home-stats-table-values-text'>5</p>
              <p className='home-stats-table-values-text'>5</p>
              <p className='home-stats-table-values-text'>4</p>
              <p className='home-stats-table-values-text'>4</p>
            </div>
          </div>

        </div>

        <h2 className='team-player-title'>Shai Gilgeous-Alexander</h2>

        <div className='team-player-stats-container'>
          <div className='team-stats-table-container'>
            <div className='home-stats-table-titles'>
              <p className='team-stats-table-titles-text'>PTS</p>
              <p className='team-stats-table-titles-text'>AST</p>
              <p className='team-stats-table-titles-text'>REB</p>
              <p className='team-stats-table-titles-text'>TOV</p>
              <p className='team-stats-table-titles-text'>STL</p>
              <p className='team-stats-table-titles-text'>BLK</p>
            </div>

            <div className='team-stats-table-values'>
              <p className='team-stats-table-values-text'>4</p>
              <p className='team-stats-table-values-text'>5</p>
              <p className='team-stats-table-values-text'>5</p>
              <p className='team-stats-table-values-text'>4</p>
              <p className='team-stats-table-values-text'>4</p>
              <p className='team-stats-table-values-text'>4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const scoreColor = (score: number) => {
  if (score >= 50) {
    return 'green';
  } else if (score >= 40) {
    return 'orange';
  } else {
    return 'red';
  }
};

export default function Team() {

  const [players, setPlayers] = useState<Playerteam[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Playercard | null>(null);
  const [playerHead, setPlayerHead] = useState<Playerhead | null>(null);

  useEffect(() => {
    fetch('/players')
      .then(response => response.json())
      .then(data => {
        // Filter players with fantasyteam equals 1
        const filteredPlayers = data.filter((player: Playerteam) => player.fantasyteam === 1);
        setPlayers(filteredPlayers);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  }, []);

  const handleNewsItemClick = (playerName: string) => {
    fetch('/stats')
      .then(response => response.json())
      .then(data => {
        const stats = data.find((player: Playercard) => player.Name === playerName);
        if (stats) {
          setSelectedPlayer(stats);
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() => {

    if (selectedPlayer) {
      fetch('/players')
        .then(response => response.json())
        .then(data => {
          const stats = data.find((playerHead: Playerhead) => playerHead.name === selectedPlayer.Name);
          if (stats) {
            setPlayerHead(stats);
          }
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [selectedPlayer]);

  useEffect(() => {
    const element = document.querySelector('.bm-menu') as HTMLElement; // Replace with the actual selector for your element
    if (element) {
      element.style.overflow = 'visible';
    }
  }, []);

  return (
    <div>
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="team" className="menu-item" href="/team">Team</a>
        <a id="search" className="menu-item" href="/search">Search</a>
        <a id="aisearch" className="menu-item" href="/aisearch">AI Search</a>
        <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
        <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
      </Menu>
      <div className="team-page-container">

        <div className="team-list">
          <div className="team-list-title">
            <p className="team-title-text">score</p>
            <p className="team-title-text">status</p>
          </div>
          {players.map((player, index) => (
            <PlayerStatus key={index} name={player.name} score={player.score} status={player.status} />
          ))}
        </div>
        
        <div className='team-right-side'>
          <div className='team-title'>My Team</div>
            <BigPlayerCard/>
        </div>

      </div>
    </div>
  );
}
