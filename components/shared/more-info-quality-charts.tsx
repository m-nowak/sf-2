import React from "react";
import { Separator } from "../ui/separator";

const MoreInfoQualityCharts = ({ data }: any) => {
  return (
    <div className="text-center mt-4 w-[80%] mx-auto ">
      {data[0] ? (
        <div>
          <div className="flex justify-between items-center mt-20">
            <div>Good</div>
            <Separator orientation="vertical" />
            <div className="text-5xl font-semibold">
              {data[0].Good_pieces.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}{" "}
              <span className="text-3xl">pcs</span>
            </div>
          </div>

          <div className="flex justify-between items-center mx-auto mt-20">
            <div>Bad</div>
            <Separator orientation="vertical" />
            <div className="text-5xl font-semibold text-red-600">
              {data[0].Scrap_pieces.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}{" "}
              <span className="text-3xl">pcs</span>
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

export default MoreInfoQualityCharts;
