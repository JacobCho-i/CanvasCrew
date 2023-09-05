import { NextResponse } from "next/server";
import { query } from '../../database/db';

export async function GET(request: Request) {
    try {
        const result = await query(`
            SELECT * FROM room_data;
        `);
        return NextResponse.json({ data: result.rows });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred.' });
        }
      }
}