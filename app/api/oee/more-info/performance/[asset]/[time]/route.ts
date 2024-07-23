import { NextResponse } from "next/server";
import { getConnection } from "../../../../../../../lib/db";

export async function GET(request: any, { params }: any) {
  const { asset } = params || "R1790";
  const { time } = params || 7;
  try {
    const pool = await getConnection();

    if (time === "365") {
      const result = await pool.request().query(`SELECT DISTINCT TOP (5)
                                                        AssetNumber,
                                                        (SUM([Duration [Min]]]) / 60) AS duration,
                                                        ((sum([QtyDeclared]))/ SUM([Duration [Min]]])) AS ppm,
                                                        CAST(AVG([target ppm]) AS INT) AS targetppm
                                                    FROM [RUG_ShopFloor].[dbo].[Rug_MMS_Data]
                                                    WHERE 
                                                        year(date)=year(getdate())
                                                        AND AssetNumber = '${asset}'
                                                        AND DownTimeL3 <> '' 
                                                        AND OperationStatus != 'p'
                                                      and TransactionID='run'
                                                    GROUP BY 
                                                        AssetNumber`);
      return NextResponse.json(result.recordset, { status: 200 });
    } else {
      const result = await pool.request().query(`SELECT DISTINCT TOP (5)
                                                      AssetNumber,
                                                      (SUM([Duration [Min]]]) / 60) AS duration,
                                                      ((sum([QtyDeclared]))/ SUM([Duration [Min]]])) AS ppm,
                                                      CAST(AVG([target ppm]) AS INT) AS targetppm
                                                  FROM [RUG_ShopFloor].[dbo].[Rug_MMS_Data]
                                                  WHERE 
                                                      date >= DATEADD(DAY, -${time}, GETDATE()) 
                                                      AND date < GETDATE() 
                                                      AND AssetNumber = '${asset}'
                                                      AND DownTimeL3 <> '' 
                                                      AND OperationStatus != 'p'
                                                      AND TransactionID='run'
                                                  GROUP BY 
                                                      AssetNumber`);
      return NextResponse.json(result.recordset, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}
