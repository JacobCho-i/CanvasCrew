import { NextResponse } from "next/server";
import { query } from '../../database/db';

export async function GET(request: Request) {
    try {
        await query(`
            ALTER TABLE room_data ALTER COLUMN id TYPE VARCHAR(10);
        `);
        return NextResponse.json({ message: 'Table exists!' });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred.' });
        }
      }
}

