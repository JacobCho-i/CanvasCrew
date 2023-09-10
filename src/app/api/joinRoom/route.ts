import { NextResponse } from "next/server";
import { query } from '../../database/db';

type Room = {
    title?: string, 
    currentplayer?: string, 
    maxplayer?: string, 
    id?: string,
    pw?: string,
}

export async function PUT(request: Request) {
    const data: Room = await request.json()
    try {
        console.log('data: ', data)
        const { currentplayer, id} = data
        const cp = Number(currentplayer) + 1;
        const sql = `
            UPDATE room_data
            SET currentPlayer = $1
            WHERE id = $2;
        `;
        const values = [cp, id];
        const result = await query(sql, values);
        return NextResponse.json({ data: result.rows });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred.' });
        }
      }
}