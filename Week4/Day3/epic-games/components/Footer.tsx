"use client"

import React from 'react'
import Image from 'next/image'

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#181818] text-gray-300 pt-10 pb-4 px-4 sm:px-8 w-full">
            
                {/* Social Icons */}
                <div className="flex justify-start gap-6 mb-8">
                    <a href="#" aria-label="Facebook" className='cursor-pointer'>
                        <Image src="/svgs/facebook-logo.svg" alt="Facebook" width={16} height={24} />
                    </a>
                    <a href="#" aria-label="Twitter" className='cursor-pointer'>
                        <Image src="/svgs/twitter-logo.svg" alt="Twitter" width={24} height={24} />
                    </a>
                    <a href="#" aria-label="YouTube" className='cursor-pointer'>
                        <Image src="/svgs/youtube-logo.svg" alt="YouTube" width={24} height={24} />
                    </a>
                </div>

                {/* Resource Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-2 gap-x-6 mb-8 text-[1rem]">
                    <span className="font-medium text-gray-400 col-span-2 sm:col-span-3 md:col-span-5 mb-2">Resource</span>
                    <a href="#" className="hover:text-white cursor-pointer">Creator Support</a>
                    <a href="#" className="hover:text-white cursor-pointer">Published On Epic</a>
                    <a href="#" className="hover:text-white cursor-pointer">Profession</a>
                    <a href="#" className="hover:text-white cursor-pointer">Company</a>
                    <a href="#" className="hover:text-white cursor-pointer">Fan Work Policy</a>
                    <a href="#" className="hover:text-white cursor-pointer">User Exp Service</a>
                    <a href="#" className="hover:text-white cursor-pointer">User Licence</a>
                    <a href="#" className="hover:text-white cursor-pointer">Online Service</a>
                    <a href="#" className="hover:text-white cursor-pointer">Community</a>
                    <a href="#" className="hover:text-white cursor-pointer">Epic Newsroom</a>
                    <a href="#" className="hover:text-white cursor-pointer">Battle Breakers</a>
                    <a href="#" className="hover:text-white cursor-pointer">Fortnite</a>
                    <a href="#" className="hover:text-white cursor-pointer">Infinity Blade</a>
                    <a href="#" className="hover:text-white cursor-pointer">Robo Recall</a>
                    <a href="#" className="hover:text-white cursor-pointer">Shadow Complex</a>
                    <a href="#" className="hover:text-white cursor-pointer">Unreal Tournament</a>
                </div>

                {/* Legal Text */}
                <div className="text-xs text-gray-400 mb-6 md:max-w-[70%] leading-relaxed">
                    © 2022, Epic Games, Inc. All rights reserved. Epic, Epic Games, Epic Games logo, Fortnite, Fortnite logo, Unreal, Unreal Engine, Unreal Engine logo, Unreal Tournament and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. Other brand or product names are trademarks of their respective owners. Transactions outside the United States are handled through Epic Games International, S.à r.l..
                </div>

                {/* Policy Links */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                    <a href="#" className="hover:text-white cursor-pointer">Terms of Service</a>
                    <a href="#" className="hover:text-white cursor-pointer">Privacy Policy</a>
                    <a href="#" className="hover:text-white cursor-pointer">Store Refund Policy</a>
                </div>
        </footer>
    );
}

export default Footer
