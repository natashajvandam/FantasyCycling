export interface IRider {
  id: number;
  name: string;
  price: number;
  roster: number;
  added_at?: string;
  team: string;
  image: string;
  classic_pnts: number;
  gc_pnts: number;
  tt_pnts: number;
  sprint_pnts: number;
  climb_pnts: number;
  next_race: string;
}
export interface IUser {
  id: number;
  email: string;
  nickname: string;
  score: number;
  money: number;
}

export interface SimpleUser {
  email?: string;
  nickname?: string;
}

export interface fetchOptions {
  method: string;
  body?: string;
  headers: {
    'Content-Type'?: string;
    Authorization?: string;
  };
}

export interface IResponse{
    ok: boolean
}

