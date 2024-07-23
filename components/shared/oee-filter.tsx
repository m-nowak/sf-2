"use client";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";

const OeeFilter = ({ time, uap }: any) => {
  return (
    <>
      <Tabs defaultValue={time} className=" p-4 mr-4">
        <TabsList>
          {/* <Link href={`/${uap}/oee/2`}>
            <TabsTrigger value="2">24 h</TabsTrigger>
          </Link> */}
          <Link href={`/${uap}/oee/7`}>
            <TabsTrigger value="7">7 days</TabsTrigger>
          </Link>
          <Link href={`/${uap}/oee/30`}>
            <TabsTrigger value="30">30 days</TabsTrigger>
          </Link>
          <Link href={`/${uap}/oee/365`}>
            <TabsTrigger value="365">This year</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </>
  );
};

export default OeeFilter;
