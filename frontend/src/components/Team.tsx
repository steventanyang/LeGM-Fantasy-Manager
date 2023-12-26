import '../static/Team.css';
import { slide as Menu } from 'react-burger-menu'

const PlayerStatus = (props: 
    { name: string; score: number; status: string }) => {

  // Define a function to get the status class based on the status text
  const getStatusClass = () => {
    switch (props.status) {
      case 'In':
        return 'status-in';
      case 'OUT':
        return 'status-out';
      case 'DTD':
        return 'status-dtd';
      case 'GTD':
        return 'status-gtd';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="team-player-status">
      <div className="player-score" style={{ backgroundColor: scoreColor(props.score) }}>{props.score}</div>
      <div className="team-player-name">{props.name}</div>
      <div className={`team-player-status-indicator ${getStatusClass()}`}>{props.status}</div>
    </div>
  );
};

// Define a function to determine the score color based on the value
const scoreColor = (score: number) => {
  if (score >= 50) {
    return 'green';
  } else if (score >= 40) {
    return 'orange';
  } else {
    return 'red';
  }
};

// Define the main App component
export default function Team() {
  // Sample data array
  const players = [
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD' },
  ];

  return (
    <div>
      <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="team" className="menu-item" href="/team">Team</a>
          <a id="search" className="menu-item" href="/search">Search</a>
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
