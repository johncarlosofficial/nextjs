import fetch from "node-fetch";
import database from "infra/database";

test("GET to /api/v1/migrations should return 200", async () => {
    const result = await database.query({ text: "SELECT 1 + 1;" });
    console.log(result);

    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody.migrations)).toBe(true);
});
