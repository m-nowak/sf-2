import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Oee from "./oee";

import { unstable_noStore as noStore } from "next/cache";
import { separateCamelCase } from "@/lib/utils";

const MachineCard = ({
  asset,
  gap,
  bottleNeck,
  process,
  time,
  quality,
  performance,
  availibility,
  oee,
}: any) => {
  noStore();

  return (
    <div className="w-[380px] h-[360px] float-left ml-4 mt-4 ">
      <Card className="w-[380px] h-[360px]">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center ">
              <span className={`${bottleNeck ? "text-red-600" : ""}`}>
                {asset}{" "}
                <span className="text-muted-foreground text-lg">{gap}</span>
              </span>
              <span className="text-lg capitalize">
                {separateCamelCase(process)}{" "}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Oee
            asset={asset}
            time={time}
            quality={quality}
            performance={performance}
            availibility={availibility}
            oee={oee}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineCard;
