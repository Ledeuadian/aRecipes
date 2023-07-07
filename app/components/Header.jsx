import React from 'react';
import Image from 'next/image';
import banner1 from '@/public/images/banner1.jpeg'
import banner2 from '@/public/images/banner2.jpeg'
import banner3 from '@/public/images/banner3.jpeg'

const images = [banner1, banner2, banner3];

const Header = ({title,image, type}) => {
  return (
    <div className='w-full h-[100vh]'>
        <div className='relative w-full h-full'>
        <Image src={image ?? images[Math.floor(Math.random() * images.length)]}
                alt="Recipes"
                width= '2000'
                height= '2000'
                className='w-full h-full object-cover'
            />
        </div>
        <div className='absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px4'>
            <h1 className='text-white text-4xl md:text-5xl font-bold text-center'>{title}</h1>
                {
                    type && (
                        <p className='text-sm mt-4 text-center text-orange-500 bg-[#00000090] px-6 py-4 rounded-full'>
                            Welcome to Arecipes, your passport to culinary adventures!
                            <br className='hidden md:block'/>Discover a treasure trove of delectable recipes from arround the globe.
                        </p>
                    )
                }
        </div>
    </div>
  )
}

export default Header