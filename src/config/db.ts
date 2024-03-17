import mysql from "mysql";
import dotenv from "dotenv";

//DOTENV
dotenv.config({ path: ".env" });
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const pool = mysql.createPool(config);

export { config, pool };
