import database from "infra/database";

// Define a named export for the GET method
export async function GET() {
    const updatedAt = new Date().toISOString();

    const databaseVersionResult = await database.query({
        text: "SHOW server_version;",
    });
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query({
        text: "SHOW max_connections;",
    });
    const databaseMaxConnectionsValue =
        databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenedConnectionsResult = await database.query({
        text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
        values: [databaseName],
    });
    const databaseOpenedConnectionsValue =
        databaseOpenedConnectionsResult.rows[0].count;

    return new Response(
        JSON.stringify({
            updated_at: updatedAt,
            dependencies: {
                database: {
                    version: databaseVersionValue,
                    max_connections: parseInt(databaseMaxConnectionsValue),
                    opened_connections: databaseOpenedConnectionsValue,
                },
            },
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}
