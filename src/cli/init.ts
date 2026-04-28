/**
 * CLI: scaffold a new OpenCut video project from a template.
 *
 * Usage:
 *   npx ts-node src/cli/init.ts [project-name] [--template facecam|product|text-only]
 */

import fs from "fs";
import path from "path";
import readline from "readline";
import { VALID_TEMPLATES, type Template, generateProject, kebabToPascal } from "./init-core";

// ANSI colours
const G = "\x1b[32m";
const R = "\x1b[31m";
const Y = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function parseArgs() {
  const args = process.argv.slice(2);
  let projectName = args[0];
  const templateIdx = args.findIndex((a) => a === "--template");
  let templateArg: string | undefined = templateIdx >= 0 ? args[templateIdx + 1] : undefined;

  if (!projectName) {
    projectName = await prompt(`${Y}?${RESET} Project name: `);
    if (!projectName || !projectName.trim()) {
      console.error(`${R}Error: Project name is required.${RESET}`);
      process.exit(1);
    }
    projectName = projectName.trim();
  }

  if (!templateArg) {
    console.log(`\n${CYAN}Available templates:${RESET}`);
    VALID_TEMPLATES.forEach((t, i) => {
      const desc =
        t === "facecam"
          ? "Talking-head video with face bubble and keyword overlays"
          : t === "product"
            ? "Product demo with screenshots, app mockups and comparisons"
            : "Kinetic typography with generative backgrounds";
      console.log(`  ${G}${i + 1}${RESET}. ${BOLD}${t}${RESET} — ${desc}`);
    });
    const choice = await prompt(`${Y}?${RESET} Choose template (1-${VALID_TEMPLATES.length}): `);
    const idx = parseInt(choice.trim(), 10) - 1;
    templateArg = VALID_TEMPLATES[idx];
    if (!templateArg) {
      console.error(`${R}Error: Invalid template choice "${choice.trim()}".${RESET}`);
      process.exit(1);
    }
  }

  const template = templateArg as Template;

  if (!VALID_TEMPLATES.includes(template)) {
    console.error(`${R}Error: Invalid template "${template}". Valid: ${VALID_TEMPLATES.join(", ")}${RESET}`);
    process.exit(1);
  }

  return { projectName, template };
}

function writeFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ${G}created${RESET} ${filePath}`);
}

async function main() {
  const { projectName, template } = await parseArgs();
  const projectRoot = path.resolve(__dirname, "../..");
  const examplesDir = path.join(projectRoot, "src/examples");
  const projectDir = path.join(examplesDir, projectName);

  if (fs.existsSync(projectDir)) {
    console.error(`${R}❌ Directory already exists: ${projectDir}${RESET}`);
    process.exit(1);
  }

  const files = generateProject(projectName, template);

  // Summary
  console.log(`\n${BOLD}Summary:${RESET}`);
  console.log(`  Project:  ${CYAN}${projectName}${RESET}`);
  console.log(`  Template: ${CYAN}${template}${RESET}`);
  console.log(`  Path:     ${CYAN}src/examples/${projectName}/${RESET}`);
  console.log(`  Files:    ${CYAN}config.ts, timeline.ts, subtitles.ts, Root.tsx, index.ts, README.md${RESET}`);

  const confirm = await prompt(`\n${Y}?${RESET} Create project? (y/n) `);
  if (confirm.trim().toLowerCase() !== "y") {
    console.log(`${R}Aborted.${RESET}`);
    process.exit(0);
  }

  fs.mkdirSync(projectDir, { recursive: true });

  writeFile(path.join(projectDir, "config.ts"), files.config);
  writeFile(path.join(projectDir, "timeline.ts"), files.timeline);
  writeFile(path.join(projectDir, "subtitles.ts"), files.subtitles);
  writeFile(path.join(projectDir, "Root.tsx"), files.root);
  writeFile(path.join(projectDir, "index.ts"), files.index);
  writeFile(path.join(projectDir, "README.md"), files.readme);

  console.log(`\n${G}✅ Created "${projectName}" (${template} template) at src/examples/${projectName}/${RESET}`);
  console.log("\nNext steps:");
  console.log(`  1. Add assets to public/ (facecam video, music, screenshots, etc.)`);
  console.log(`  2. Customize timeline.ts and config.ts`);
  console.log(`  3. Run: ${CYAN}npx ts-node src/cli/validate.ts src/examples/${projectName}/timeline.ts${RESET}`);
  console.log(`  4. Preview: ${CYAN}npx remotion studio src/examples/${projectName}/index.ts${RESET}`);
  console.log(`  5. Render:  ${CYAN}npx remotion render src/examples/${projectName}/index.ts ${kebabToPascal(projectName)} out/${projectName}.mp4${RESET}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Unexpected error:", err);
    process.exit(1);
  });
}
