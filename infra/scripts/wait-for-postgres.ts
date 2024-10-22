const { exec } = require("node:child_process");

function checkPostgres(retries = 50) {
    exec(
        "docker exec postgres-container pg_isready --host localhost",
        handleReturn,
    );

    function handleReturn(error: any, stdout: string) {
        if (error) {
            console.error("Error checking Postgres:", error);
            return;
        }

        if (stdout.search("accepting connections") === -1) {
            if (retries > 0) {
                process.stdout.write(".");
                checkPostgres(retries - 1);
            } else {
                console.error("\n🔴 Postgres did not start in time.\n");
                process.exit(1);
            }
            return;
        }

        console.log("\n🟢 Postgres is ready!\n");
    }
}

process.stdout.write("\n\n🔴 Waiting for Postgres");
checkPostgres();
