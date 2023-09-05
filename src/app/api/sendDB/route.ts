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
        // const result = await query(`
        //     INSERT INTO room_data (id, title, currentPlayer, maxPlayer, password)
        //     VALUES ('1111', 'hello', 2, 4, '');
        // `);
        //return NextResponse.json({ data: result.rows });
        console.log('data: ', data)
        const { title, currentPlayer, maxPlayer, id, pw } = data
        return NextResponse.json({ title, currentPlayer, maxPlayer, id, pw });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred.' });
        }
      }
}