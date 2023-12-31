import '../static/Waiver.css';
import { slide as Menu } from 'react-burger-menu'


const PlayerScore = (props: 
  { name: string; score: number }) => {

  const scoreColor = (score: number) => {
    if (score >= 50) {
      return 'green';
    } else if (score >= 40) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div className="waiver-player-status">
      <div className="player-score" style={{ backgroundColor: scoreColor(props.score) }}>{props.score}</div>
      <div className="waiver-player-name">{props.name}</div>
    </div>
  );
};


const PlayerValue = (props: 
  { name: string; value: number }) => {

  const valueColor = (value: number) => {
    if (value >= 50) {
      return 'green';
    } else if (value >= 40) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div className="waiver-player-status-value">
      {/* <div className="player-score" style={{ backgroundColor: valueColor(props.value) }}>{props.value}</div> */}
      <div className="waiver-player-name-value">{props.name}</div>
      <div className="player-value" style={{ backgroundColor: valueColor(props.value) }}>{props.value}</div>
    </div>
  );
};

export default function Waiver() {

  const players = [
    { name: 'Lamelo Ball', score: 50.24, status: 'ACT', value: 10.23 },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23},
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23 },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23 },
    { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23 },
  ];

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
        <div className="waiver-top-container">
          <div className="title-text">Waiver Wire</div>
          <p className="waiver-date">sat Dec 30th</p>
        </div>

        <div className="waiver-main-container">
          <div className="waiver-content-container">
            <div className="waiver-heading-text">LeGM Picks</div>
          
            <div className="waiver-value-title">
              <p className="waiver-title-text">value</p>
            </div>
              {players.map((player, index) => (
              <PlayerValue key={index} name={player.name} value={player.value}/>
              ))}

          </div>

          {/* right side */}
          <div className="waiver-content-container">
            <div className="waiver-heading-text">My Team</div>

            <div className="waiver-list-title">
              <p className="waiver-title-text">score</p>
            </div>
              {players.map((player, index) => (
              <PlayerScore key={index} name={player.name} score={player.score}/>
              ))}

            <div className="waiver-list-title">
              <p className="waiver-title-text">rank</p>
            </div>
              {players.map((player, index) => (
              <PlayerScore key={index} name={player.name} score={player.score}/>
              ))}

          </div>
        </div>
      </div>
    );
}