import MachineList from "@/components/shared/machine-list";
import OeeFilter from "@/components/shared/oee-filter";
import ScrollToTop from "@/components/shared/scroll-top";
import { getDescription } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

const OeePage = ({ params }: { params: { time: number } }) => {
  noStore();

  return (
    <>
      <div className="flex mt-4 justify-between items-center ">
        <div className=" p-6 font-lg ">OEE {getDescription(params.time)}</div>
        <OeeFilter time={params.time} uap="high-volume-1" />
      </div>
      <div className="h-screen w-full">
        <MachineList time={params.time} uap="high-volume-1" shortUap="HV1" />
      </div>
      <ScrollToTop />
    </>
  );
};

export default OeePage;
