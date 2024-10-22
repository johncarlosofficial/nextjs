import { Client } from "pg";

interface QueryObject {
    text: string;
    values?: any[];
}

async function query(queryObject: QueryObject) {
    let client;
    try {
        client = await getNewClient();
        const result = await client.query(queryObject);
        return result;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Failed to execute database query");
    } finally {
        if (client) {
            await client.end().catch((endError) => {
                console.error(
                    "Error closing the database connection:",
                    endError,
                );
            });
        }
    }
}

async function getNewClient() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT
            ? parseInt(process.env.POSTGRES_PORT)
            : undefined,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl: getSSLValues(),
    });

    await client.connect();
    return client;
}

export default {
    query,
    getNewClient,
};

function getSSLValues() {
    if (process.env.POSTGRES_CA) {
        return {
            ca: process.env.POSTGRES_CA,
        };
    }

    return process.env.NODE_ENV === "production" ? true : false;
}
