import { NextResponse } from "next/server";
import { query } from '../../database/db';

export async function GET(request: Request) {
    try {
        await query(`
          CREATE TABLE IF NOT EXISTS room_data (
            id VARCHAR(4) PRIMARY KEY,
            title VARCHAR(100),
            currentPlayer INT,
            maxPlayer INT,
            password VARCHAR(100)
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

