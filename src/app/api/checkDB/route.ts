import { NextResponse } from "next/server";
import { query } from '../../database/db';

export async function GET(request: Request) {
    try {
        await query(`
        INSERT INTO room_data (id, title, currentPlayer, maxPlayer, password)
        VALUES ('1111', 'hello', 2, 4, '');
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

