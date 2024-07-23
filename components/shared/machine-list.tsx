"use client";
import MachineCard from "@/components/shared/machine-card";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { useMemo, useState } from "react";
import GapFilter from "./gap-filter";
import SearchAsset from "./search-asset";
import OpFilter from "./op-filter";
import { separateCamelCase } from "@/lib/utils";
import { allBottleNecks } from "@/constants";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MachineListProps {
  time: number;
  uap: string;
  shortUap: string;
}

interface Asset {
  AssetNumber: string;
  GAP: string;
  ProcessDescription: string;
  Quality: number;
  Availibility: number;
  Performance: number;
  oee: number;
  bottleNeck: string;
}

const MachineList = ({ time, uap, shortUap }: MachineListProps) => {
  const [filterAsset, setFilterAsset] = useState("");
  const [filterGap, setFilterGap] = useState("");
  const [filterOp, setFilterOp] = useState("");
  const [filterBottleNeck, setFilterBottleNeck] = useState("");

  const fetcher = async (url: string): Promise<any> => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      throw error;
    }
    return res.json();
  };

  const { data, error, isLoading } = useSWR(`/api/oee/${time}`, fetcher, {
    dedupingInterval: 20000,
  });

  const assets = useMemo(() => {
    if (!data) return [];
    return data.map((asset: any) => ({
      ...asset,
      bottleNeck: allBottleNecks.some((bn) => bn.asset === asset.AssetNumber)
        ? "true"
        : "",
    }));
  }, [data]);

  const filteredAssets = useMemo(() => {
    return assets.filter(
      (asset: any) =>
        asset.AssetNumber.includes(filterAsset) &&
        asset.GAP.includes(filterGap) &&
        asset.ProcessDescription.toLowerCase().includes(
          filterOp.toLowerCase()
        ) &&
        asset.bottleNeck.includes(filterBottleNeck)
    );
  }, [assets, filterAsset, filterGap, filterOp, filterBottleNeck]);

  if (error)
    return <div className="w-full h-72 flex-center">Failed to load data.</div>;
  if (isLoading)
    return (
      <div>
        <div className="py-4 pl-4 pr-7">
          <Skeleton className="w-[100%] h-[40px]" />
        </div>
        {[...Array(4)].map((_, idx) => (
          <Skeleton
            key={idx}
            className="w-[380px] h-[360px] float-left ml-4 mt-4"
          />
        ))}
      </div>
    );

  return (
    <>
      <div className="flex items-center pr-6">
        <GapFilter
          filterGap={filterGap}
          setFilterGap={setFilterGap}
          uap={uap}
        />
        <OpFilter filterOp={filterOp} setFilterOp={setFilterOp} uap={uap} />
        <SearchAsset
          filterAsset={filterAsset}
          setFilterAsset={setFilterAsset}
        />
        {filterBottleNeck ? (
          <Button onClick={() => setFilterBottleNeck("")}>
            Bottlenecks <X className="h-5 w-5 ml-4" />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setFilterBottleNeck("true")}>
            Bottlenecks
          </Button>
        )}
      </div>

      {filteredAssets.length > 0 ? (
        filteredAssets?.map((asset: any) => (
          <MachineCard
            key={asset.AssetNumber}
            time={time}
            asset={asset.AssetNumber}
            gap={asset.GAP}
            bottleNeck={asset.bottleNeck}
            process={asset.ProcessDescription}
            quality={asset.Quality}
            availibility={asset.Availibility}
            performance={asset.Performance}
            oee={asset.oee}
          />
        ))
      ) : (
        <div className="w-full h-72 flex-center">
          No results for{filterGap !== "" ? " - GAP: " + filterGap : ""}{" "}
          {filterOp !== ""
            ? " - Operation: " + separateCamelCase(filterOp)
            : ""}{" "}
          {filterAsset !== "" ? " - Asset: " + filterAsset : ""}{" "}
          {filterBottleNeck !== "" ? " - Bottlenecks" : ""}
        </div>
      )}
    </>
  );
};

export default MachineList;
