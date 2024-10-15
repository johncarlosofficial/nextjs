import { Client } from "pg";

interface QueryObject {
    text: string;
    values?: any[];
}

async function query(queryObject: QueryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT
            ? parseInt(process.env.POSTGRES_PORT)
            : undefined,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    });

    try {
        await client.connect();
        const result = await client.query(queryObject);
        return result; // Return result if successful
    } catch (error) {
        // Log the error or handle it as needed
        console.error("Database query error:", error);
        throw new Error("Failed to execute database query"); // Throw a new error for higher-level handling
    } finally {
        // Ensure the client is closed even if there's an error
        await client.end().catch((endError) => {
            console.error("Error closing the database connection:", endError);
        });
    }
}

export default {
    query,
};
