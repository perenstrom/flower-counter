import { NextApiRequest, NextApiResponse } from 'next';
import { createDeal, updateDeal } from 'services/airtable';
import { Deal } from 'types/types';

interface PatchRequestBody {
  dealId: string;
  deal: Deal;
}
interface PostRequestBody {
  gameId: string;
}

const deals = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    return new Promise((resolve) => {
      const { dealId, deal }: PatchRequestBody = req.body;
      if (!dealId || !deal) {
        res.status(400).end('Both dealId and deal must be provided');
        resolve('');
      } else {
        updateDeal(dealId, deal)
          .then((deal) => {
            res.status(200).end(JSON.stringify(deal));
            resolve('');
          })
          .catch((error) => {
            res.status(500).end(error);
            return resolve('');
          });
      }
    });
  } else if (req.method === 'POST') {
    return new Promise((resolve) => {
      const { gameId }: PostRequestBody = req.body;
      if (!gameId) {
        res.status(400).end('gameId must be provided');
        resolve('');
      } else {
        createDeal(gameId)
          .then((deal) => {
            res.status(200).end(JSON.stringify(deal));
            resolve('');
          })
          .catch((error) => {
            res.status(500).end(error);
            return resolve('');
          });
      }
    });
  } else {
    res.status(404);
  }
};

export default deals;
