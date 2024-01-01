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
    name: string; 
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
        <div className='record-bar-wins'><p className='record-bar-number'>{props.wins}</p></div>
        <div className='record-bar-losses'><p className='record-bar-number'>{props.losses}</p></div>
      </div>

      <div className='home-rank-container'>
        <p className='home-rank-title'>rank</p>
        <div className='home-rank'>{props.rank}</div>
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
            <p className='home-stats-table-values-text'>{props.playoff_per}</p>
            <p className='home-stats-table-values-text'>{props.playoffseed}</p>
            <p className='home-stats-table-values-text'>{props.gamesback}</p>
            <p className='home-stats-table-values-text'>{props.winstreak}</p>
          </div>
        </div>
        
      <div className='user-team-stat-title' style={{ marginTop: '15px' }}>Team</div>
        <div className='home-stats-table-container'>
          <div className='home-stats-table-titles'>
            <p className='home-stats-table-titles-text'>LeGM score</p>
            <p className='home-stats-table-titles-text'>draft rank</p>
          </div>

          <div className='home-stats-table-values'>
            <p className='home-stats-table-values-text' style={{ fontSize: '22px', padding: '8px 0px' }}>{props.legmscore}</p>
            <p className='home-stats-table-values-text'>{props.draftrank}</p>
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

  return (
    <>
      <div className='matchup-week-title'>Week {weekNumber}</div>

      <div className='current-matchup-container'>

        <div className='current-matchup-user'>
          <div className='home-title-container'>
            <p className='home-name-text' style={{ color: '#5C7C8A' }}>{props.currentmatchup}</p>
          </div>

          <div className='record-bar-container'>
            <div className='record-bar-wins'><p className='record-bar-number'>{props.wins}</p></div>
            <div className='record-bar-losses'><p className='record-bar-number'>{props.losses}</p></div>
          </div>

          <div className='home-rank-container'>
            <p className='home-rank-title' style={{ color: '#5C7C8A' }}>rank</p>
            <div className='home-rank'>{props.rank}</div>
          </div>
        </div>

        <div className='home-stats-table-container' style={{ marginLeft: '35px' }}>
          <div className='home-stats-table-titles'>
            <p className='home-stats-table-titles-text'>LeGM score</p>
            <p className='home-stats-table-titles-text'>playoff %</p>
            <p className='home-stats-table-titles-text'>win streak</p>
          </div>

          <div className='home-stats-table-values'>
            <p className='home-stats-table-values-text'>{props.legmscore}</p>
            <p className='home-stats-table-values-text'>{props.playoff_per}</p>
            <p className='home-stats-table-values-text'>{props.winstreak}</p>
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
            <div className='home-rank'>{props.next_rank}</div>
        </div>
      </div>

      <div className='next-matchup-container'> 
        <div className='record-bar-container' style={{ width: '300px' }}>
          <div className='record-bar-wins'><p className='record-bar-number'>{props.wins}</p></div>
          <div className='record-bar-losses'><p className='record-bar-number'>{props.losses}</p></div>
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

  const teamName = userteam?.name as string;
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
          <button onClick={waiver} className='home-nav-buttons'>Waiver Wire</button>
          <button onClick={injury} className='home-nav-buttons' style={{ marginRight:'10px'}}>News</button>
        </div>
      </div>
    </div>
    );
}