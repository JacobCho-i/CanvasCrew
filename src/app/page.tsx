'use client'

import { FC, useState } from 'react'
import { useDraw } from '../../hooks/useDraw';
import { start } from 'repl';
import { ChromePicker } from 'react-color'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
interface PageProps {}

const page: FC<PageProps> = ({}) => {

  const generateRandomId = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const randomId = generateRandomId();
  
  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <a href={`/rooms/${randomId}`}>
          <button>to random room</button>
        </a>
      </div>
    </div>
  );
    
}

export default page