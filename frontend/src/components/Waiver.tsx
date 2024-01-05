import '../static/Waiver.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const PlayerRank = (props: 
  { name: string; rank: number }) => {

  const rankColor = (rank: number) => {
    if (rank >= 100) {
      return '#CB3434';
    } else if (rank >= 85) {
      return '#D66464';
    } else if (rank >= 60) {
      return '#E29853';
    } else if (rank >= 45) {
      return '#DAC828';
    } else if (rank >= 30) {
      return '#86B16C';
    } else {
      return '#408416';
    }
  };

  return (
    <div className="waiver-player-status">
      <div className="player-score" style={{ backgroundColor: rankColor(props.rank) }}>{props.rank}</div>
      <div className="waiver-player-name">{props.name}</div>
    </div>
  );
};


const PlayerValue = (props: 
  { name: string; value: number }) => {

  const valueColor = (value: number) => {
    if (value >= 45) {
      return '#408416';
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

  return (
    <div className="waiver-player-status-value">
      <div className="waiver-player-name-value">{props.name}</div>
      <div className="player-value" style={{ backgroundColor: valueColor(props.value) }}>{props.value}</div>
    </div>
  );
};

export default function Waiver() {


  const [players, setPlayers] = useState<Playerteam[]>([]);
  const [lowRank, setLowRank] = useState<Playerteam[]>([]);
  const currentDate = dayjs().format('dddd MMM Do');

  useEffect(() => {
    fetch('/top-players')
      .then(response => response.json())
      .then(data => {

        const topValuePlayers = data.top_value_players;
        const lowOvrrankPlayers = data.low_ovrrank_players;

        setPlayers(topValuePlayers);
        setLowRank(lowOvrrankPlayers);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  }, []);

  useEffect(() => {
    const element = document.querySelector('.bm-menu') as HTMLElement;
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
          <p className="waiver-date">{currentDate}</p>
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
              {lowRank.map((player, index) => (
              <PlayerRank key={index} name={player.name} rank={player.ovrrank}/>
              ))}

            </div>
          </div>
        </div>
    );
}