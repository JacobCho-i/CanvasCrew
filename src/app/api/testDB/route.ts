import { NextResponse } from "next/server";
import { query } from '../../database/db';

export async function GET(request: Request) {
    try {
        // Create a sample table
        await query(`
          CREATE TABLE IF NOT EXISTS sample_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
          );
        `);
        return NextResponse.json({ message: 'Table created successfully!' });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred.' });
        }
      }
}

