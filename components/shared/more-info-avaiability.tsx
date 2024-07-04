"use client"
import React from 'react'
import useSWR from 'swr';
import { Skeleton } from '../ui/skeleton';
import MoreInfoAvailabilityCharts from './more-info-availability-charts';

const MoreInfoAvailability = ({ asset, time }: any) => {
    const fetcher = async (url: string): Promise<any> => {
        const res = await fetch(url);
        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            throw error;
        }
        return res.json();
    };

    const { data, error, isLoading } = useSWR(`/api/oee/more-info/availability/${asset}/${time}`, fetcher);

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>
        <Skeleton className='w-[480px] h-[400px] mx-auto' />
    </div>
    return (<>
        <div className='w-[480px] h-[400px] mx-auto'>

            <MoreInfoAvailabilityCharts data={data} />

        </div>
    </>

    )
}

export default MoreInfoAvailability