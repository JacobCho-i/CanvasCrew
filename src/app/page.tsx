'use client'

import { FC, useEffect, useState } from 'react';

interface Room {
  title: string;
  currentplayer: number;
  maxplayer: number;
  id: string;
  password: string;
}

interface PageProps {
  initialRoomId: number;
}

const Page: FC<PageProps> = ({ initialRoomId }) => {
  const [roomId, setRoomId] = useState(initialRoomId);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [roomMaxPlayer, setRoomMaxPlayer] = useState('');
  const [password, setPassword] = useState('');
  const [roomPopUp, setRoomPopUp] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  
    useEffect(() => {
      loadDB();
    }, []);

  const handleCreateRoom = async () => {

    if (!roomPopUp) {
      setRoomPopUp(true);
      return;
    }

    if (newRoomTitle.trim() === '') {
      alert('Please enter a valid room title.');
      return;
    }

    if (isNaN(Number(roomMaxPlayer))) {
      alert('Please enter a valid integer for max player.');
      return; 
    }

    const parsedMaxPlayer = parseInt(roomMaxPlayer, 10);
    if (isNaN(parsedMaxPlayer) || parsedMaxPlayer < 1 || parsedMaxPlayer > 10) {
      alert('Please enter a valid integer between 1 and 10 for max player.');
      return;
    }

    const newRoom: Room = {
      title: newRoomTitle,
      currentplayer: 0,
      maxplayer: Number(roomMaxPlayer),
      id: Math.random().toString(36).substr(2, 9),
      password: password
    };

    setRooms((prevRooms) => [...prevRooms, newRoom]);
    const { title, currentplayer, maxplayer, id } = newRoom;
    const pw = newRoom.password;
    const res = await fetch('http://localhost:3000/api/sendDB', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        title, currentplayer, maxplayer, id, pw
      })
    })
    const responseText = await res.text();
    console.log("Response from /api/sendDB:", responseText);
    setNewRoomTitle('');
    setRoomMaxPlayer('') 
    setRoomPopUp(false);
  };

  const handleDelete = (id: string) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
  };

  const handleJoinRoom = async (room: Room) => {
    if (room.password !== '') {
      const enteredPassword = prompt('Please enter the room password:');
      if (enteredPassword !== room.password) {
        alert('Incorrect password, please try again.');
        return;
      }
    }
    const req = await fetch('http://localhost:3000/api/loadDB', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    if (!req.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse = await req.json();
    console.log(jsonResponse);
    const roomData: Room[] = jsonResponse.data;
    for (let room_data of roomData) {
      if (room_data.id == room.id) {
        if (room_data.currentplayer == room_data.maxplayer) {
          alert('This room is full!');
          return;
        }
      }
    }
    const currentplayer = room.currentplayer;
    const id = room.id;
    const res = await fetch('http://localhost:3000/api/joinRoom', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        currentplayer, id
      })
    })
    window.location.href = `/rooms/${room.id}`;
  };

  async function loadDB() {
    try {
        const res = await fetch('http://localhost:3000/api/loadDB', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const jsonResponse = await res.json();
        console.log(jsonResponse);
        const roomData: Room[] = jsonResponse.data;
        if (Array.isArray(roomData)) {
            setRooms(roomData);
        } else {
            console.error("Received data is not an array:", roomData);
        }
    } catch (error) {
        console.error("Error loading rooms from DB:", error);
    }
}
  

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10' style={{ maxHeight: 'calc(100vh - 50px)', overflowY: 'auto' }}>
      {roomPopUp ? (
          <>
            <div className='flex gap-4'>
              <input
                type='text'
                value={newRoomTitle}
                onChange={(e) => setNewRoomTitle(e.target.value)}
                placeholder='Enter room title'
                className='p-2 border bg-white'
                style={{ width: '150px', height: '30px' }}
              />
              <input
                type='text'
                value={roomMaxPlayer}
                onChange={(e) => setRoomMaxPlayer(e.target.value)}
                placeholder='Max players'
                className='p-1 border bg-white'
                style={{ width: '100px', height: '30px' }}
              />
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={isPasswordProtected}
                  onChange={(e) => setIsPasswordProtected(e.target.checked)}
                />
                Password?
              </label>
              {isPasswordProtected ? <input
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                className='p-1 border bg-white'
                style={{ width: '70px', height: '30px' }}
              /> :
              <></>}
              <button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleCreateRoom}
              >
                Create Room
              </button>
            </div>
          </>
        ) : (
          <div className='flex justify-center'>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleCreateRoom}
            >
              Create Room
            </button>
          </div>
        )}
        <div style={{ width: '600px' }}>
          <table>
            <thead>
              <tr>
                <th className='w-1/3 p-4'>Title</th>
                <th className='w-1/6 p-4'>Players</th>
                <th className='w-1/2 p-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className='rounded-lg overflow-hidden shadow-md'>
                  <td className='w-1/3 p-4'>{room.title}</td>
                  <td className='w-1/6 p-4 mr-16'>
                    {room.currentplayer}/{room.maxplayer}
                  </td>
                  <td className='w-1/2 p-2 ml-16 flex justify-between'>
                    {room.password !== '' ? 
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => handleJoinRoom(room)}
                    >
                      🔒 Join
                    </button> 
                    : 
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => handleJoinRoom(room)}
                    >
                       Join
                    </button>}
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleDelete(room.id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const roomId = Math.floor(Math.random() * 9000) + 1000;
  return { props: { initialRoomId: roomId } };
}

export default Page;