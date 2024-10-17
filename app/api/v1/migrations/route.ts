import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

const runMigrations = async (dryRun: boolean) => {
    const url = process.env.DATABASE_URL;

    if (!url) {
        throw new Error("DATABASE_URL is not defined");
    }

    console.log(`Running migrations - Dry Run: ${dryRun}`);

    try {
        return await migrationRunner({
            databaseUrl: url,
            dryRun,
            dir: join("infra", "migrations"),
            direction: "up",
            migrationsTable: "pgmigrations",
        });
    } catch (error) {
        console.error("Migration error:", error);
        throw error; // Rethrow to propagate error to the caller
    }
};

export async function GET() {
    const migrations = await runMigrations(true);
    return new Response(JSON.stringify({ migrations }));
}
