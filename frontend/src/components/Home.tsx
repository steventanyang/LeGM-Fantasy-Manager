import '../static/Home.css';
import { slide as Menu } from 'react-burger-menu'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

const Userteam = (props: 
  { 
    imageUrl: string; 
    name: string | undefined; 
    wins: number; 
    losses: number;
    rank: number;
    playoff_per: number;
    playoffseed: number;
    gamesback: number;
    winstreak: number;
    legmscore: number;
    draftrank: number;
  }
  ) => {

  const startOfWeek1 = dayjs('2023-10-23');
  const currentDate = dayjs();
  const weekNumber = currentDate.diff(startOfWeek1, 'week') + 1;

  const widthRecord = (value: number) => {
    if (value/weekNumber === 1) {
      return '100%';
    } else if (value/weekNumber >= 0.9) {
      return '90%';
    } else if (value/weekNumber >= 0.8) {
      return '80%';
    } else if (value/weekNumber >= 0.7) {
      return '70%';
    } else if (value/weekNumber >= 0.6) {
      return '60%';
    } else if (value/weekNumber >= 0.5) {
      return '50%';
    } else if (value/weekNumber >= 0.4) {
      return '40%';
    } else if (value/weekNumber >= 0.3) {
      return '30%';
    } else if (value/weekNumber >= 0.2) {
      return '20%';
    } else if (value/weekNumber >= 0.1) {
      return '10%';
    } else {
      return '0%';
    }
  };
  const colorRank = (rank: number) => {
    if (rank <= 2) {
      return '#408416';
    } else if (rank <= 4) {
      return '#86B16C';
    } else if (rank <= 5) {
      return '#DAC828';
    } else if (rank <= 6) {
      return '#E29853';
    } else if (rank <= 8) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorPlayoffper = (rank: number) => {
    if (rank >= 0.9) {
      return '#408416';
    } else if (rank >= 0.7) {
      return '#86B16C';
    } else if (rank >= 0.5) {
      return '#DAC828';
    } else if (rank >= 0.3) {
      return '#E29853';
    } else if (rank >= 0.1) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorSeed = (rank: number) => {
    if (rank <= 2) {
      return '#408416';
    } else if (rank <= 4) {
      return '#86B16C';
    } else if (rank <= 5) {
      return '#DAC828';
    } else if (rank <= 6) {
      return '#E29853';
    } else if (rank <= 8) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorGamesback = (gb: number) => {
    const maxwins = weekNumber - 1;
    if (gb/maxwins >= 0.9) {
      return '#408416';
    } else if (gb/maxwins >= 0.7) {
      return '#86B16C';
    } else if (gb/maxwins >= 0.5) {
      return '#DAC828';
    } else if (gb/maxwins >= 0.3) {
      return '#E29853';
    } else if (gb/maxwins >= 0.1) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorStreak = (streak: number) => {
    const maxwins = weekNumber - 1;
    const value = weekNumber/6;
    if (streak >= maxwins - value) {
      return '#408416';
    } else if (streak >= maxwins - value) {
      return '#86B16C';
    } else if (streak >= maxwins - value) {
      return '#DAC828';
    } else if (streak >= maxwins - value) {
      return '#E29853';
    } else if (streak >= maxwins - value) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorScore = (score: number) => {
    if (score >= 150) {
      return '#408416';
    } else if (score >= 120) {
      return '#86B16C';
    } else if (score >= 90) {
      return '#DAC828';
    } else if (score >= 60) {
      return '#E29853';
    } else if (score >= 30) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorDraftRank = (rank: number) => {
    if (rank <= 2) {
      return '#408416';
    } else if (rank <= 4) {
      return '#86B16C';
    } else if (rank <= 5) {
      return '#DAC828';
    } else if (rank <= 6) {
      return '#E29853';
    } else if (rank <= 8) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };

  return (
    <>
    <div className='user-team'>

      <div className="home-image-container">
        <img
          src={props.imageUrl}
          alt={props.name}
          className="team-image"
        />
      </div>

      <div className='home-title-container'>
        <p className='home-name-text'>{props.name}</p>
      </div>

      <div className='record-bar-container'>
        <div className='record-bar-wins' style={{ width: widthRecord(props.wins)}}><p className='record-bar-number'>{props.wins}</p></div>
        <div className='record-bar-losses' style={{ width: widthRecord(props.losses)}}><p className='record-bar-number'>{props.losses}</p></div>
      </div>

      <div className='home-rank-container'>
        <p className='home-rank-title'>rank</p>
        <div className='home-rank' style={{ backgroundColor: colorRank(props.rank) }}>{props.rank}</div>
      </div>

    </div>

    <div className='user-team-info'>

      <div className='user-team-stat-title'>Stats</div>

        <div className='home-stats-table-container'>
          <div className='home-stats-table-titles'>
            <p className='home-stats-table-titles-text'>playoff %</p>
            <p className='home-stats-table-titles-text'>playoff seed</p>
            <p className='home-stats-table-titles-text'>games back</p>
            <p className='home-stats-table-titles-text'>win streak</p>
          </div>

          <div className='home-stats-table-values'>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorPlayoffper(props.playoff_per) }}>{props.playoff_per}</p>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorSeed(props.playoffseed) }}>{props.playoffseed}</p>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorGamesback(props.gamesback) }}>{props.gamesback}</p>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorStreak(props.winstreak) }}>{props.winstreak}</p>
          </div>
        </div>
        
      <div className='user-team-stat-title' style={{ marginTop: '15px' }}>Team</div>
        <div className='home-stats-table-container'>
          <div className='home-stats-table-titles'>
            <p className='home-stats-table-titles-text'>LeGM score</p>
            <p className='home-stats-table-titles-text'>draft rank</p>
          </div>

          <div className='home-stats-table-values'>
            <p className='home-stats-table-values-text' style={{ fontSize: '22px', padding: '8px 0px', backgroundColor: colorScore(props.legmscore) }}>
              {props.legmscore}
            </p>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorDraftRank(props.draftrank) }}>
              {props.draftrank}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const Matchups = (props: 
  {
    currentmatchup: string; 
    wins: number; 
    losses: number;
    rank: number;
    legmscore: number;
    playoff_per: number;
    winstreak: number;
    nextmatchup: string;
    next_rank: number;
    next_wins: number;
    next_losses: number;
  }
  ) => {

  const startOfWeek1 = dayjs('2023-10-23');
  const currentDate = dayjs();
  const weekNumber = currentDate.diff(startOfWeek1, 'week') + 1;

  const widthRecord = (value: number) => {
    if (value/weekNumber === 1) {
      return '100%';
    } else if (value/weekNumber >= 0.9) {
      return '90%';
    } else if (value/weekNumber >= 0.8) {
      return '80%';
    } else if (value/weekNumber >= 0.7) {
      return '70%';
    } else if (value/weekNumber >= 0.6) {
      return '60%';
    } else if (value/weekNumber >= 0.5) {
      return '50%';
    } else if (value/weekNumber >= 0.4) {
      return '40%';
    } else if (value/weekNumber >= 0.3) {
      return '30%';
    } else if (value/weekNumber >= 0.2) {
      return '20%';
    } else if (value/weekNumber >= 0.1) {
      return '10%';
    } else {
      return '10%';
    }
  };
  const colorRank = (rank: number) => {
    if (rank <= 2) {
      return '#408416';
    } else if (rank <= 4) {
      return '#86B16C';
    } else if (rank <= 5) {
      return '#DAC828';
    } else if (rank <= 6) {
      return '#E29853';
    } else if (rank <= 8) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorStreak = (streak: number) => {
    const maxwins = weekNumber - 1;
    const value = weekNumber/6;
    if (streak >= maxwins - value) {
      return '#408416';
    } else if (streak >= maxwins - value) {
      return '#86B16C';
    } else if (streak >= maxwins - value) {
      return '#DAC828';
    } else if (streak >= maxwins - value) {
      return '#E29853';
    } else if (streak >= maxwins - value) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorScore = (score: number) => {
    if (score >= 150) {
      return '#408416';
    } else if (score >= 120) {
      return '#86B16C';
    } else if (score >= 90) {
      return '#DAC828';
    } else if (score >= 60) {
      return '#E29853';
    } else if (score >= 30) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };
  const colorPlayoffper = (rank: number) => {
    if (rank >= 0.9) {
      return '#408416';
    } else if (rank >= 0.7) {
      return '#86B16C';
    } else if (rank >= 0.5) {
      return '#DAC828';
    } else if (rank >= 0.3) {
      return '#E29853';
    } else if (rank >= 0.1) {
      return '#D66464';
    } else {
      return '#CB3434';
    }
  };

  return (
    <>
      <div className='matchup-week-title'>Week {weekNumber}</div>

      <div className='current-matchup-container'>

        <div className='current-matchup-user'>
          <div className='home-title-container'>
            <p className='home-name-text' style={{ color: '#5C7C8A' }}>{props.currentmatchup}</p>
          </div>

          <div className='record-bar-container'>
            <div className='record-bar-wins' style={{ width: widthRecord(props.wins)}}><p className='record-bar-number'>{props.wins}</p></div>
            <div className='record-bar-losses' style={{ width: widthRecord(props.losses)}}><p className='record-bar-number'>{props.losses}</p></div>
          </div>

          <div className='home-rank-container'>
            <p className='home-rank-title' style={{ color: '#5C7C8A' }}>rank</p>
            <div className='home-rank' style={{ backgroundColor: colorRank(props.rank) }}>{props.rank}</div>
          </div>
        </div>

        <div className='home-stats-table-container' style={{ marginLeft: '35px' }}>
          <div className='home-stats-table-titles'>
            <p className='home-stats-table-titles-text'>LeGM score</p>
            <p className='home-stats-table-titles-text'>playoff %</p>
            <p className='home-stats-table-titles-text'>win streak</p>
          </div>

          <div className='home-stats-table-values'>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorScore(props.legmscore) }}>{props.legmscore}</p>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorPlayoffper(props.playoff_per) }}>{props.playoff_per}</p>
            <p className='home-stats-table-values-text' style={{ backgroundColor: colorStreak(props.winstreak) }}>{props.winstreak}</p>
          </div>
        </div>

      </div>

      <div className='matchup-week-title' style={{ fontSize: '28px' , marginTop: '45px' }}>Next Matchup</div>

      <div className='next-matchup-container' style={{ marginTop: '15px' }}> 
        <div className='home-name-text' style={{  color: '#5C7C8A', fontSize: '28px', marginBottom: '0px', marginRight: '20px' }}>
          {props.nextmatchup}
        </div>
        <div className='home-rank-container' style={{ marginTop: '0px', marginLeft: '20px' }}>
            <p className='home-rank-title' style={{ color: '#5C7C8A', marginTop: '0px' }}>rank</p>
            <div className='home-rank' style={{ backgroundColor: colorRank(props.next_rank) }}>{props.next_rank}</div>
        </div>
      </div>

      <div className='next-matchup-container'> 
        <div className='record-bar-container' style={{ width: '300px' }}>
          <div className='record-bar-wins' style={{ width: widthRecord(props.next_wins)}}><p className='record-bar-number'>{props.next_wins}</p></div>
          <div className='record-bar-losses' style={{ width: widthRecord(props.next_losses)}}><p className='record-bar-number'>{props.next_losses}</p></div>
        </div>
      </div>

    </>
  );
}

