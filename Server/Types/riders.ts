export interface Rider {
  id: number;
  name: string;
  price: number;
  roster: null;
  added_at: null;
  team: string;
  image: string;
  classic_pnts: number;
  gc_pnts: number;
  tt_pnts: number;
  sprint_pnts: number;
  climb_pnts: number;
  next_race: string;
  ok?: boolean;
}

export type RiderList = Rider[];

export type RiderData = {
  rank: string;
  prev: string;
  next: string;
  rider: string;
  team: string;
  score: string;
};
