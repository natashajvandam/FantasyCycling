interface Data {
  rank: string;
  prev: string;
  next: string;
  rider: string;
  team: string;
  score: string;
}

interface Names {
  firstName: string;
  lastNames: string;
  rider: Data;
}

interface RiderImage {
  image: string;
  rider: Data;
  pnts: string[];
  nextRace: string;
}

interface RiderDates {
  rider: string;
  end_date: Date;
  start_date: Date;
}

interface NewUser {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

interface User extends NewUser {
  id: number;
  email: string;
  nickname: string;
  score: number;
  money: number;
}

interface Rider {
  id: number;
  name: string;
  price: number;
  roster: number;
  added_at: Date;
  team: string;
  image: string;
  classic_pnts: number;
  gc_pnts: number;
  tt_pnts: number;
  sprint_pnts: number;
  climb_pnts: number;
  next_race: string;
}
