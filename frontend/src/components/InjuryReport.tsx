import '../static/Injury.css';
import { slide as Menu } from 'react-burger-menu'

const Player = (props: 
  { imageUrl: string; name: string; status: string; stats: Stats;}
  ) => {
  return (
    <div className="injury-player-card">

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

const NewsBlock = () => {
  return (
    <>
      <div className="news-container">
        <News/>
        <News/>
        <News/>
        <News/>
        <News/>
        <News/>
        <News/>
        <News/>
      </div>
    </>
  );
}

const News = () => {
  return (
    <>
      <div className="top-news-block"></div>
      <div className="news-block"></div>
    </>
  );
}



export default function InjuryReport() {

  return (
    <div>
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="team" className="menu-item" href="/team">Team</a>
        <a id="search" className="menu-item" href="/search">Search</a>
        <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
        <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
      </Menu>
      <div className="injury-top-container">
        <div className="title-text">Injury Report</div>
      </div>
      <div className='injury-main-container'>
        <NewsBlock/>
        <Player
          imageUrl="https://picsum.photos/250/250"
          name="SGA"
          status="active"
          stats={{
            fppg: 42.3,
            legmScore: 54.3,
            posRank: 16,
            ovrRank: 54  
          }}
        />
      </div>
    </div>
  );
}