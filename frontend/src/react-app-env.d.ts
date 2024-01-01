/// <reference types="react-scripts" />
declare module 'react-burger-menu';
declare module 'typewriter-effect/dist/core'


// home page

interface Userteam {
  team_id: number;
  name: string;
  wins: number;
  losses: number;
  projectedrank: number;
  playoffpercentage: number;
  playoffseed: number;
  gamesback: number;
  winstreak: number;
  legmscore: number;
  draftrank: number;

  currentmatchup: string;
  nextmatchup: string;
}

interface Current {
  name: string;
  wins: number;
  losses: number;
  projectedrank: number;
  legmscore: number;
  playoffpercentage: number;
  winstreak: number;
}

interface Next {
  name: string;
  projectedrank: number;
  wins: number;
  losses: number;
}



// team page

interface Playerteam {
  name: string;
  fantasyteam: number;
  score: number;
  status: string;
  value: number;
  posrank: number;
  ovrrank: number;
}

type BigPlayerCardProps = {
  player: Playercard | null;
  playerstats: Playerhead | null;
  imageUrl: string;
};

// search page

interface Stats {
  fppg: number;
  legmScore: number;
  pos: string;
  ovrRank: number;
}

interface Trad {
  pts: number;
  ast: number;
  reb: number;
  tov: number;
  stl: number;
  blk: number;
}

interface Adv {
  min: number;
  PM: number;
  efg: number;
  ts: number;
  usg: number;
  per: number;
}

interface Playerstat {
  Name: string;
  Games: number;
  Points: number;
  Assists: number;
  Rebounds: number;
  Turnovers: number;
  Steals: number;
  BlockedShots: number;
  
  FantasyPoints: number;


  Minutes: number;
  PlusMinus: number;
  EffectiveFieldGoalsPercentage: number;
  TrueShootingPercentage: number;
  UsageRatePercentage: number;
  PlayerEfficiencyRating: number;
}

interface Playerhead {
  name: string;
  headshot_id: number;
  status: string;
  pos: string;
  score: number;
  posrank: number;
  ovrrank: number;
}


// injury pages

interface NewsItem {
  Title: string;
  Content: string;
  Updated: string;
}

interface NewsBlockProps {
  onNewsItemClick: (title: string) => void;
}

interface Playercard {
  Name: string;
  Games: number;
  Position: string;
  Points: number;
  Assists: number;
  Rebounds: number;
  Turnovers: number;
  Steals: number;
  BlockedShots: number;

  FantasyPoints: number;
}
