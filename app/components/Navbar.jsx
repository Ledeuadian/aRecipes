'use client'

import React, { useState } from 'react'
import Logo from '@/public/images/logo.png'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import Button from './Button'
import Image from 'next/image'
import LoginModal from './LoginModal'
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const {data : session} = useSession();

    return (
        <header className='w-full fixed z-10 opacity-90'>
            <nav className='flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between'>
                <a href="/" className='flex items-center justify-center text-white text-lg cursor-pointer'>
                    <Image src={Logo} 
                         alt="Logo"
                         className='w-8 h-8 lg:w-14 lg:h-14'    
                         />            
                    drian<span className='ps-1 text-orange-500 text-bold'>Recipes</span>
                </a>
 
                <ul className='bg-black opacity-80 p-5 rounded-full hidden md:flex text-white gap-6 text-xl text-bold'>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/#recipes">Explore</a>
                    </li>
                    {session?.user ?  (
                    <li>
                        <a href="/favorites">Favorites</a>
                    </li>
                    ):(
                    <li></li>
                    )}
                    
                </ul>

<div className='sm:flex hidden'>
            {session?.user ?  (
                <div className='flex gap-3 md:gap-5'>
                    <button type="button" onClick={signOut} className="outline_btn text-white">
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                        />
                    </Link>
                </div>
            ) : (
                <Button
                    title='Sign in'
                    containerStyle='hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
                    handleClick={() => setOpenModal(true)}
                />
            )}
        </div>
                <button className='block md:hidden text-white text-xl'
                    onClick={() => setOpen(prev => !prev)}>
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>
            <div className={`${open ? "flex" : "hidden"} bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}>
                <a href="/">Home</a>
                <a href="/#recipes">Recipes</a>
                <a href="/">Favorites</a>
                {session?.user ?  (
                <div className='flex gap-3 md:gap-5'>
                    <button type="button" onClick={signOut} className="text-white">
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                        />
                    </Link>
                </div>
            ) : (
                <Button
                    title='Sign in'
                    containerStyle='block md:hidden bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
                    handleClick={() => setOpenModal(true)}
                />
            )}
            </div>
            <LoginModal isVisible = {openModal} onClose={() => setOpenModal(false)}/>
        </header>
      
    )
}

export default Navbar