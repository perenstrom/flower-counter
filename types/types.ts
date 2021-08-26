export interface FlowerCount {
  atDeal: number;
  duringGame: number;
  total: number;
}

export interface FlowerCounts {
  axel: FlowerCount;
  arielle: FlowerCount;
  sigrid: FlowerCount;
  per: FlowerCount;
}

export interface Deal {
  airtableId: string;
  id: number;
  createdAt: string;
  flowerCount: FlowerCounts;
}

export interface Game {
  airtableId: string;
  id: number;
  deals: string[];
  date: string;
  flowerCount: FlowerCounts;
}