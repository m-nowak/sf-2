import React from 'react'
import Image from "next/image";
import ModeToggle from './mode-toggle';

const Navbar = () => {
    return (
        <div className='h-20 flex justify-between items-center'>
            <div className='flex items-center'>

                <Image
                    src="..//assets/icons/stars.svg"
                    alt="logo"
                    width={36}
                    height={36}
                />

                <div className='ml-3 font-semibold text-2xl'>SF Dashboard</div>
            </div>
            <div>
                <ModeToggle />
            </div>
        </div>
    )
}

export default Navbar