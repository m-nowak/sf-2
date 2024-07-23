import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT [AssetNumber] ,sum([TotalRunDuration]) as [TotalRunDuration] ,sum([TotalDurationInSec]) as [TotalDurationInSec] ,sum([TotalQtyDeclared]) as [TotalQtyDeclared] ,avg([AvgCycleTime]) as [AvgCycleTime] ,avg([Quality]) as [Quality] ,avg([Availibility]) as [Availibility] ,avg([Performance]) as [Performance] ,avg([oee]) as [oee] FROM [RUG_ShopFloor].[dbo].[OEE Smart Factory PerDay] WHERE TransactionDate >= DATEADD(DAY, -7, GETDATE()) AND TransactionDate < GETDATE() group by AssetNumber order by AssetNumber');
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}