/// <reference types="react-scripts" />
declare module 'react-burger-menu';



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
