import {pgTable, serial, varchar, text} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username").unique(),
	password: text("password"),
});