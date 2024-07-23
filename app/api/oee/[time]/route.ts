import { NextResponse } from "next/server";
import { getConnection } from "../../../../lib/db";

export async function GET(request: any, { params }: any) {
  const { time } = params || 7;
  try {
    const pool = await getConnection();
    if (time === "365") {
      const result = await pool.request().query(`SELECT [AssetNumber]
                                                      ,[UAP]
                                                      ,[GAP]
                                                      ,[ProcessDescription]
                                                        ,sum([TotalRunDuration]) as [TotalRunDuration]
                                                        ,sum([TotalDurationInMin]) as [TotalDurationInMin]
                                                        ,sum([TotalQtyDeclared]) as [TotalQtyDeclared]
                                                        ,avg([AvgCycleTime]) as [AvgCycleTime]
                                                        ,avg([Quality]) as [Quality]
                                                        ,avg([Availability]) as [Availibility]
                                                        ,avg([Performance]) as [Performance]
                                                        ,avg([oee]) as [oee]
                                                    FROM [Data_Analysis].[dbo].[MMS_OEE]
                                                    WHERE year(TransactionDate) =YEAR(GETDATE())
                                                    group by AssetNumber,[UAP]
                                                    ,[GAP]
                                                    ,[ProcessDescription]
                                                    order by AssetNumber`);
      return NextResponse.json(result.recordset, { status: 200 });
    } else {
      const result = await pool.request().query(`SELECT [AssetNumber]
                                                    ,[UAP]
                                                    ,[ProcessDescription]
                                                    ,[GAP] 
                                                    ,sum([TotalRunDuration]) as [TotalRunDuration] 
                                                    ,sum([TotalDurationInMin]) as [TotalDurationInMin] 
                                                    ,sum([TotalQtyDeclared]) as [TotalQtyDeclared] 
                                                    ,avg([AvgCycleTime]) as [AvgCycleTime] 
                                                    ,avg([Quality]) as [Quality] 
                                                    ,avg([Availability]) as [Availibility] 
                                                    ,avg([Performance]) as [Performance] 
                                                    ,avg([oee]) as [oee]
                                                    FROM [Data_Analysis].[dbo].[MMS_OEE] 
                                                    WHERE TransactionDate >= DATEADD(DAY, -${time}, GETDATE()) AND TransactionDate < GETDATE() 
                                                    group by AssetNumber,[UAP],[ProcessDescription],[GAP] 
                                                    order by AssetNumber`);
      return NextResponse.json(result.recordset, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}
