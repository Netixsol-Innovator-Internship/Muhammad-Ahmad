"use client"

import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#181818] text-gray-300 pt-10 pb-4 px-4 sm:px-8 w-full">
            
                {/* Social Icons */}
                <div className="flex justify-start gap-6 mb-8">
                    <a href="#" aria-label="Facebook">
                        <img src="/svgs/facebook-logo.svg" alt="Facebook" className="w-4 h-6" />
                    </a>
                    <a href="#" aria-label="Twitter">
                        <img src="/svgs/twitter-logo.svg" alt="Twitter" className="w-6 h-6" />
                    </a>
                    <a href="#" aria-label="YouTube">
                        <img src="/svgs/youtube-logo.svg" alt="YouTube" className="w-6 h-6" />
                    </a>
                </div>

                {/* Resource Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-2 gap-x-6 mb-8 text-[1rem]">
                    <span className="font-medium text-gray-400 col-span-2 sm:col-span-3 md:col-span-5 mb-2">Resource</span>
                    <a href="#" className="hover:text-white">Creator Support</a>
                    <a href="#" className="hover:text-white">Published On Epic</a>
                    <a href="#" className="hover:text-white">Profession</a>
                    <a href="#" className="hover:text-white">Company</a>
                    <a href="#" className="hover:text-white">Fan Work Policy</a>
                    <a href="#" className="hover:text-white">User Exp Service</a>
                    <a href="#" className="hover:text-white">User Licence</a>
                    <a href="#" className="hover:text-white">Online Service</a>
                    <a href="#" className="hover:text-white">Community</a>
                    <a href="#" className="hover:text-white">Epic Newsroom</a>
                    <a href="#" className="hover:text-white">Battle Breakers</a>
                    <a href="#" className="hover:text-white">Fortnite</a>
                    <a href="#" className="hover:text-white">Infinity Blade</a>
                    <a href="#" className="hover:text-white">Robo Recall</a>
                    <a href="#" className="hover:text-white">Shadow Complex</a>
                    <a href="#" className="hover:text-white">Unreal Tournament</a>
                </div>

                {/* Legal Text */}
                <div className="text-xs text-gray-400 mb-6 md:max-w-[70%] leading-relaxed">
                    © 2022, Epic Games, Inc. All rights reserved. Epic, Epic Games, Epic Games logo, Fortnite, Fortnite logo, Unreal, Unreal Engine, Unreal Engine logo, Unreal Tournament and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. Other brand or product names are trademarks of their respective owners. Transactions outside the United States are handled through Epic Games International, S.à r.l..
                </div>

                {/* Policy Links */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Store Refund Policy</a>
                </div>
        </footer>
    );
}

export default Footer
