import { Separator } from "@radix-ui/react-separator";
import React from "react";

const MoreInfoPerformanceCharts = ({ data }: any) => {
  return (
    <div className="text-center mt-4 w-[60%] mx-auto ">
      {data[0] ? (
        <div>
          <div className="flex justify-between items-center mt-14">
            <div>Target</div>
            <Separator orientation="vertical" />
            <div className="text-7xl font-semibold">
              {data[0]?.targetppm} <span className="text-3xl">ppm</span>
            </div>
          </div>

          <div className="flex justify-between items-center mx-auto mt-20">
            <div>Actual</div>
            <Separator orientation="vertical" />
            <div
              className={`${
                data[0]?.targetppm > data[0]?.ppm
                  ? "text-red-600"
                  : "text-green-700"
              } text-7xl font-semibold`}
            >
              {data[0]?.ppm} <span className="text-3xl">ppm</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14">
          No data for this assset.
          <br />( It can be new machine)
        </div>
      )}
    </div>
  );
};

export default MoreInfoPerformanceCharts;
