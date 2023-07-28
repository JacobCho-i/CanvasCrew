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
        <a href={`/rooms/${roomId}`}>
          <button>to random room</button>
        </a>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const roomId = Math.floor(Math.random() * 9000) + 1000;

  return { props: { initialRoomId: roomId } };
}

export default Page;