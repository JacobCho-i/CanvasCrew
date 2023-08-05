'use client'

import { FC, useState } from 'react'
import { useDraw } from '../../../../hooks/useDraw';
import dynamic from 'next/dynamic';

const ChromePicker = dynamic(() => import('react-color').then(mod => mod.ChromePicker), { ssr: false });

interface PageProps {}

const page: FC<PageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')
  const [fillActivated, setFill] = useState(false)
  const [eraseActivated, setErase] = useState(false)
  const [spoilActivated, setSpoil] = useState(false)
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)
  let tempColor = "";

  const erase = () => {
    if (eraseActivated) {
      setErase(false)
      return
    }
    //setColor('#FFFFFF')
    setFill(false)
    setSpoil(false)
    setErase(true)
  }

  const fill = () => {
    if (fillActivated) {
      setFill(false)
      return
    }
    //setColor('#FFFFFF')
    setFill(true)
    setSpoil(false)
    setErase(false)
  }

  const spoil = () => {
    if (spoilActivated) {
      setSpoil(false)
      return
    }
    setFill(false)
    setSpoil(true)
    setErase(false)
  }

  function drawLine({prevPoint, currentPoint, ctx}: Draw) {
    const {x: currX, y: currY } = currentPoint
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = eraseActivated ? '#FFFFFF' : color
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = eraseActivated ? '#FFFFFF' : color
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
    <div className='flex flex-col gap-5 pr-10'>
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)}/>
      <div className=' flex justify-center space-x-4'>
        {fillActivated ? 
        <button type='button' className='p-2 rounded-md border border-black bg-gray-400' onClick={fill}>fill</button>
        : <button type='button' className='p-2 rounded-md border border-black' onClick={fill}>fill</button>
        }
        {eraseActivated ? 
        <button type='button' className='p-2 rounded-md border border-black bg-gray-400' onClick={erase}>eraser</button>
        : <button type='button' className='p-2 rounded-md border border-black' onClick={erase}>eraser</button>
        }
        {spoilActivated ? 
        <button type='button' className='p-2 rounded-md border border-black bg-gray-400' onClick={spoil}>spoiler</button>
        : <button type='button' className='p-2 rounded-md border border-black' onClick={spoil}>spoiler</button>
        }
        
        
        
      </div>
      
      <button type='button' className='p-2 rounded-md border border-black' onClick={clear}>Clear Canvas</button>
    </div>
    <canvas onMouseDown={onMouseDown} ref={canvasRef} width={750} height={500} className='border border-black rounded-md'/>
  </div>
  );
  
}

export default page