'use client'

import { FC, useState } from 'react'
import { useDraw } from '../../../../hooks/useDraw';
import dynamic from 'next/dynamic';

const ChromePicker = dynamic(() => import('react-color').then(mod => mod.ChromePicker), { ssr: false });

interface PageProps {}

const page: FC<PageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')
  const [eraseActivated, setErase] = useState(false)
  const [spoilActivated, setSpoil] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [isRoomCreater, setRoomCreater] = useState(true);
  const [users, setUsers] = useState<string[]>(players);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  const erase = () => {
    if (eraseActivated) {
      setErase(false)
      return
    }
    setSpoil(false)
    setErase(true)
  }



  const spoil = () => {
    if (spoilActivated) {
      setSpoil(false)
      return
    }
    setSpoil(true)
    setErase(false)
  }

  const spoiler = (x: number, y: number) => {
    if (!canvasRef.current) {
      return;
    } 
  
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    } 
  
    const pixelColor = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = rgbToHex(pixelColor[0], pixelColor[1], pixelColor[2]);
    setColor(hexColor);
  };

  const onMouseDownSpoiler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return; 
  
    const boundingRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - boundingRect.left;
    const y = e.clientY - boundingRect.top;
  
    spoiler(x, y);
  };

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(parseInt(e.target.value, 10));
  };
  
  const handleDelete = (username: string) => {
    setUsers((prevUsers) => prevUsers.filter((users) => users !== username));
  };

  function drawLine({prevPoint, currentPoint, ctx}: Draw) {
    const {x: currX, y: currY } = currentPoint;
    const radius = strokeWidth / 2;
  
    if (prevPoint) {
      ctx.beginPath();
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = eraseActivated ? '#FFFFFF' : color;
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(currX, currY);
      ctx.stroke();
    }
  
    ctx.beginPath();
    ctx.fillStyle = eraseActivated ? '#FFFFFF' : color;
    ctx.arc(currX, currY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
    <div className='flex flex-col gap-5 pr-10'>
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)}/>
      <div className=' flex justify-center space-x-4'>
        {eraseActivated ? 
        <button type='button' className='p-2 rounded-md border border-black bg-gray-400' onClick={erase}>eraser</button>
        : <button type='button' className='p-2 rounded-md border border-black' onClick={erase}>eraser</button>
        }
        {spoilActivated ? 
        <button type='button' className='p-2 rounded-md border border-black bg-gray-400' onClick={spoil}>pipette</button>
        : <button type='button' className='p-2 rounded-md border border-black' onClick={spoil}>pipette</button>
        }
      </div>
      <input type='text' className='p-2 border bg-white' placeholder='brush stroke..' onChange={handleStrokeChange} value={strokeWidth} /> 
      <button type='button' className='p-2 rounded-md border border-black'>set stroke</button>
      <button type='button' className='p-2 rounded-md border border-black' onClick={clear}>Clear Canvas</button>
    </div>
    <div className='flex items-start'>
      <canvas
        onMouseDown={spoilActivated ? onMouseDownSpoiler : onMouseDown}
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-black rounded-md"
      />
      <table className="border border-black ml-4">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">Current Players</th>
          </tr>
        </thead>
        <tbody>
          {/* Use the users state instead of players constant */}
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border border-black px-4 py-2 space-x-4">
                {user}
                {isRoomCreater ? <button type='button' onClick={() => handleDelete(user)}>X</button> : <></>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
  
}

const players: string[] = [
  "hello", "world", "nice"
]

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export default page