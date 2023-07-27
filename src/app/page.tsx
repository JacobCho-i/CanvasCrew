import { FC } from 'react'

interface PageProps {}

const page: FC<PageProps> = ({}) => {
  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
    <canvas width={750} height={750} className='border border-black rounded-md'/>
  </div>
  );
  
}

export default page