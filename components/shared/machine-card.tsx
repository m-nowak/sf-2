
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Oee from './oee'

import { unstable_noStore as noStore } from 'next/cache';



const MachineCard = ({ asset, time, quality, performance, availibility, oee }: any) => {
    noStore();


    return (
        <div className='w-[420px] h-[400px] float-left ml-4 mt-4 '>
            <Card className='w-[420px] h-[400px]'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex justify-between items-center '>
                            <span>{asset}</span>
                            <span></span>
                        </div >
                    </CardTitle >

                </CardHeader >
                <CardContent>

                    <Oee asset={asset} time={time} quality={quality} performance={performance} availibility={availibility} oee={oee} />

                </CardContent>

            </Card >
        </div >
    )
}

export default MachineCard