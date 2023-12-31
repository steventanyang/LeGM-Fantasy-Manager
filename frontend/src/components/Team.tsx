import '../static/Team.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';

const PlayerStatus = (props: 
    { name: string; score: number; status: string }) => {

  // Define a function to get the status class based on the status text
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


      </div>
    </div>
  );
}
