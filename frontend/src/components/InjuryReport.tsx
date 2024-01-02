import '../static/Injury.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';

const Player = (props: 
  { imageUrl: string; name: string; status: string; stats: Stats;}
  ) => {

  const colorStatus = (value: string) => {
    if (value == 'ACTIVE') {
      return '#408416';
    } else if (value == 'OUT') {
      return '#CB3434';
    } else {
      return '#E29853';
    }
  };

  const colorFppg = (value: number) => {
    if (value >= 55) {
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

  const colorScore = (value: number) => {
    if (value >= 15) {
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

  const colorRank = (value: number) => {
    if (value >= 10) {
      return '#408416';
    } else if (value >= 25) {
      return '#86B16C';
    } else if (value >= 50) {
      return '#86B16C';
    } else if (value >= 75) {
      return '#DAC828';
    } else if (value >= 100) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };

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
      <div className="player-status" style={{ backgroundColor: colorStatus(props.status)}}>
        {props.status === 'DAY_TO_DAY' ? 'DAY TO DAY' : props.status}
      </div>

      <div className="player-stats">
        <div className="stat">
          <span className="stat-label">FPPG</span>
          <span className="stat-value-one" style={{ backgroundColor: colorFppg(props.stats.fppg)}}>{props.stats.fppg}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Score</span>
          <span className="stat-value-one" style={{ backgroundColor: colorScore(props.stats.legmScore)}}>{props.stats.legmScore}</span>
        </div>
        <div className="stat">
          <span className="stat-label">pos rank</span>
          <span className="stat-value-two" >{props.stats.pos}</span>
        </div>
        <div className="stat">
          <span className="stat-label">ovr rank</span>
          <span className="stat-value-two" style={{ backgroundColor: colorRank(props.stats.ovrRank)}}>{props.stats.ovrRank}</span>
        </div>
      </div>
    </div>
  );
}

const NewsBlock = ({ onNewsItemClick }: { onNewsItemClick: (title: string) => void }) => {

  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    fetch('/news') 
      .then(response => response.json())
      .then(data => setNewsData(data.slice(0, 5)));
  }, []);


  return (
    <>
      <div className="news-container">
        {newsData.map((newsItem, index) => (
          <News key={index} newsItem={newsItem} onNewsItemClick={onNewsItemClick} />
        ))}
      </div>
    </>
  );
}

const News = ({ newsItem, onNewsItemClick }: { newsItem: { Title: string; Content: string; Updated: string }, onNewsItemClick: (title: string) => void }) => {
  

  const truncateContent = (content: string, maxLength: number) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const getPlayerNameFromContent = (content: string): string => {
    const words = content.split(' '); // Split the content by spaces
    console.log(words.slice(0, 2).join(' '));
    return words.slice(0, 2).join(' '); // Take the first two words and join them as the player's name
  };
  
  return (
    <>
      <div className="top-news-block" onClick={() => onNewsItemClick(getPlayerNameFromContent(newsItem.Title))}>
        <p className="injury-title">{newsItem.Title}</p>
      </div>
      <div className="news-block">
        <p className="news-description">
          {truncateContent(newsItem.Content, 750)}
        </p>
        <p className="news-timestamp">
          {newsItem.Updated}
        </p>
      </div>
    </>
  );
}

export default function InjuryReport() {

  const [selectedPlayer, setSelectedPlayer] = useState<Playercard | null>(null);
  const [player, setPlayer] = useState<Playerstat | null>(null);
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

  const [playerHead, setPlayerHead] = useState<Playerhead | null>(null);
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
    if (selectedPlayer) {
      fetch('/stats')
        .then(response => response.json())
        .then(data => {
          const stats = data.find((player: Playerstat) => player.Name === selectedPlayer.Name);
          if (stats) {
            setPlayer(stats);
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
  

  const playerName = selectedPlayer?.Name as string;

  const playerGames = player?.Games as number;
  const totalFPPG = player?.FantasyPoints as number;
  const fppg = parseFloat((totalFPPG / playerGames).toFixed(1));

  const nbaid = playerHead?.headshot_id as number;
  const headshot = nbaid ? `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaid}.png` : '';
  const status = playerHead?.status as string;
  const legmscore = playerHead?.score as number;
  const position = playerHead?.pos as string;
  const ovrrank = playerHead?.ovrrank as number;

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
      <div className="injury-top-container">
        <div className="title-text">Injury News</div>
      </div>
      <div className='injury-main-container'>
        <NewsBlock onNewsItemClick={handleNewsItemClick} />
        {selectedPlayer && headshot && (
          <Player
            imageUrl={headshot}
            name={playerName}
            status={status}
            stats={{
              fppg: fppg,
              legmScore: legmscore,
              pos: position,
              ovrRank: ovrrank 
            }}
          />
        )}
      </div>
    </div>
  );
}