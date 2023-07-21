'use client';

import Input from './Inputs'
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useState, useEffect } from "react";
import { signIn, getProviders } from 'next-auth/react'

import {AiFillCloseCircle} from "react-icons/ai"

const icons =[BsGoogle, BsGithub]

const LoginModal = ({isVisible,onClose}) => {
    if (!isVisible) return null;

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
       
    },[])
    //NextAuth Social Sign in
  return (
    <div
        className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        "
    >
        <div
            className="
                bg-white
                px-1
                py-4
                shadow
                sm:rounded-lg
                sm:px-10
            "        
        >
      <div className='w-full ms-auto flex justify-end'>
    <button className='
                    text-black 
                    text-xl 
                    ' 
                onClick={() => onClose()}
                >
                  <AiFillCloseCircle/>
                </button>
            </div>
            <form 
                className="space-y-6"
                onSubmit={() => ({}) }
            >

                <p>Email Address</p>
                <Input
                    id="email"
                    label="Email address"
                    type="email"
                    register=''
                    errors=''
                    disabled=''
                />
                <p>Password</p>
                 <Input
                    id="password"
                    label="password"
                    type="password"
                    register=''
                    errors=''
                    disabled=''
                />
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="
                        text-lg
                        text-black
                        bg-blue-400
                        p-3
                        rounded
                        w-full
                        "
                    >
                        Sign In
                    </button>
                </div>
            </form>
            
            <div className='mt-6'>
                <div className='relative'>
                    <div
                        className='
                        absolute
                        inset-3
                        flex
                        item-center
                        '
                    >
                    <div className='
                        w-full 
                        border-t
                        border-gray-300'
                    />  
                    </div>
                    <div className='
                        relative 
                        flex 
                        justify-center 
                        text-sm
                        '
                        >
                        <span className='
                            bg-white 
                            px-2 
                            text-gray-500
                            '
                            >
                             Or continue with
                        </span>
                    </div>
                </div>
                <div className='mt-6 flex gap-2'>
                {providers && Object.values(providers).map((provider,index) => (
                    <AuthSocialButton
                        icon={icons[index]}
                        onClick={() => signIn(provider.id)}
                        type = "button"
                        key={provider.name}
                    />
                ))}
                </div>
            </div>
            <div className='
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
            '>
                <div>
                    Login
                </div>
                <div
                    onClick={() => ({})}
                    className='underline cursor-pointer'
                >
                    Login
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginModal