import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db';

export async function GET(request: any, { params }: any) {

    const { time } = params || 7;
    try {
      const pool = await getConnection();
      if(time === "365") {
        const result = await pool.request().query(`SELECT [AssetNumber]
                                                        ,sum([TotalRunDuration]) as [TotalRunDuration]
                                                        ,sum([TotalDurationInSec]) as [TotalDurationInSec]
                                                        ,sum([TotalQtyDeclared]) as [TotalQtyDeclared]
                                                        ,avg([AvgCycleTime]) as [AvgCycleTime]
                                                        ,avg([Quality]) as [Quality]
                                                        ,avg([Availibility]) as [Availibility]
                                                        ,avg([Performance]) as [Performance]
                                                        ,avg([oee]) as [oee]
                                                    FROM [RUG_ShopFloor].[dbo].[OEE Smart Factory PerDay]
                                                    WHERE year(TransactionDate) =YEAR(GETDATE())
                                                    group by AssetNumber
                                                    order by AssetNumber`);
        return NextResponse.json(result.recordset, { status: 200 });
      } else {
      const result = await pool.request().query(`SELECT [AssetNumber] ,sum([TotalRunDuration]) as [TotalRunDuration] ,sum([TotalDurationInSec]) as [TotalDurationInSec] ,sum([TotalQtyDeclared]) as [TotalQtyDeclared] ,avg([AvgCycleTime]) as [AvgCycleTime] ,avg([Quality]) as [Quality] ,avg([Availibility]) as [Availibility] ,avg([Performance]) as [Performance] ,avg([oee]) as [oee] FROM [RUG_ShopFloor].[dbo].[OEE Smart Factory PerDay] WHERE TransactionDate >= DATEADD(DAY, -${time}, GETDATE()) AND TransactionDate < GETDATE() group by AssetNumber order by AssetNumber`);
      return NextResponse.json(result.recordset, { status: 200 });
    }
      
    } catch (error: any) {
      return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
    }
  }