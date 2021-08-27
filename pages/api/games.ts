import { NextApiRequest, NextApiResponse } from 'next';
import { createGame } from 'services/airtable';

const games = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return new Promise((resolve) => {
      createGame()
        .then((game) => {
          res.status(200).end(JSON.stringify(game));
          resolve('');
        })
        .catch((error) => {
          res.status(500).end(error);
          return resolve('');
        });
    });
  } else {
    res.status(404);
  }
};

export default games;
