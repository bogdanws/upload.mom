import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connection } from './db';

console.log('Running migrations...');
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle'});
console.log('Migrations complete!');

// Remember to close the connection, otherwise the script will freeze
await connection.end();