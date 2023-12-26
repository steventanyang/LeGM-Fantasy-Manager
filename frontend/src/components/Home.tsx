import '../App.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react'

const Player = (props: 
  { imageUrl: string; name: string; status: string; stats: Stats;}
) => {
return (
  <div className="player-card">

    <div className="player-image-container">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="player-image"
      />
    </div>

    <h2 className="player-name">{props.name}</h2>
    <div className="player-status">{props.status}</div>

    <div className="player-stats">
      <div className="stat">
        <span className="stat-label">FPPG</span>
        <span className="stat-value-one">{props.stats.fppg}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Score</span>
        <span className="stat-value-one">{props.stats.legmScore}</span>
      </div>
      <div className="stat">
        <span className="stat-label">pos rank</span>
        <span className="stat-value-two">{props.stats.posRank}</span>
      </div>
      <div className="stat">
        <span className="stat-label">ovr rank</span>
        <span className="stat-value-two">{props.stats.ovrRank}</span>
      </div>
    </div>
  </div>
);
}

export default function Home() {

  const [team, setTeam] = useState([{}])

  useEffect(() => {
    // Fetch the user data from the "/users" endpoint
    fetch('/users')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array and you want the 'team' of the first user
        if (data.length > 0) {
          setTeam(data[0].team);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the team data:', error);
      });
  }, []);

  return (
    <div>
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="team" className="menu-item" href="/team">Team</a>
        <a id="search" className="menu-item" href="/search">Search</a>
        <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
        <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
      </Menu>

      <div className='card_container'>
        <Player
          imageUrl="https://picsum.photos/250/250"
          name="SGA"
          status="active"
          stats={{
            fppg: 20.2,
            legmScore: 54.3,
            posRank: 16,
            ovrRank: 54  
          }}
        />
      </div>
    </div>
    );
}