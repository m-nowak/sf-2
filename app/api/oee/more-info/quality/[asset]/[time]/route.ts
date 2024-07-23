import { NextResponse } from 'next/server';
import { getConnection } from '../../../../../../../lib/db';

export async function GET(request: any, { params }: any) {

    const { asset } = params || "R1790";
    const { time } = params || 7;
    try {
      const pool = await getConnection();

      if(time === "365") {
        const result = await pool.request().query(`SELECT 
                                                        AssetNumber,
                                                        SUM(CASE WHEN TransactionID LIKE 'sc%' THEN QtyDeclared ELSE 0 END) AS Scrap_pieces,
                                                        SUM(CASE WHEN TransactionID LIKE 'run' THEN QtyDeclared ELSE 0 END) AS Good_pieces
                                                    FROM 
                                                        [RUG_ShopFloor].[dbo].[TransactionRecords]
                                                    WHERE 
                                                        YEAR(endtime) = YEAR(GETDATE()) AND AssetNumber='${asset}'
                                                    GROUP BY 
                                                        AssetNumber;`);
        return NextResponse.json(result.recordset, { status: 200 });
      } else {
      const result = await pool.request().query(` SELECT 
                                                      AssetNumber,
                                                      SUM(CASE WHEN TransactionID LIKE 'sc%' THEN QtyDeclared ELSE 0 END) AS Scrap_pieces,
                                                      SUM(CASE WHEN TransactionID LIKE 'run' THEN QtyDeclared ELSE 0 END) AS Good_pieces
                                                  FROM 
                                                      [RUG_ShopFloor].[dbo].[TransactionRecords]
                                                  WHERE 
                                                      CONVERT(date, endtime) >= DATEADD(DAY, -${time}, GETDATE()) 
                                                      AND CONVERT(date, endtime) < GETDATE()
                                                      AND AssetNumber='${asset}'
                                                  GROUP BY 
                                                      AssetNumber
                                                  order by AssetNumber desc`);
      return NextResponse.json(result.recordset, { status: 200 });
      }
    } catch (error: any) {
      return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
    }
  }
  