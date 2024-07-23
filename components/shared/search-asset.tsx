"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchAsset = ({ filterAsset, setFilterAsset }: any) => {
  const handleChange = (event: any) => {
    setFilterAsset(event.target.value);
  };

  return (
    <>
      <div className="relative ml-4 mr-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search asset..."
          className="w-full rounded-lg bg-background p-5 pl-8 md:w-[224px] mr-2 outline-none"
          onChange={handleChange}
          value={filterAsset}
        />
      </div>
    </>
  );
};

export default SearchAsset;
