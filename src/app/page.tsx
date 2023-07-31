'use client'
import { FC, useState } from 'react';

interface Room {
  title: string;
  currentPlayer: number;
  maxPlayer: number;
  id: string;
}

interface PageProps {
  initialRoomId: number;
}

const Page: FC<PageProps> = ({ initialRoomId }) => {
  const [roomId, setRoomId] = useState(initialRoomId);
  const [rooms, setRooms] = useState(roomProp);

  const handleDelete = (id: string) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
  };

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
            {rooms.map((room) => (
              <tr key={room.id} className='rounded-lg overflow-hidden shadow-md'>
                <td className='w-1/4 p-4'>{room.title}</td>
                <td className='w-1/4 p-4'>
                  {room.currentPlayer}/{room.maxPlayer}
                </td>
                <td className='w-1/2 p-2'>
                  <a href={`/rooms/${room.id}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Join</button>
                  </a>
                </td>
                <td className='w-4 p-4'>
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleDelete(room.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const roomProp: Room[] = [
  { title: "Hi there", currentPlayer: 2, maxPlayer: 4, id: '1111' },
  { title: "Hello", currentPlayer: 1, maxPlayer: 4, id: '2222' },
  { title: "I am hungry", currentPlayer: 1, maxPlayer: 2, id: '3333' },
  { title: "any drawers?", currentPlayer: 3, maxPlayer: 4, id: '4444' }
];

export async function getServerSideProps() {
  const roomId = Math.floor(Math.random() * 9000) + 1000;
  return { props: { initialRoomId: roomId } };
}

export default Page;