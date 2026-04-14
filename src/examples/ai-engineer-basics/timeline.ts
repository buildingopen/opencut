/**
 * AI Engineer Basics video timeline.
 *
 * Refined from Whisper transcript (176 segments, 523.5s, 1348 words).
 * Topics identified from actual transcript content.
 *
 * ASSET MANIFEST (required in public/):
 *   ai-engineer-basics.mov  - Federico talking (primary footage)
 *
 * Source video: facecam, raw duration ~523.5s at 1x speed.
 * At playbackRate 1.2, rendered duration ≈ 436s (~7.3min).
 */
import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  // 0-7s: Hook — "What do you need to go from VibeCoder to AI engineer?"
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
    keywords: [
      { text: "VibeCoder", startSec: 1, endSec: 5 },
    ],
  },

  // 7-36s: The Problem — chaos when things break, no visibility
  {
    id: "s02-the-problem",
    type: "facecam-full",
    facecamStartSec: 7,
    durationSec: 29,
    faceBubble: "hidden",
    showSubtitles: true,
    callouts: [
      { text: "The Problem", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [
      { text: "Chaos", startSec: 13, endSec: 17 },
      { text: "Nothing Works", startSec: 19, endSec: 23 },
      { text: "Can't Go Back", startSec: 25, endSec: 29 },
      { text: "Everything Breaks", startSec: 30, endSec: 34 },
    ],
  },

  // 36-46s: GitHub slide (screen-static with facecam PiP)
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

  // 46-105s: GitHub — version control, fix the chaos
  {
    id: "s03-github",
    type: "facecam-full",
    facecamStartSec: 46,
    durationSec: 59,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "GitHub", startSec: 40, endSec: 44 },
      { text: "Version Control", startSec: 47, endSec: 51 },
      { text: "Every Change Saved", startSec: 53, endSec: 57 },
      { text: "Branches", startSec: 63, endSec: 67 },
      { text: "Staging Preview", startSec: 73, endSec: 77 },
      { text: "Preview Mode", startSec: 92, endSec: 96 },
    ],
  },

  // 105-165s: Branches & PRs — stop breaking working code
  {
    id: "s04-branches-prs",
    type: "facecam-full",
    facecamStartSec: 105,
    durationSec: 60,
    faceBubble: "hidden",
    showSubtitles: true,
    callouts: [
      { text: "Branches & PRs", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [
      { text: "Branches", startSec: 107, endSec: 111 },
      { text: "Merge Conflicts", startSec: 109, endSec: 113 },
      { text: "Pull Requests", startSec: 124, endSec: 128 },
      { text: "Feature Branch", startSec: 130, endSec: 134 },
      { text: "Atomic Commits", startSec: 148, endSec: 152 },
      { text: "Rollback", startSec: 157, endSec: 161 },
    ],
  },

  // 164-174s: CI/CD slide (screen-static with facecam PiP)
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

  // 174-220s: CI/CD Pipelines — prevent regressions
  {
    id: "s05-cicd",
    type: "facecam-full",
    facecamStartSec: 174,
    durationSec: 47,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "CI/CD Pipeline", startSec: 176, endSec: 180 },
      { text: "Auto Checks", startSec: 185, endSec: 189 },
      { text: "Builds Image", startSec: 202, endSec: 206 },
      { text: "Tests Run", startSec: 207, endSec: 211 },
      { text: "Tests Pass → Push", startSec: 211, endSec: 215 },
    ],
  },

  // 220-228s: Testing slide (screen-static with facecam PiP)
  {
    id: "s06-testing-types-slide",
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

  // 228-244s: Testing Types — unit, integration, end-to-end
  {
    id: "s06-testing-types",
    type: "facecam-full",
    facecamStartSec: 228,
    durationSec: 17,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Unit Tests", startSec: 222, endSec: 226 },
      { text: "Integration", startSec: 225, endSec: 229 },
      { text: "End-to-End", startSec: 228, endSec: 232 },
      { text: "Automated", startSec: 231, endSec: 235 },
    ],
  },

  // 244-254s: Deployment slide (screen-static with facecam PiP)
  {
    id: "s07-deployment-slide",
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

  // 254-291s: Deployment — Vercel, Render, Railway
  {
    id: "s07-deployment",
    type: "facecam-full",
    facecamStartSec: 254,
    durationSec: 37,
    faceBubble: "hidden",
    showSubtitles: true,
    keywords: [
      { text: "Vercel", startSec: 258, endSec: 262 },
      { text: "Render & Railway", startSec: 264, endSec: 268 },
      { text: "Always Online", startSec: 273, endSec: 277 },
      { text: "Auto-Scaled", startSec: 275, endSec: 279 },
      { text: "Own Server", startSec: 285, endSec: 289 },
    ],
  },

  // 291-353s: Debugging & Testing Agents
  {
    id: "s08-debugging-agents",
    type: "facecam-full",
    facecamStartSec: 291,
    durationSec: 62,
    faceBubble: "hidden",
    showSubtitles: true,
    callouts: [
      { text: "Debugging Agents", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [
      { text: "Debugging", startSec: 294, endSec: 298 },
      { text: "Automate Tests", startSec: 305, endSec: 309 },
      { text: "Happy Path", startSec: 318, endSec: 322 },
      { text: "Unhappy Path", startSec: 324, endSec: 328 },
      { text: "Browser Access", startSec: 334, endSec: 338 },
      { text: "Full User Power", startSec: 342, endSec: 346 },
    ],
  },

  // 353-402s: Docs & GitHub Issues — README, MD files, issue tracking
  {
    id: "s09-docs-issues",
    type: "facecam-full",
    facecamStartSec: 353,
    durationSec: 44,
    faceBubble: "hidden",
    showSubtitles: true,
    callouts: [
      { text: "Docs & Issues", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [
      { text: "README", startSec: 358, endSec: 362 },
      { text: "MD Files", startSec: 362, endSec: 366 },
      { text: "Markdown", startSec: 364, endSec: 368 },
      { text: "GitHub Issues", startSec: 383, endSec: 387 },
      { text: "Tickets", startSec: 387, endSec: 391 },
    ],
  },

  // 396-490s: AI Superpower — agents, quality loops, autonomous review
  {
    id: "s10-ai-superpower",
    type: "facecam-full",
    facecamStartSec: 396,
    durationSec: 95,
    faceBubble: "bottom-left",
    showSubtitles: true,
    callouts: [
      { text: "AI Superpower", position: "center", delaySec: 0, durationSec: 1.5 },
    ],
    keywords: [
      { text: "AI Superpower", startSec: 396, endSec: 400 },
      { text: "Ask AI Anything", startSec: 406, endSec: 410 },
      { text: "Remove Yourself", startSec: 428, endSec: 432 },
      { text: "Quality Loops", startSec: 443, endSec: 447 },
      { text: "Autonomous Agents", startSec: 454, endSec: 458 },
      { text: "Coding + Review", startSec: 476, endSec: 480 },
      { text: "10/10 Happy", startSec: 479, endSec: 483 },
      { text: "Score 0-10", startSec: 491, endSec: 495 },
    ],
  },

  // 490-523.5s: Outro — summary and sign-off
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
