"use client"
import MachineCard from '@/components/shared/machine-card';
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton';



const MachineList = ({ time }: any) => {


    const fetcher = async (url: string): Promise<any> => {
        const res = await fetch(url);
        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            throw error;
        }
        return res.json();
    };

    const { data, error, isLoading } = useSWR(`/api/oee/${time}`, fetcher);

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>

        <Skeleton className='w-[420px] h-[400px] float-left ml-4 mt-4' />
        <Skeleton className='w-[420px] h-[400px] float-left ml-4 mt-4' />
        <Skeleton className='w-[420px] h-[400px] float-left ml-4 mt-4' />
        <Skeleton className='w-[420px] h-[400px] float-left ml-4 mt-4' />
    </div>

    return (
        <>

            {data?.map((asset: any) =>

                <MachineCard key={asset.AssetNumber} time={time} asset={asset.AssetNumber} quality={asset.Quality} availibility={asset.Availibility} performance={asset.Performance} oee={asset.oee} />
            )}

        </>
    );
};

export default MachineList;