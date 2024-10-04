import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageProvider: "v8",

    // Switch testEnvironment to node for server-side code
    testEnvironment: "node",

    // Allow Jest to work with ES modules, including node-fetch
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.mjs$": "babel-jest", // Transform .mjs (module) files
    },
    transformIgnorePatterns: [
        "/node_modules/(?!node-fetch)", // Ensure node-fetch is transformed
    ],
};

export default createJestConfig(config);
