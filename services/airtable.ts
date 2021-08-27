import Airtable, { FieldSet } from 'airtable';
import AirtableRecord from 'airtable/lib/record';
import { Deal, FlowerCount, Game } from 'types/types';
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

export const createDeal = async (gameId: string): Promise<Deal> => {
  const emptyFlowerCount = (): FlowerCount => ({
    atDeal: 0,
    duringGame: 0,
    total: 0
  })
  const newDeal: Partial<Deal> = {
    game: gameId,
    flowerCount: {
      axel: emptyFlowerCount(),
      arielle: emptyFlowerCount(),
      sigrid: emptyFlowerCount(),
      per: emptyFlowerCount()
    }
  }
  return new Promise((resolve, reject) => {
    dealsBase
      .create(mapDeal(newDeal))
      .then((result) => resolve(formatDeal(result)))
      .catch((error) => {
        reject(error);
        console.error(error);
      });
  });
}

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

export const getDeal = async (dealId: string): Promise<Deal> => {
  const query = {
    filterByFormula: `RECORD_ID()='${dealId}'`
  };

  const deals: Deal[] = [];
  await dealsBase.select(query).eachPage((dealsResult, fetchNextPage) => {
    dealsResult.forEach((deal) => {
      deals.push(formatDeal(deal));
    });

    fetchNextPage();
  });

  return deals[0];
};

export const updateDeal = async (
  dealId: string,
  deal: Partial<Deal>
): Promise<Deal> => {
  return new Promise((resolve, reject) => {
    dealsBase
      .update(dealId, mapDeal(deal))
      .then((result) => resolve(formatDeal(result)))
      .catch((error) => {
        reject(error);
        console.error(error);
      });
  });
};

const formatDeal = (dealResponse: AirtableRecord<DealRecord>): Deal => ({
  airtableId: dealResponse.id,
  id: dealResponse.get('id'),
  createdAt: dealResponse.get('created_at'),
  game: dealResponse.get('game')[0],
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

const mapDeal = (deal: Partial<Deal>): DealRecord => ({
  id: deal?.id,
  created_at: deal?.createdAt,
  game: [deal?.game],
  axel_flowers_at_deal: deal?.flowerCount?.axel?.atDeal,
  axel_flowers_during_game: deal?.flowerCount?.axel?.duringGame,
  axel_flowers_total: undefined,
  arielle_flowers_at_deal: deal?.flowerCount?.arielle?.atDeal,
  arielle_flowers_during_game: deal?.flowerCount?.arielle?.duringGame,
  arielle_flowers_total: undefined,
  sigrid_flowers_at_deal: deal?.flowerCount?.sigrid?.atDeal,
  sigrid_flowers_during_game: deal?.flowerCount?.sigrid?.duringGame,
  sigrid_flowers_total: undefined,
  per_flowers_at_deal: deal?.flowerCount?.per?.atDeal,
  per_flowers_during_game: deal?.flowerCount?.per?.duringGame,
  per_flowers_total: undefined
});
