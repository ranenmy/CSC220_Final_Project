const { spawnSync } = require("node:child_process");
const path = require("node:path");

const scripts = [
    "seed.js",
    "seedCourses.js",
    "seedOfferings.js",
    "seedRecords.js",
    "seedRegistrations.js"
];

for (const script of scripts) {
    console.log(`\nRunning ${script}...`);
    const result = spawnSync(process.execPath, [path.join(__dirname, script)], {
        cwd: path.join(__dirname, ".."),
        stdio: "inherit"
    });
    if (result.error || result.status !== 0) {
        console.error(`Stopped at ${script}. Fix the reported error, then run npm run seed again.`);
        process.exit(1);
    }
}

console.log("All seed scripts completed successfully.");
