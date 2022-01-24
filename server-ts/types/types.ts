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
