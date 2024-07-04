import { NextResponse } from 'next/server';
import { getConnection } from '../../../../../../../lib/db';

export async function GET(request: any, { params }: any) {

    const { asset } = params || "R1790";
    const { time } = params || 7;
    try {
      const pool = await getConnection();

      if(time === "365") {
        const result = await pool.request().query(`SELECT TOP (5)
                                                  (sum([Duration [Min]]])/60)as duration
                                                  ,[DownTimeL3]
                                                  FROM [RUG_ShopFloor].[dbo].[Rug_MMS_Data]
                                                  WHERE year(date)=year(getdate()) and AssetNumber='${asset}' and DownTimeL3<>'' and TransactionID<>'run'
                                                  group by DownTimeL3
                                                  order by duration desc`);
        return NextResponse.json(result.recordset, { status: 200 });
      } else {
      const result = await pool.request().query(`SELECT TOP (5)
                                                (sum([Duration [Min]]])/60)as duration
                                                ,[DownTimeL3]
                                                FROM [RUG_ShopFloor].[dbo].[Rug_MMS_Data]
                                                WHERE date >= DATEADD(DAY, -${time}, GETDATE()) AND date < GETDATE() and AssetNumber='${asset}' and DownTimeL3<>'' and transactionid !='run'
                                                group by DownTimeL3
                                                order by duration desc`);
      return NextResponse.json(result.recordset, { status: 200 });
      }
    } catch (error: any) {
      return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
    }
  }
  