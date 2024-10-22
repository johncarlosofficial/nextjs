import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

const runMigrations = async (dryRun: boolean) => {
    const dbClient = await database.getNewClient();

    try {
        console.log(`Running migrations - Dry Run: ${dryRun}`);

        return await migrationRunner({
            dbClient,
            dryRun,
            dir: join("infra", "migrations"),
            direction: "up",
            migrationsTable: "pgmigrations",
        });
    } catch (error) {
        console.error("Migration error:", error);
        throw error;
    } finally {
        await dbClient.end();
    }
};

export async function GET() {
    const migrations = await runMigrations(true);
    return new Response(JSON.stringify({ migrations }));
}

export async function POST() {
    const migrations = await runMigrations(false);
    return new Response(JSON.stringify({ migrations }));
}
