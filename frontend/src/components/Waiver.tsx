import '../static/Waiver.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';


const PlayerScore = (props: 
  { name: string; rank: number }) => {

  const scoreColor = (rank: number) => {
    if (rank >= 50) {
      return 'green';
    } else if (rank >= 40) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div className="waiver-player-status">
      <div className="player-score" style={{ backgroundColor: scoreColor(props.rank) }}>{props.rank}</div>
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

  // const players = [
  //   { name: 'Lamelo Ball', score: 50.24, status: 'ACT', value: 10.23 },
  //   { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23},
  //   { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23 },
  //   { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23 },
  //   { name: 'Lamelo Ball', score: 45.26, status: 'DTD', value: 10.23 },
  // ];

  const [players, setPlayers] = useState<Playerteam[]>([]);
  // const [lowRank, setLowRank] = useState<Playerteam[]>([]);
  // const [lowPosRank, setLowPosRank] = useState<Playerteam[]>([]);

  useEffect(() => {
    fetch('/top-players')
      .then(response => response.json())
      .then(data => {
        const topPlayers = data;
        setPlayers(topPlayers);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  }, []);

  // useEffect(() => {
  //   fetch('/low-rank')
  //     .then(response => response.json())
  //     .then(data => {
  //       const lowRankPlayers = data;
  //       setLowRank(lowRankPlayers);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching players:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch('/low-posrank')
  //     .then(response => response.json())
  //     .then(data => {
  //       const lowPosRankPlayers = data;
  //       setLowPosRank(lowPosRankPlayers);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching players:', error);
  //     });
  // }, []);

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
              <p className="waiver-title-text">rank</p>
            </div>
              {/* {lowRank.map((lowRank, index) => (
              <PlayerScore key={index} name={lowRank.name} rank={lowRank.ovrrank}/>
              ))} */}

            <div className="waiver-list-title">
              <p className="waiver-title-text">pos rank</p>
            </div>
              {/* {lowPosRank.map((lowPosRank, index) => (
              <PlayerScore key={index} name={lowPosRank.name} rank={lowPosRank.posrank}/>
              ))} */}
          </div>
        </div>
      </div>
    );
}