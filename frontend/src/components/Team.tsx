import '../static/Team.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';

const PlayerStatus = (props: 
    { name: string; 
      score: number; 
      status: string 
      onPlayerClick: (title: string) => void;
    }
  ) => {

  const colorScore = (score: number) => {
    if (score >= 12) {
      return '#408416';
    } else if (score >= 8) {
      return '#86B16C';
    } else if (score >= 3) {
      return '#86B16C';
    } else if (score >= 0) {
      return '#DAC828';
    } else if (score >= -3) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };

  const colorStatus = (value: string) => {
    if (value == 'ACTIVE') {
      return '#408416';
    } else if (value == 'OUT') {
      return '#CB3434';
    } else {
      return '#E29853';
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
      <div className="team-player-score" style={{ backgroundColor: colorScore(props.score) }}>{props.score}</div>
      <div className="team-player-name" onClick={() => props.onPlayerClick(props.name)} >
        {props.name}
      </div>
      <div className={`team-player-status-indicator`} style={{ backgroundColor: colorStatus(props.status)}}>{getDisplayStatus()}</div>
    </div>
  );
};

const BigPlayerCard = ({ player, playerstats, imageUrl }: BigPlayerCardProps) => {

  const playerName = player?.Name as string;
  const playerGames = player?.Games as number;
  const totalPoints = player?.Points as number;
  const totalAssists = player?.Assists as number;
  const totalRebounds = player?.Rebounds as number;
  const totalTurnovers = player?.Turnovers as number;
  const totalSteals = player?.Steals as number;
  const totalBlocks = player?.BlockedShots as number;
  const totalFPPG = player?.FantasyPoints as number;

  const pts = parseFloat((totalPoints / playerGames).toFixed(1));
  const ast = parseFloat((totalAssists / playerGames).toFixed(1));
  const reb = parseFloat((totalRebounds / playerGames).toFixed(1));
  const tov = parseFloat((totalTurnovers / playerGames).toFixed(1));
  const stl = parseFloat((totalSteals / playerGames).toFixed(1));
  const blk = parseFloat((totalBlocks / playerGames).toFixed(1));
  const fppg = parseFloat((totalFPPG / playerGames).toFixed(1));
  
  const colorStatus = (value: string | undefined) => {
    if (value == 'ACTIVE') {
      return '#408416';
    } else if (value == 'OUT') {
      return '#CB3434';
    } else {
      return '#E29853';
    }
  };
  const colorFppg = (value: number | 0) => {
    if (value === 0) {
      return '#144458';
    } else if (value >= 55) {
      return '#408416';
    } else if (value >= 45) {
      return '#86B16C';
    } else if (value >= 35) {
      return '#86B16C';
    } else if (value >= 25) {
      return '#DAC828';
    } else if (value >= 15) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };
  const colorScore = (value: number | 0) => {
    if (value === 0) {
      return '#144458';
    } else if (value >= 15) {
      return '#408416';
    } else if (value >= 10) {
      return '#86B16C';
    } else if (value >= 5) {
      return '#86B16C';
    } else if (value >= 0) {
      return '#DAC828';
    } else if (value >= -5) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };
  const colorRank = (value: number | 0) => {
    if (value === 0) {
      return '#144458'; 
    } else if (value <= 10) {
      return '#408416';
    } else if (value <= 25) {
      return '#86B16C';
    } else if (value <= 50) {
      return '#86B16C';
    } else if (value <= 75) {
      return '#DAC828';
    } else if (value <= 100) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };
  const colorPosRank = (value: number | 0) => {
    if (value === 0) {
      return '#144458'; 
    } else if (value <= 10) {
      return '#408416';
    } else if (value <= 25) {
      return '#86B16C';
    } else if (value <= 50) {
      return '#86B16C';
    } else if (value <= 75) {
      return '#DAC828';
    } else if (value <= 100) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };

  const colorPts = (value: number) => {
    if (value >= 30) {
      return '#408416';
    } else if (value >= 25) {
      return '#86B16C';
    } else if (value >= 20) {
      return '#86B16C';
    } else if (value >= 15) {
      return '#DAC828';
    } else if (value >= 10) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };
  const widthPts = (value: number) => {
    if (value >= 30) {
      return '350px';
    } else if (value >= 25) {
      return '300px';
    } else if (value >= 20) {
      return '250px';
    } else if (value >= 15) {
      return '200px';
    } else if (value >= 10) {
      return '150px';
    } else {
      return '100px';
    }
  };

  const colorAstReb = (value: number) => {
    if (value >= 10) {
      return '#408416';
    } else if (value >= 8) {
      return '#86B16C';
    } else if (value >= 6) {
      return '#DAC828';
    } else if (value >= 4) {
      return '#E29853';
    } else if (value >= 2) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const widthAstReb = (value: number) => {
    if (value >= 10) {
      return '350px';
    } else if (value >= 8) {
      return '300px';
    } else if (value >= 6) {
      return '250px';
    } else if (value >= 4) {
      return '200px';
    } else if (value >= 2) {
      return '150px';
    } else {
      return '100px';
    }
  };

  const colorTov = (value: number) => {
    if (value <= 1.4) {
      return '#408416';
    } else if (value <= 2) {
      return '#86B16C';
    } else if (value <= 2.6) {
      return '#DAC828';
    } else if (value <= 3.2) {
      return '#E29853';
    } else if (value <= 3.8) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const widthTov = (value: number) => {
    if (value >= 3.8) {
      return '350px';
    } else if (value >= 3.2) {
      return '300px';
    } else if (value >= 2.6) {
      return '250px';
    } else if (value >= 2) {
      return '200px';
    } else if (value >= 1.4) {
      return '150px';
    } else {
      return '100px';
    }
  };

  const colorStlBlk = (value: number) => {
    if (value >= 2.1) {
      return '#408416';
    } else if (value >= 1.6) {
      return '#86B16C';
    } else if (value >= 1.1) {
      return '#DAC828';
    } else if (value >= 0.6) {
      return '#E29853';
    } else if (value >= 0.2) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const widthStlBlk = (value: number) => {
    if (value >= 2.6) {
      return '350px';
    } else if (value >= 2.1) {
      return '300px';
    } else if (value >= 1.6) {
      return '250px';
    } else if (value >= 1.1) {
      return '200px';
    } else if (value >= 0.6) {
      return '150px';
    } else {
      return '100px';
    }
  };

  return (
    <>
      <div className='team-player-info-container'>

        <div className='horizontal-player-card'>

          <span className='image-status'>
            <span className="team-player-image-container">
              <img
                src={imageUrl}
                alt='name'
                className="team-player-image"
              />
            </span>
            <span className='team-player-card-status' style={{ backgroundColor: colorStatus(playerstats?.status)}}>
              {playerstats?.status === 'DAY_TO_DAY' ? 'DAY TO DAY' : playerstats?.status}
            </span>
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
              <p className='home-stats-table-values-text' style={{ backgroundColor: colorFppg(fppg)}}>{fppg}</p>
              <p className='home-stats-table-values-text'>{playerstats?.pos || 'N/A'}</p>
              <p className='home-stats-table-values-text' style={{ backgroundColor: colorScore(playerstats?.score || 0)}}>{playerstats?.score || '?'}</p>
              <p className='home-stats-table-values-text' style={{ backgroundColor: colorRank(playerstats?.posrank || 0)}}>{playerstats?.posrank || '?'}</p>
              <p className='home-stats-table-values-text' style={{ backgroundColor: colorPosRank(playerstats?.ovrrank || 0)}}>{playerstats?.ovrrank || '?'}</p>
            </div>
          </div>

        </div>

        <h2 className='team-player-title'>{playerName}</h2>

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
              <p className='team-stats-table-values-text' style={{ backgroundColor: colorPts(pts), width: widthPts(pts)}}>{pts}</p>
              <p className='team-stats-table-values-text' style={{ backgroundColor: colorAstReb(ast), width: widthAstReb(ast)}}>{ast}</p>
              <p className='team-stats-table-values-text' style={{ backgroundColor: colorAstReb(reb), width: widthAstReb(reb)}}>{reb}</p>
              <p className='team-stats-table-values-text' style={{ backgroundColor: colorTov(tov), width: widthTov(tov)}}>{tov}</p>
              <p className='team-stats-table-values-text' style={{ backgroundColor: colorStlBlk(stl), width: widthStlBlk(stl)}}>{stl}</p>
              <p className='team-stats-table-values-text' style={{ backgroundColor: colorStlBlk(blk), width: widthStlBlk(blk)}}>{blk}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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

  const handlePlayerClick = (playerName: string) => {
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
    const element = document.querySelector('.bm-menu') as HTMLElement;
    if (element) {
      element.style.overflow = 'visible';
    }
  }, []);

  const nbaid = playerHead?.headshot_id as number;
  const headshot = nbaid ? `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaid}.png` : '';

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
            <PlayerStatus 
              onPlayerClick={handlePlayerClick} 
              key={index} name={player.name} 
              score={player.score} 
              status={player.status}/>
          ))}
        </div>

        <div className='team-right-side'>
          <div className='team-title'>My Team</div>
            {selectedPlayer && headshot && (
              <BigPlayerCard 
                player={selectedPlayer}
                playerstats={playerHead}
                imageUrl={headshot}
              />
            )}
        </div>

      </div>
    </div>
  );
}
