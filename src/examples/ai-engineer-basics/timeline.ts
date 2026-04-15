/**
 * AI Engineer Basics — visual-rich timeline.
 *
 * Every facecam-full segment is ≤18s raw. Real GitHub screenshots break
 * up long sections so there's a visual cut every 10-18 seconds.
 *
 * A/V SYNC: facecamStartSec of segment N = sum of durationSec of segments 0..N-1.
 * Total duration: 523.5s
 *
 * B-ROLL IMAGES (in public/ae-slides/broll/):
 *   github-repo.png, github-commits.png, github-branches.png,
 *   github-actions.png, github-issues.png
 */
import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  // ─── HOOK (0–7s) ────────────────────────────────────────────────────────
  {
    id: "s01-hook",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 7,
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
    callouts: [
      { text: "VibeCoder → AI Engineer", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [{ text: "VibeCoder", startSec: 2, endSec: 6 }],
  },

  // ─── THE PROBLEM (7–36s) ────────────────────────────────────────────────
  {
    id: "s02-problem-a",
    type: "facecam-full",
    facecamStartSec: 7,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    callouts: [
      { text: "The Problem", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [
      { text: "Chaos", startSec: 13, endSec: 17 },
      { text: "Nothing Works", startSec: 19, endSec: 23 },
    ],
  },
  {
    id: "s02-problem-b",
    type: "facecam-full",
    facecamStartSec: 25,
    durationSec: 11,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Can't Go Back", startSec: 25, endSec: 29 },
      { text: "Everything Breaks", startSec: 30, endSec: 34 },
    ],
  },

  // ─── GITHUB SLIDE (36–46s) ──────────────────────────────────────────────
  {
    id: "s03-github-slide",
    type: "screen-static",
    facecamStartSec: 36,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/github.png",
    callouts: [
      { text: "GitHub", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── GITHUB (46–105s) ───────────────────────────────────────────────────
  {
    id: "s03-github-a",
    type: "facecam-full",
    facecamStartSec: 46,
    durationSec: 15,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Version Control", startSec: 47, endSec: 51 },
      { text: "Every Change Saved", startSec: 53, endSec: 57 },
    ],
    inlinePanels: [
      {
        title: "Working with Git Branches",
        items: [
          "New features isolated from main code",
          "Bug fixes developed on separate tracks",
          "Prevents breaking the working application",
          "Merge only when feature is complete",
        ],
        itemStyle: "bullets",
        startSec: 53,
        endSec: 61,
      },
    ],
  },
  {
    id: "s03-broll-repo",
    type: "screen-static",
    facecamStartSec: 61,
    durationSec: 9,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-repo.png",
  },
  {
    id: "s03-github-b",
    type: "facecam-full",
    facecamStartSec: 70,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Branches", startSec: 71, endSec: 75 },
      { text: "Staging Preview", startSec: 73, endSec: 77 },
    ],
    inlinePanels: [
      {
        title: "The Staging Pipeline",
        items: [
          "Develop feature in isolated branch",
          "Push to Preview (production copy)",
          "Verify and test in live mode",
          "Merge to production once confirmed",
        ],
        itemStyle: "numbered",
        startSec: 80,
        endSec: 88,
        position: "bottom-right",
      },
    ],
  },
  {
    id: "s03-broll-commits",
    type: "screen-static",
    facecamStartSec: 88,
    durationSec: 9,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-commits.png",
  },
  {
    id: "s03-github-c",
    type: "facecam-full",
    facecamStartSec: 97,
    durationSec: 8,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [{ text: "Preview Mode", startSec: 97, endSec: 101 }],
  },

  // ─── BRANCHES SLIDE (105–115s) ──────────────────────────────────────────
  {
    id: "s04-branches-slide",
    type: "screen-static",
    facecamStartSec: 105,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/branches.png",
    callouts: [
      { text: "Branches & PRs", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── BRANCHES & PRs (115–164s) ──────────────────────────────────────────
  {
    id: "s04-branches-a",
    type: "facecam-full",
    facecamStartSec: 115,
    durationSec: 14,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Branches", startSec: 117, endSec: 121 },
      { text: "Merge Conflicts", startSec: 122, endSec: 126 },
    ],
  },
  {
    id: "s04-broll-branches",
    type: "screen-static",
    facecamStartSec: 129,
    durationSec: 9,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-branches.png",
  },
  {
    id: "s04-branches-b",
    type: "facecam-full",
    facecamStartSec: 138,
    durationSec: 15,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Pull Requests", startSec: 138, endSec: 142 },
      { text: "Feature Branch", startSec: 143, endSec: 147 },
    ],
    inlinePanels: [
      {
        title: "What is a Pull Request (PR)?",
        items: [
          "A request to merge code changes into main",
          "Enables review of specific edits before merge",
          "Shows a file-by-file comparison view",
          "Acts as a quality gate before production",
        ],
        itemStyle: "bullets",
        startSec: 139,
        endSec: 147,
      },
    ],
  },
  {
    id: "s04-broll-issues",
    type: "screen-static",
    facecamStartSec: 153,
    durationSec: 7,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-issues.png",
  },
  {
    id: "s04-branches-c",
    type: "facecam-full",
    facecamStartSec: 160,
    durationSec: 4,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Atomic Commits", startSec: 160, endSec: 164 },
    ],
    inlinePanels: [
      {
        title: "Why Use Atomic Commits?",
        items: [
          "One single logical change per commit",
          "Easier to pin down which commit broke things",
          "Simple to revert without losing unrelated work",
        ],
        itemStyle: "bullets",
        startSec: 160,
        endSec: 164,
        position: "bottom-right",
      },
    ],
  },

  // ─── CI/CD SLIDE (164–174s) ─────────────────────────────────────────────
  {
    id: "s05-cicd-slide",
    type: "screen-static",
    facecamStartSec: 164,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/cicd.png",
    callouts: [
      { text: "CI/CD Pipeline", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── CI/CD (174–220s) ───────────────────────────────────────────────────
  {
    id: "s05-cicd-a",
    type: "facecam-full",
    facecamStartSec: 174,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "CI/CD Pipeline", startSec: 176, endSec: 180 },
      { text: "Auto Checks", startSec: 185, endSec: 189 },
    ],
    inlinePanels: [
      {
        title: "What is CI/CD?",
        items: [
          "CI = Continuous Integration: auto-test every push",
          "CD = Continuous Deployment: auto-ship if tests pass",
          "Catches regressions before they reach users",
          "Builds a container image of your full app",
        ],
        itemStyle: "bullets",
        startSec: 177,
        endSec: 185,
      },
    ],
  },
  {
    id: "s05-broll-actions",
    type: "screen-static",
    facecamStartSec: 192,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-actions.png",
    callouts: [
      { text: "GitHub Actions", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },
  {
    id: "s05-cicd-b",
    type: "facecam-full",
    facecamStartSec: 202,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Builds Image", startSec: 202, endSec: 206 },
      { text: "Tests Run", startSec: 207, endSec: 211 },
      { text: "Tests Pass → Push", startSec: 211, endSec: 215 },
    ],
  },

  // ─── TESTING SLIDE (220–228s) ───────────────────────────────────────────
  {
    id: "s06-testing-slide",
    type: "screen-static",
    facecamStartSec: 220,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/testing.png",
    callouts: [
      { text: "Testing", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── TESTING (228–244s) ─────────────────────────────────────────────────
  {
    id: "s06-testing",
    type: "facecam-full",
    facecamStartSec: 228,
    durationSec: 16,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Unit Tests", startSec: 229, endSec: 233 },
      { text: "Integration", startSec: 234, endSec: 238 },
      { text: "End-to-End", startSec: 239, endSec: 243 },
    ],
    inlinePanels: [
      {
        title: "The Testing Taxonomy",
        items: [
          "Unit: test individual functions in isolation",
          "Integration: test how modules work together",
          "End-to-End: test full user flows in a browser",
        ],
        itemStyle: "numbered",
        startSec: 229,
        endSec: 237,
        position: "bottom-right",
      },
    ],
  },

  // ─── DEPLOYMENT SLIDE (244–254s) ────────────────────────────────────────
  {
    id: "s07-deploy-slide",
    type: "screen-static",
    facecamStartSec: 244,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/deployment.png",
    callouts: [
      { text: "Deployment", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── DEPLOYMENT (254–291s) ──────────────────────────────────────────────
  {
    id: "s07-deploy-a",
    type: "facecam-full",
    facecamStartSec: 254,
    durationSec: 15,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Vercel", startSec: 258, endSec: 262 },
      { text: "Render & Railway", startSec: 264, endSec: 268 },
    ],
    inlinePanels: [
      {
        title: "AI Engineer Cloud Stack",
        items: [
          "Frontend → Vercel (instant deploys, global CDN)",
          "Backend → Render or Railway (managed servers)",
          "Auto-scaling: spins up more capacity on demand",
          "No manual server setup or SSH required",
        ],
        itemStyle: "bullets",
        startSec: 258,
        endSec: 266,
        position: "bottom-right",
      },
    ],
  },
  {
    id: "s07-broll-repo",
    type: "screen-static",
    facecamStartSec: 269,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-repo.png",
  },
  {
    id: "s07-deploy-b",
    type: "facecam-full",
    facecamStartSec: 277,
    durationSec: 14,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Always Online", startSec: 277, endSec: 281 },
      { text: "Auto-Scaled", startSec: 281, endSec: 285 },
      { text: "Own Server", startSec: 285, endSec: 289 },
    ],
  },

  // ─── DEBUGGING SLIDE (291–301s) ─────────────────────────────────────────
  {
    id: "s08-debug-slide",
    type: "screen-static",
    facecamStartSec: 291,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/debugging.png",
    callouts: [
      { text: "Debugging Agents", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── DEBUGGING (301–353s) ───────────────────────────────────────────────
  {
    id: "s08-debug-a",
    type: "facecam-full",
    facecamStartSec: 301,
    durationSec: 17,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Debugging", startSec: 302, endSec: 306 },
      { text: "Automate Tests", startSec: 308, endSec: 312 },
    ],
  },
  {
    id: "s08-broll-actions",
    type: "screen-static",
    facecamStartSec: 318,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-actions.png",
  },
  {
    id: "s08-debug-b",
    type: "facecam-full",
    facecamStartSec: 326,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Happy Path", startSec: 326, endSec: 330 },
      { text: "Unhappy Path", startSec: 331, endSec: 335 },
    ],
  },
  {
    id: "s08-broll-commits",
    type: "screen-static",
    facecamStartSec: 344,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-commits.png",
  },
  {
    id: "s08-debug-c",
    type: "facecam-full",
    facecamStartSec: 352,
    durationSec: 1,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [],
  },

  // ─── DOCS SLIDE (353–361s) ──────────────────────────────────────────────
  {
    id: "s09-docs-slide",
    type: "screen-static",
    facecamStartSec: 353,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/docs.png",
    callouts: [
      { text: "Docs & Issues", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── DOCS (361–396s) ────────────────────────────────────────────────────
  {
    id: "s09-docs-a",
    type: "facecam-full",
    facecamStartSec: 361,
    durationSec: 16,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "README", startSec: 363, endSec: 367 },
      { text: "MD Files", startSec: 369, endSec: 373 },
    ],
  },
  {
    id: "s09-broll-issues",
    type: "screen-static",
    facecamStartSec: 377,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-issues.png",
    callouts: [
      { text: "GitHub Issues", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },
  {
    id: "s09-docs-b",
    type: "facecam-full",
    facecamStartSec: 385,
    durationSec: 11,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "GitHub Issues", startSec: 385, endSec: 389 },
      { text: "Tickets", startSec: 389, endSec: 393 },
    ],
    inlinePanels: [
      {
        title: "Documenting Your Project",
        items: [
          "README.md: project summary, setup steps, usage",
          "Architecture.md: system design decisions",
          "GitHub Issues: task tracking and bug reports",
          "CLAUDE.md: instructions for AI agents on the repo",
        ],
        itemStyle: "bullets",
        startSec: 386,
        endSec: 394,
      },
    ],
  },

  // ─── AI SUPERPOWER SLIDE (396–408s) ─────────────────────────────────────
  {
    id: "s10-ai-slide",
    type: "screen-static",
    facecamStartSec: 396,
    durationSec: 12,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/ai-superpower.png",
    callouts: [
      { text: "AI Superpower", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },

  // ─── AI SUPERPOWER (408–490s) ───────────────────────────────────────────
  {
    id: "s10-ai-a",
    type: "facecam-full",
    facecamStartSec: 408,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "AI Superpower", startSec: 410, endSec: 414 },
      { text: "Ask AI Anything", startSec: 416, endSec: 420 },
    ],
  },
  {
    id: "s10-broll-1",
    type: "screen-static",
    facecamStartSec: 426,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/broll/github-repo.png",
  },
  {
    id: "s10-ai-b",
    type: "facecam-full",
    facecamStartSec: 434,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Remove Yourself", startSec: 434, endSec: 438 },
      { text: "Quality Loops", startSec: 443, endSec: 447 },
    ],
  },
  {
    id: "s10-broll-2",
    type: "screen-static",
    facecamStartSec: 452,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/debugging.png",
  },
  {
    id: "s10-ai-c",
    type: "facecam-full",
    facecamStartSec: 460,
    durationSec: 18,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Autonomous Agents", startSec: 460, endSec: 464 },
      { text: "Coding + Review", startSec: 476, endSec: 480 },
    ],
  },
  {
    id: "s10-broll-3",
    type: "screen-static",
    facecamStartSec: 478,
    durationSec: 8,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "ae-slides/ai-superpower.png",
  },
  {
    id: "s10-ai-d",
    type: "facecam-full",
    facecamStartSec: 486,
    durationSec: 4,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "10/10 Happy", startSec: 486, endSec: 490 },
    ],
  },

  // ─── OUTRO (490–523.5s) ─────────────────────────────────────────────────
  {
    id: "s11-outro",
    type: "facecam-full",
    facecamStartSec: 490,
    durationSec: 33.5,
    faceBubble: "hidden",
    showSubtitles: true,
    showEndCard: true,
    callouts: [
      { text: "Wrap Up", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
  },
];
