import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import pg from 'pg';
import * as process from "process";
const { Client } = pg;

import dotenv from 'dotenv';
dotenv.config();

export const connection = new Client({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT ?? '5432'),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

export const db = drizzle(connection, {schema});
