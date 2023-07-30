'use client'

import { FC, useState } from 'react'

interface PageProps {
  initialRoomId: number;
  
}

const Page: FC<PageProps> = ({ initialRoomId }) => {
  const [roomId, setRoomId] = useState(initialRoomId);

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
      <table>
      <thead className=''>
        <tr>
        <th className='w-1/3 p-4'>Title</th>
        <th className='w-1/6 p-4'>Players</th>
        <th className='w-1/2 p-4'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roomProp.map((room) => (
          <tr key={room.id} className='rounded-lg overflow-hidden shadow-md'>
            <td className='w-1/4 p-4'>{room.title}</td>
            <td className='w-1/4 p-4'>{room.currentPlayer}/{room.maxPlayer}</td>
            <td className='w-1/2 p-4'>
              <a href={`/rooms/${room.id}`}>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Join</button>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  );
}

const roomProp = [
  {title: "Hi there", currentPlayer:2, maxPlayer:4, id: '1111'},
  {title: "Hello", currentPlayer:1, maxPlayer:4, id: '2222'},
  {title: "I am hungry", currentPlayer:1, maxPlayer:2, id: '3333'},
  {title: "any drawers?", currentPlayer:3, maxPlayer:4, id: '4444'}
];


export async function getServerSideProps() {
  const roomId = Math.floor(Math.random() * 9000) + 1000;

  return { props: { initialRoomId: roomId } };
}

export default Page;