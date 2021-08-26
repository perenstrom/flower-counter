import Airtable, { FieldSet } from 'airtable';
import AirtableRecord from 'airtable/lib/record';
import { Deal, Game } from 'types/types';
import { DealRecord, GameRecord } from './airtable.types';

const base = new Airtable().base(process.env.AIRTABLE_DATABASE);
const gamesBase = base<GameRecord>('games');
const dealsBase = base<DealRecord>('deals');

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

export const getGame = async (gameId: string): Promise<Game> => {
  const query = {
    filterByFormula: `RECORD_ID()='${gameId}'`
  };

  const games: Game[] = [];
  await gamesBase.select(query).eachPage((gamesResult, fetchNextPage) => {
    gamesResult.forEach((game) => {
      games.push(formatGame(game));
    });

    fetchNextPage();
  });

  return games[0];
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
  deals: gameResponse.get('deals') || []
});

export const getDeals = async (dealIds: string[]): Promise<Deal[]> => {
  const query = {
    filterByFormula: `OR(${dealIds
      .map((id) => `RECORD_ID()='${id}'`)
      .join(',')})`
  };

  const deals: Deal[] = [];
  await dealsBase.select(query).eachPage((dealsResult, fetchNextPage) => {
    dealsResult.forEach((deal) => {
      deals.push(formatDeal(deal));
    });

    fetchNextPage();
  });

  return deals;
};

const formatDeal = (dealResponse: AirtableRecord<DealRecord>): Deal => ({
  airtableId: dealResponse.id,
  id: dealResponse.get('id'),
  createdAt: dealResponse.get('created_at'),
  flowerCount: {
    axel: {
      atDeal: dealResponse.get('axel_flowers_at_deal'),
      duringGame: dealResponse.get('axel_flowers_during_game'),
      total: dealResponse.get('axel_flowers_total')
    },
    arielle: {
      atDeal: dealResponse.get('axel_flowers_at_deal'),
      duringGame: dealResponse.get('axel_flowers_during_game'),
      total: dealResponse.get('axel_flowers_total')
    },
    sigrid: {
      atDeal: dealResponse.get('axel_flowers_at_deal'),
      duringGame: dealResponse.get('axel_flowers_during_game'),
      total: dealResponse.get('axel_flowers_total')
    },
    per: {
      atDeal: dealResponse.get('axel_flowers_at_deal'),
      duringGame: dealResponse.get('axel_flowers_during_game'),
      total: dealResponse.get('axel_flowers_total')
    }
  }
});
