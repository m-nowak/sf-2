import MachineList from '@/components/shared/machine-list';
import OeeFilter from '@/components/shared/oee-filter';
import { unstable_noStore as noStore } from 'next/cache';



const HomePage = () => {
  noStore();


  return (
    <>
      <OeeFilter />

      <div className="h-screen w-full mt-4">
        <MachineList />
      </div>
    </>
  );
};

export default HomePage;
