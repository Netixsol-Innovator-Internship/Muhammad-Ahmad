"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const NavBar: React.FC = () => {

    const [navDropDown, setNavDropDown] = useState<boolean>(false);

    return (
        <>
            <nav className='bg-[#313131] h-[42px] flex items-center justify-between pl-4 text-sm text-[#AAAAAA] font-medium'>

                <div className='flex gap-5 items-center'>
                    <Image
                        src="/svgs/epic-logo.svg"
                        alt="Epic Logo"
                        width={24}
                        height={28}
                        className='cursor-pointer'
                    >
                    </Image>

                    <ul className='hidden sm:flex gap-6'>
                        <li><a href="#" className='cursor-pointer'>STORE</a></li>
                        <li><a href="#" className='cursor-pointer'>FAQ</a></li>
                        <li><a href="#" className='cursor-pointer'>HELP</a></li>
                        <li><a href="#" className='cursor-pointer'>UNREAL ENGINE</a></li>
                    </ul>
                </div>

                <div className='hidden sm:flex h-full gap-4'>
                    <Image
                        src="/svgs/globe.svg"
                        alt="Globe"
                        width={24}
                        height={28}
                        className='cursor-pointer'
                    >
                    </Image>

                    <div className='flex gap-1 items-center'>
                        <Image
                            src="/svgs/create-profile.svg"
                            alt="Globe"
                            width={24}
                            height={28}>
                        </Image>

                        <a href="#" className='cursor-pointer'>SIGN IN</a>
                    </div>

                    <button className='h-full px-6 bg-[#007AFF] font-medium text-white cursor-pointer'>Download</button>
                </div>

                {/* Hamburger icon for mobile screens */}
                <button className='pr-4 cursor-pointer sm:hidden' onClick={() => setNavDropDown(!navDropDown)}>
                    <Image
                        src="/svgs/hamburger.svg"
                        alt="Globe"
                        width={24}
                        height={28}>
                    </Image>
                </button>
            </nav>
            
             {/* NavBar Drop Down menu */}
            {navDropDown 
            && <div className='bg-[#313131] py-4 pl-4 text-[#AAAAAA] font-medium flex flex-col gap-3'>

                <ul className='flex flex-col gap-3'>
                    <li><a href="#" className='cursor-pointer'>STORE</a></li>
                    <li><a href="#" className='cursor-pointer'>FAQ</a></li>
                    <li><a href="#" className='cursor-pointer'>HELP</a></li>
                    <li><a href="#" className='cursor-pointer'>UNREAL ENGINE</a></li>
                </ul>

                <Image
                    src="/svgs/globe.svg"
                    alt="Globe"
                    width={24}
                    height={28}>
                </Image>

                <div className='flex gap-1 items-center'>
                    <Image
                        src="/svgs/create-profile.svg"
                        alt="Globe"
                        width={24}
                        height={28}>
                    </Image>

                    <a href="#" className='cursor-pointer'>SIGN IN</a>
                </div>

                <button className='px-4 py-2 bg-[#007AFF] font-medium text-white w-fit cursor-pointer'>Download</button>
            </div>}
           

        </>
    )
}

export default NavBar
