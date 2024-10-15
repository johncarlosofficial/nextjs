import fetch from "node-fetch";

interface ApiStatusResponse {
    updated_at: string;
    dependencies: {
        database: {
            version: string;
            max_connections: number;
            opened_connections: number;
        };
    };
}

test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = (await response.json()) as ApiStatusResponse;

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

    expect(responseBody.dependencies.database.version).toEqual("17.0");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
