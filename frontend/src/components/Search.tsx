import '../static/Search.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";


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
          <span className="stat-value-two">{props.stats.pos}</span>
        </div>
        <div className="stat">
          <span className="stat-label">ovr rank</span>
          <span className="stat-value-two">{props.stats.ovrRank}</span>
        </div>
      </div>
    </div>
  );
}

const Traditional = (props: { trad:Trad; }) => {

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
      return '300px';
    } else if (value >= 25) {
      return '250px';
    } else if (value >= 20) {
      return '200px';
    } else if (value >= 15) {
      return '150px';
    } else if (value >= 10) {
      return '100px';
    } else {
      return '50px';
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
      return '300px';
    } else if (value >= 8) {
      return '250px';
    } else if (value >= 6) {
      return '200px';
    } else if (value >= 4) {
      return '150px';
    } else if (value >= 2) {
      return '100px';
    } else {
      return '50px';
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
      return '300px';
    } else if (value >= 3.2) {
      return '250px';
    } else if (value >= 2.6) {
      return '200px';
    } else if (value >= 2) {
      return '150px';
    } else if (value >= 1.4) {
      return '100px';
    } else {
      return '50px';
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
      return '300px';
    } else if (value >= 2.1) {
      return '250px';
    } else if (value >= 1.6) {
      return '200px';
    } else if (value >= 1.1) {
      return '150px';
    } else if (value >= 0.6) {
      return '100px';
    } else {
      return '50px';
    }
  };

  return (
    <>
      <div className="trad-container">
        <h2 className="text-header">Per Game Stats</h2>
          <div className='search-stat-container'>
            <span className="stat-label">PTS</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorPts(props.trad.pts), width: widthPts(props.trad.pts)}}>{props.trad.pts}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">AST</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorAstReb(props.trad.ast), width: widthAstReb(props.trad.ast)}}>{props.trad.ast}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">REB</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorAstReb(props.trad.reb), width: widthAstReb(props.trad.reb)}}>{props.trad.reb}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">TOV</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorTov(props.trad.tov), width: widthTov(props.trad.tov)}}>{props.trad.tov}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">STL</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorStlBlk(props.trad.stl), width: widthStlBlk(props.trad.stl)}}>{props.trad.stl}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">BLK</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorStlBlk(props.trad.blk), width: widthStlBlk(props.trad.blk)}}>{props.trad.blk}</span>
          </div>
      </div>
    </>
  );
}

const Advanced = (props: { adv:Adv }) => {

  const colorMin = (value: number) => {
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
  const widthMin = (value: number) => {
    if (value >= 30) {
      return '300px';
    } else if (value >= 25) {
      return '250px';
    } else if (value >= 20) {
      return '200px';
    } else if (value >= 15) {
      return '150px';
    } else if (value >= 10) {
      return '100px';
    } else {
      return '50px';
    }
  };

  const colorPM = (value: number) => {
    if (value >= 10) {
      return '#408416';
    } else if (value >= 6) {
      return '#86B16C';
    } else if (value >= 2) {
      return '#86B16C';
    } else if (value >= -2) {
      return '#DAC828';
    } else if (value >= -6) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };
  const widthPM = (value: number) => {
    if (value >= 10) {
      return '300px';
    } else if (value >= 6) {
      return '250px';
    } else if (value >= 2) {
      return '200px';
    } else if (value >= -2) {
      return '150px';
    } else if (value >= -6) {
      return '100px';
    } else {
      return '50px';
    }
  };

  const colorEfgTs = (value: number) => {
    if (value >= 65) {
      return '#408416';
    } else if (value >= 60) {
      return '#86B16C';
    } else if (value >= 55) {
      return '#86B16C';
    } else if (value >= 50) {
      return '#DAC828';
    } else if (value >= 45) {
      return '#E29853';
    } else {
      return '#D66464';
    }
  };
  const widthEfgTs = (value: number) => {
    if (value >= 65) {
      return '300px';
    } else if (value >= 60) {
      return '250px';
    } else if (value >= 55) {
      return '200px';
    } else if (value >= 50) {
      return '150px';
    } else if (value >= 45) {
      return '100px';
    } else {
      return '50px';
    }
  };

  const colorUsg = (value: number) => {
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
  const widthUsg = (value: number) => {
    if (value >= 30) {
      return '300px';
    } else if (value >= 25) {
      return '250px';
    } else if (value >= 20) {
      return '200px';
    } else if (value >= 15) {
      return '150px';
    } else if (value >= 10) {
      return '100px';
    } else {
      return '50px';
    }
  };

  const colorPer = (value: number) => {
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
  const widthPer = (value: number) => {
    if (value >= 30) {
      return '300px';
    } else if (value >= 25) {
      return '250px';
    } else if (value >= 20) {
      return '200px';
    } else if (value >= 15) {
      return '150px';
    } else if (value >= 10) {
      return '100px';
    } else {
      return '50px';
    }
  };
  
  return (
    <>
      <div className="trad-container">
        <h2 className="text-header">Advanced Stats</h2>
          <div className='search-stat-container'>
            <span className="stat-label">MIN</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorMin(props.adv.min), width: widthMin(props.adv.min)}}>{props.adv.min}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">+/-</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorPM(props.adv.PM), width: widthPM(props.adv.PM)}}>{props.adv.PM}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">EFG</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorEfgTs(props.adv.efg), width: widthEfgTs(props.adv.efg)}}>{props.adv.efg}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">TS%</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorEfgTs(props.adv.ts), width: widthEfgTs(props.adv.ts)}}>{props.adv.ts}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">USG</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorUsg(props.adv.usg), width: widthUsg(props.adv.usg)}}>{props.adv.usg}</span>
          </div>
          <div className='search-stat-container'>
            <span className="stat-label">PER</span>
            <span className="search-variable-stat" style={{ backgroundColor: colorPer(props.adv.per), width: widthPer(props.adv.per)}}>{props.adv.per}</span>
          </div>
      </div>
    </>
  );
}

