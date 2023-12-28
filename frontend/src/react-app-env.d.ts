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
  rtg: number;
  efg: number;
  ts: number;
  usg: number;
  pie: number;
}

interface Playerstat {
  Name: string;
  Minutes: number;
  Points: number;
  Assists: number;
  Rebounds: number;
}