export default function Home() {

  const navigate = useNavigate();

  const team = () => {
    navigate('/team'); 
  };

  const search = () => {
    navigate('/search'); 
  };

  const waiver = () => {
    navigate('/waiver'); 
  };

  const injury = () => {
    navigate('/injuryreport'); 
  };

  useEffect(() => {
    const element = document.querySelector('.bm-menu') as HTMLElement;
    if (element) {
      element.style.overflow = 'visible';
    }
  }, []);

  const [userteam, setTeam] = useState<Userteam | undefined>(undefined);
  const [currentmatch, setCurrentMatch] = useState<Current | undefined>(undefined);
  const [nextmatch, setNextMatch] = useState<Next | undefined>(undefined);

  useEffect(() => {
    fetch('/teams')
      .then(response => response.json())
      .then(data => {
        const filteredTeam = data.find((userteam: Userteam) => userteam.team_id === 1);
        setTeam(filteredTeam);
      })
      .catch(error => {
        console.error('Error fetching team:', error);
      });
  }, []);
  
  useEffect(() => {
    const currentMatchup = userteam?.currentmatchup as string;
    fetch('/teams')
      .then(response => response.json())
      .then(data => {
        const current = data.find((currentmatch: Current) => currentmatch.name === currentMatchup);
        setCurrentMatch(current);
      })
      .catch(error => {
        console.error('Error fetching current:', error);
      });
  }, [userteam?.currentmatchup]);

  useEffect(() => {
    const nextMatchup = userteam?.nextmatchup as string;
    fetch('/teams')
      .then(response => response.json())
      .then(data => {
        const next = data.find((nextmatch: Next) => nextmatch.name === nextMatchup);
        setNextMatch(next);
      })
      .catch(error => {
        console.error('Error fetching next:', error);
      });
  }, [userteam?.nextmatchup]);

  const teamName = userteam?.name;
  const teamWins = userteam?.wins as number;
  const teamLosses = userteam?.losses as number;
  const teamRank = userteam?.projectedrank as number;
  const teamPlayoffPercentage = userteam?.playoffpercentage as number;
  const teamPlayoffSeed = userteam?.playoffseed as number;
  const teamGamesBack = userteam?.gamesback as number;
  const teamWinStreak = userteam?.winstreak as number;
  const teamLegmScore = userteam?.legmscore as number;
  const teamDraftRank = userteam?.draftrank as number;
  
  const currentName = currentmatch?.name as string;
  const currentWins = currentmatch?.wins as number;
  const currentLosses = currentmatch?.losses as number;
  const currentRank = currentmatch?.projectedrank as number;
  const currentLegmScore = currentmatch?.legmscore as number;
  const currentPlayoffPercentage = currentmatch?.playoffpercentage as number;
  const currentWinStreak = currentmatch?.winstreak as number;
  

  const nextName = nextmatch?.name as string;
  const nextRank = nextmatch?.projectedrank as number;
  const nextWins = nextmatch?.wins as number;
  const nextLosses = nextmatch?.losses as number;

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

      <div className="home-top-container">
        <div className="title-text">LeGM</div>
      </div>

      <div className="home-main-container">
        <div className="home-content-container" style={{ flexDirection: 'row' }}>
          <Userteam
            imageUrl='https://g.espncdn.com/lm-static/fba/images/default_logos/8.svg'
            name={teamName}
            wins={teamWins}
            losses={teamLosses}
            rank={teamRank}
            playoff_per={teamPlayoffPercentage}
            playoffseed={teamPlayoffSeed}
            gamesback={teamGamesBack}
            winstreak={teamWinStreak}
            legmscore={teamLegmScore}
            draftrank={teamDraftRank}
          />
        </div>

          <div className="home-content-container" style={{ flexDirection: 'column', height: '550px' }}>
            <Matchups
              currentmatchup={currentName}
              wins={currentWins}
              losses={currentLosses}
              rank={currentRank}
              legmscore={currentLegmScore}
              playoff_per={currentPlayoffPercentage}
              winstreak={currentWinStreak}
              nextmatchup={nextName}
              next_rank={nextRank}
              next_wins={nextWins}
              next_losses={nextLosses}
            />
          </div>

      </div>

      <div className="home-bottom-container">
        <div className="home-button-container">
          <button onClick={team} className='home-nav-buttons' style={{ marginLeft:'10px'}}>My Team</button>
          <button onClick={search} className='home-nav-buttons'>Search</button>
          <button onClick={search} className='home-nav-buttons'>AI Search</button>
          <button onClick={waiver} className='home-nav-buttons'>Waiver Wire</button>
          <button onClick={injury} className='home-nav-buttons' style={{ marginRight:'10px'}}>News</button>
        </div>
      </div>
    </div>
    );
}