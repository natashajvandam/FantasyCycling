export type RiderStats = {
  rank: string;
  prev: string;
  next: string;
  rider: string;
  team: string;
  score: string;
};

export type Name = {
  firstName: string;
  lastNames: string;
  rider: RiderStats;
};
