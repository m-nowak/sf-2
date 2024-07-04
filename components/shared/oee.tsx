import React from 'react'
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { Separator } from '../ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import MoreInfoAvailability from './more-info-avaiability';
import MoreInfoQuality from './more-info-quality';
import MoreInfoPerformance from './more-info-performance';


export default function Oee({ time, asset, quality, performance, availibility, oee }: any) {

    const getDescription = (time: any) => {
        if (time === "365") {
            return "within a year."
        } else {
            return "in the last " + time + " days.";
        }
    }

    let data = [
        {
            name: 'full',
            value: 100,
            fill: "none",
        },
        {
            name: 'Quality',
            value: quality * 100,
            fill: '#E94B54',
        },
        {
            name: 'Performance',
            value: performance,
            fill: '#FBDA00',
        },

        {
            name: 'Availability',
            value: availibility,
            fill: '#ACCC58',
        }
    ];

    return (
        <>
            <div className='relative w-full h-full'>
                <ResponsiveContainer width="100%" height={250}>

                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={24} data={data} startAngle={90} // Start angle for top-left
                        endAngle={-270}>
                        <RadialBar dataKey="value" />

                    </RadialBarChart>

                </ResponsiveContainer>
                <div className='absolute w-full h-full flex justify-center items-center top-0 font-semibold text-xl'>{oee.toFixed(2)}%</div>
            </div>
            <div className='h-12 flex justify-between items-center'>
                <div className='p-2'>
                    <div className='text-sm text-center'>Target</div>
                    <div className='text-xl font-semibold text-center'>85%</div>

                </div>
                <Separator orientation="vertical" />
                {/* Availability */}
                <Dialog >
                    <DialogTrigger >
                        <div className='text-[#ACCC58] hover:bg-muted p-2 rounded-sm transition-all'>
                            <div className='text-sm text-center '>Availability</div>
                            <div className='text-xl font-semibold text-center'>{availibility?.toFixed(2)}%</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[540px]">
                        <DialogHeader>
                            <DialogTitle>{asset}</DialogTitle>
                            <DialogDescription>
                                What affected Availability {getDescription(time)}
                            </DialogDescription>
                        </DialogHeader>
                        <MoreInfoAvailability asset={asset} time={time} />
                    </DialogContent>
                </Dialog>
                <Separator orientation="vertical" />
                {/* Performance */}
                <Dialog >
                    <DialogTrigger >
                        <div className='text-[#FBDA00] hover:bg-muted p-2 rounded-sm transition-all'>
                            <div className='text-sm text-center'>Performance</div>
                            <div className='text-xl font-semibold text-center'>{performance.toFixed(2)}%</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[540px]">
                        <DialogHeader>
                            <DialogTitle>{asset}</DialogTitle>
                            <DialogDescription>
                                What affected Performance {getDescription(time)}
                            </DialogDescription>
                        </DialogHeader>
                        <MoreInfoPerformance asset={asset} time={time} />
                    </DialogContent>
                </Dialog>
                <Separator orientation="vertical" />
                {/* Quality */}
                <Dialog >
                    <DialogTrigger >
                        <div className='text-[#E94B54] hover:bg-muted p-2 rounded-sm transition-all'>
                            <div className='text-sm text-center'>Quality</div>
                            <div className='text-xl font-bold text-center'>{quality.toFixed(2) * 100}%</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[540px]">
                        <DialogHeader>
                            <DialogTitle>{asset}</DialogTitle>
                            <DialogDescription>
                                What affected Quality {getDescription(time)}
                            </DialogDescription>
                        </DialogHeader>
                        <MoreInfoQuality asset={asset} time={time} />
                    </DialogContent>
                </Dialog>



            </div>
        </>
    );
}
