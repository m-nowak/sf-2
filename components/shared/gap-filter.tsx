"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allGaps } from "@/constants";

interface GapFilterProps {
  filterGap: string;
  setFilterGap: (value: string) => void;
  uap: string;
}

const GapFilter = ({ filterGap, setFilterGap, uap }: GapFilterProps) => {
  const gaps = allGaps.filter((gap: any) => gap.uap === uap);
  const handleClick = (lable: string) => {
    setFilterGap(lable);
  };

  return (
    <>
      <Tabs defaultValue={filterGap} className="ml-2 p-4">
        <TabsList>
          {gaps.map((gap: any) => (
            <TabsTrigger
              key={gap.label}
              value={gap.gap}
              onClick={() => handleClick(gap.gap)}
            >
              {gap.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};

export default GapFilter;
