import Airtable, { FieldSet } from 'airtable';
import AirtableRecord from 'airtable/lib/record';
import { Game } from 'types/types';
import { GameRecord } from './airtable.types';

const base = new Airtable().base(process.env.AIRTABLE_DATABASE);
const gamesBase = base<GameRecord>('games');
// const dealsBase = base('deals');

export const getGames = async (): Promise<Game[]> => {
  const games: Game[] = [];
  await gamesBase.select({}).eachPage((gamesResult, fetchNextPage) => {
    gamesResult.forEach((game) => {
      games.push(formatGame(game));
    });

    fetchNextPage();
  });

  return games;
};

const formatGame = (gameResponse: AirtableRecord<GameRecord>): Game => ({
  airtableId: gameResponse.id,
  id: gameResponse.get('id'),
  date: gameResponse.get('date'),
  flowerCount: {
    axel: {
      atDeal: gameResponse.get('axel_flowers_at_deal'),
      duringGame: gameResponse.get('axel_flowers_during_game'),
      total: gameResponse.get('axel_flowers_total')
    },
    arielle: {
      atDeal: gameResponse.get('axel_flowers_at_deal'),
      duringGame: gameResponse.get('axel_flowers_during_game'),
      total: gameResponse.get('axel_flowers_total')
    },
    sigrid: {
      atDeal: gameResponse.get('axel_flowers_at_deal'),
      duringGame: gameResponse.get('axel_flowers_during_game'),
      total: gameResponse.get('axel_flowers_total')
    },
    per: {
      atDeal: gameResponse.get('axel_flowers_at_deal'),
      duringGame: gameResponse.get('axel_flowers_during_game'),
      total: gameResponse.get('axel_flowers_total')
    }
  },
  deals: gameResponse.get('deals') || []
});
