import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../database/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Create a sample table
      await query(`
        CREATE TABLE IF NOT EXISTS sample_table (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100)
        );
      `);
      res.status(200).json({ message: 'Table created successfully!' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