export default function Search() {

  let name = 'Paul George';
  const [searchTerm, setSearchTerm] = useState('Paul George'); // Default search term

  const [player, setPlayer] = useState<Playerstat | null>(null);
  useEffect(() => {
    if (searchTerm) {
      fetch('/stats')
        .then(response => response.json())
        .then(data => {
          const stats = data.find((player: Playerstat) => player.Name === searchTerm);
          if (stats) {
            setPlayer(stats);
          }
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [searchTerm]); // Re-run this effect when searchTerm changes

  const [playerHead, setPlayerHead] = useState<Playerhead | null>(null);

  useEffect(() => {
    if (searchTerm) {
      fetch('/players')
        .then(response => response.json())
        .then(data => {
          const stats = data.find((playerHead: Playerhead) => playerHead.name === searchTerm);
          if (stats) {
            setPlayerHead(stats);
          }
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [searchTerm]); // Re-run this effect when searchTerm changes

  const handleSearch = (newValue: string) => {
    setSearchTerm(newValue); // This will trigger the useEffect hooks above
  };

  //sportsdata.io per game stats

  const playerName = player?.Name as string;
  const playerGames = player?.Games as number;
  const totalPoints = player?.Points as number;
  const totalAssists = player?.Assists as number;
  const totalRebounds = player?.Rebounds as number;
  const totalTurnovers = player?.Turnovers as number;
  const totalSteals = player?.Steals as number;
  const totalBlocks = player?.BlockedShots as number;

  const pts = parseFloat((totalPoints / playerGames).toFixed(1));
  const ast = parseFloat((totalAssists / playerGames).toFixed(1));
  const reb = parseFloat((totalRebounds / playerGames).toFixed(1));
  const tov = parseFloat((totalTurnovers / playerGames).toFixed(1));
  const stl = parseFloat((totalSteals / playerGames).toFixed(1));
  const blk = parseFloat((totalBlocks / playerGames).toFixed(1));
  
  //sportsdata.io advanced stats

  const playerMin = player?.Minutes as number;
  const playerPlusMinus = player?.PlusMinus as number;
  const playerEFG = player?.EffectiveFieldGoalsPercentage as number;
  const playerTS = player?.TrueShootingPercentage as number;
  const playerUsg = player?.UsageRatePercentage as number;
  const playerPER = player?.PlayerEfficiencyRating as number;

  const min = parseFloat((playerMin / playerGames).toFixed(1));
  const plusMinus = parseFloat((playerPlusMinus / playerGames).toFixed(1));
  
  // player headshot url

  const nbaid = playerHead?.headshot_id as number;
  const headshot = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaid}.png`

  return (
      <div>
        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="team" className="menu-item" href="/team">Team</a>
          <a id="search" className="menu-item" href="/search">Search</a>
          <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
          <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
        </Menu>

        <div className="search-bar-container">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onRequestSearch={() => handleSearch(searchTerm)}
          />
        </div>
        

        <div className='card_container'>
          <Traditional
              trad={{
                pts: pts,
                ast: ast,
                reb: reb,
                tov: tov,
                stl: stl,
                blk: blk
              }}
            />
          <Player
            imageUrl={headshot}
            name={playerName}
            status="active"
            stats={{
              fppg: 58.7,
              legmScore: 54.3,
              pos: 'SF',
              ovrRank: 6 
            }}
          />
          <Advanced
              adv={{
                min: min,
                PM: plusMinus,
                efg: playerEFG,
                ts: playerTS,
                usg: playerUsg,
                per: playerPER
              }}
            />
        </div>
      </div>
    );
}