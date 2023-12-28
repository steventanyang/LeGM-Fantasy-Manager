/// <reference types="react-scripts" />
declare module 'react-burger-menu';


// search page

interface Stats {
  fppg: number;
  legmScore: number;
  posRank: number;
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
  
  Minutes: number;
  PlusMinus: number;
  EffectiveFieldGoalsPercentage: number;
  TrueShootingPercentage: number;
  UsageRatePercentage: number;
  PlayerEfficiencyRating: number;
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
}
