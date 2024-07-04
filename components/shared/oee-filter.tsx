'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Link from 'next/link'

const OeeFilter = ({ time }: any) => {

    return (
        <>
            <Tabs defaultValue={time} className="w-[400px] p-4">
                <TabsList>
                    <TabsTrigger value="7"><Link href="/oee/7">7 days</Link></TabsTrigger>
                    <TabsTrigger value="30"><Link href="/oee/30">30 days</Link></TabsTrigger>
                    <TabsTrigger value="365"><Link href="/oee/365">This year</Link></TabsTrigger>
                </TabsList>
                <div className='pl-2 pt-8'>
                    <TabsContent value="7">OEE for last 7 days.</TabsContent>
                    <TabsContent value="30">OEE for last 30 days.</TabsContent>
                    <TabsContent value="365">OEE for this year.</TabsContent>
                </div>
            </Tabs>
        </>
    )
}

export default OeeFilter