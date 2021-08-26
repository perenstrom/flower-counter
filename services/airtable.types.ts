import { FieldSet } from "airtable";

export interface GameRecord extends FieldSet {
  id: number;
  date: string;
  axel_flowers_at_deal: number;
  axel_flowers_during_game: number;
  axel_flowers_total: number;
  arielle_flowers_at_deal: number;
  arielle_flowers_during_game: number;
  arielle_flowers_total: number;
  sigrid_flowers_at_deal: number;
  sigrid_flowers_during_game: number;
  sigrid_flowers_total: number;
  per_flowers_at_deal: number;
  per_flowers_during_game: number;
  per_flowers_total: number;
  deals: string[];
}

export interface DealRecord extends FieldSet {
  id: number;
  created_at: string;
  axel_flowers_at_deal: number;
  axel_flowers_during_game: number;
  axel_flowers_total: number;
  arielle_flowers_at_deal: number;
  arielle_flowers_during_game: number;
  arielle_flowers_total: number;
  sigrid_flowers_at_deal: number;
  sigrid_flowers_during_game: number;
  sigrid_flowers_total: number;
  per_flowers_at_deal: number;
  per_flowers_during_game: number;
  per_flowers_total: number;
}