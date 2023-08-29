import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../database/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM yourTableName');
      res.status(200).json(result.rows);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).end();
  }
}