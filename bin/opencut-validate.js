#!/usr/bin/env node
const { spawnSync } = require("child_process");
const path = require("path");
spawnSync(
  "node",
  ["--require", "ts-node/register", path.resolve(__dirname, "../src/cli/validate.ts"), ...process.argv.slice(2)],
  { stdio: "inherit" }
);
