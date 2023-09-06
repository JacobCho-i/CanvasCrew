import { NextResponse } from "next/server";
import { query } from '../../database/db';

type Room = {
    title?: string, 
    currentPlayer?: string, 
    maxPlayer?: string, 
    id?: string,
    pw?: string,
}

export async function PUT(request: Request) {
    const data: Room = await request.json()
    try {
        console.log('data: ', data)
        const { title, currentPlayer, maxPlayer, id, pw } = data
        const cp = Number(currentPlayer);
        const mp = Number(maxPlayer);
        const sql = `
            INSERT INTO room_data (id, title, currentPlayer, maxPlayer, password)
            VALUES ($1, $2, $3, $4, $5);
        `;
        const values = [id, title, cp, mp, pw];
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