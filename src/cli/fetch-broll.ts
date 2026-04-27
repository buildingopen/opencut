/**
 * CLI: fetch stock B-roll video clips from Pexels.
 *
 * Usage:
 *   PEXELS_API_KEY=xxx npx ts-node src/cli/fetch-broll.ts "aerial city" 3
 *
 * Outputs:
 *   - Downloads clips to public/broll/
 *   - Prints a JSON snippet ready to paste into a timeline
 */
import path from "path";
import { fetchBrollBatch, buildBrollTimelineSnippet } from "../tools/pexels";

const query = process.argv[2];
const countArg = process.argv[3];

if (!query) {
  console.error("Usage: PEXELS_API_KEY=xxx npx ts-node src/cli/fetch-broll.ts <query> [count]");
  process.exit(1);
}

const count = Math.min(10, Math.max(1, parseInt(countArg || "1", 10)));
const projectRoot = path.resolve(__dirname, "../..");
const targetDurationSec = 5; // default segment length; clips may be longer

(async () => {
  try {
    console.error(`Fetching ${count} clip(s) for: "${query}"…`);
    const results = await fetchBrollBatch(
      query,
      count,
      targetDurationSec,
      projectRoot,
    );

    console.error("\nDownloaded:");
    for (const r of results) {
      console.error(`  → ${r.publicPath} (${r.video.width}x${r.video.height}, ${r.video.duration}s)`);
    }

    const snippet = buildBrollTimelineSnippet(results, targetDurationSec);

    console.error("\n--- Timeline snippet ---");
    console.log(JSON.stringify(snippet, null, 2));
    console.error("------------------------\n");

    console.error(
      `To use in a segment, add a videoBackground field (parent agent will wire it into Segment.tsx).`,
    );
  } catch (err) {
    console.error("Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
})();
