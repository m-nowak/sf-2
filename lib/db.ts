import sql, { ConnectionPool, config as IConfig } from 'mssql';



const config: IConfig = {
  
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
 

  
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true,// Change to true for local dev / self-signed certs
    enableArithAbort: true
  }
};

let pool: ConnectionPool | null = null;

export const getConnection = async (): Promise<ConnectionPool> => {
  if (pool) {
    return pool;
  }
  try {
    pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
};