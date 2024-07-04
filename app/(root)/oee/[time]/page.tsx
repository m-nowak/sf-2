import MachineList from '@/components/shared/machine-list';
import OeeFilter from '@/components/shared/oee-filter';
import { unstable_noStore as noStore } from 'next/cache';



const OeePage = ({ params }: { params: { time: number } }) => {
    noStore();


    return (
        <>
            <OeeFilter time={params.time} />

            <div className="h-screen w-full mt-4">
                <MachineList time={params.time} />
            </div>
        </>
    );
};

export default OeePage;
