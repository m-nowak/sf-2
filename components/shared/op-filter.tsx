"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { allOps } from "@/constants";

const OpFilter = ({ filterOp, setFilterOp, uap }: any) => {
  const ops = allOps.filter((op: any) => op.uap === uap);

  const handleClick = (lable: string) => {
    setFilterOp(lable);
  };

  return (
    <>
      <Tabs defaultValue={filterOp} className=" p-2">
        <TabsList>
          {ops.map((op: any) => (
            <TabsTrigger
              key={op.label}
              value={op.process}
              onClick={() => handleClick(op.process)}
            >
              {op.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};

export default OpFilter;
