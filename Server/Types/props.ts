/* eslint-disable import/extensions */
import { Rider, RiderList } from "./riders";
import { User } from "./users";

export interface ListProps {
  mine: boolean;
  riderList?: RiderList;
  addToRoster: (userId: number, riderId: number) => Promise<Rider>;
  removeFromRoster: (userId: number, riderId: number) => Promise<void>;
  userData: User;
  booleanObj: { [id: number]: boolean };
  setBooleanObj: React.Dispatch<
    React.SetStateAction<{ [id: number]: boolean }>
  >;
}
