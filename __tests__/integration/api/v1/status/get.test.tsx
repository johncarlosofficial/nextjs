import fetch from "node-fetch";

interface Dependencies {
    database: {
        version: string;
        max_connections: number;
        opened_connections: number;
    };
}

interface ApiResponse {
    updated_at: string;
    dependencies: Dependencies;
}

test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    // Type assertion to ensure responseBody conforms to ApiResponse
    const apiResponse = responseBody as ApiResponse; // Assert the type here

    // Check that updated_at is in the expected format
    const parsedUpdatedAt = new Date(apiResponse.updated_at).toISOString();
    expect(apiResponse.updated_at).toEqual(parsedUpdatedAt);

    expect(apiResponse.dependencies.database.version).toEqual("17.0");
    expect(apiResponse.dependencies.database.max_connections).toEqual(100);
    expect(apiResponse.dependencies.database.opened_connections).toEqual(1);
});
