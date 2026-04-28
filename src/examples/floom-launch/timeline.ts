import type { TimelineSegment } from "../../engine";

/**
 * Floom Launch Video Timeline
 * Beat grid: 162 BPM, 11 frames/beat, 44 frames/bar @ 30fps.
 * Crossfade overlap = 11 frames (1 beat).
 */
export const TIMELINE: TimelineSegment[] = [
  {
    id: "hook",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 5.87, // 176 frames
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
    backgroundEffect: {
      type: "orbs",
      accentColor: "#10b981",
      intensity: 0.5,
      orbCount: 3,
    },
  },
  {
    id: "landing",
    type: "screen-static",
    facecamStartSec: 5.87,
    durationSec: 5.87, // 176 frames
    faceBubble: "bottom-right",
    showSubtitles: true,
    screenImage: "screenshot-url-input.png",
    backgroundEffect: {
      type: "grid",
      accentColor: "#10b981",
      intensity: 0.3,
    },
  },
  {
    id: "build",
    type: "screen-static",
    facecamStartSec: 11.73,
    durationSec: 5.87, // 176 frames
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "screenshot-generating.png",
    keywords: [
      { text: "DETECTED", startSec: 12, endSec: 14 },
      { text: "generating", startSec: 14, endSec: 16 },
    ],
    backgroundEffect: {
      type: "particles",
      accentColor: "#34d399",
      intensity: 0.6,
      particleCount: 40,
    },
  },
  {
    id: "run",
    type: "screen-video",
    facecamStartSec: 17.6,
    durationSec: 7.33, // 220 frames
    faceBubble: "bottom-right",
    showSubtitles: true,
    screenVideo: "demo-streaming.mp4",
    keywords: [
      { text: "streaming", startSec: 18, endSec: 21 },
      { text: "deals", startSec: 21, endSec: 24 },
    ],
    backgroundEffect: {
      type: "waves",
      accentColor: "#6ee7b7",
      intensity: 0.4,
    },
  },
  {
    id: "install",
    type: "screen-static",
    facecamStartSec: 24.93,
    durationSec: 5.87, // 176 frames
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "screenshot-mcp-config.png",
    keywords: [
      { text: "Claude", startSec: 25, endSec: 27 },
      { text: "MCP", startSec: 27, endSec: 29 },
    ],
    backgroundEffect: {
      type: "dots",
      accentColor: "#10b981",
      intensity: 0.5,
    },
  },
  {
    id: "benefits",
    type: "facecam-full",
    facecamStartSec: 30.8,
    durationSec: 7.33, // 220 frames
    faceBubble: "bottom-right",
    showSubtitles: true,
    inlinePanels: [
      {
        title: "Out-of-the-box",
        items: ["Auth", "Database", "Storage", "Realtime", "Admin"],
        startSec: 31,
        endSec: 37,
        position: "bottom-right",
        accentColor: "#10b981",
      },
    ],
    backgroundEffect: {
      type: "orbs",
      accentColor: "#059669",
      intensity: 0.4,
      orbCount: 2,
    },
  },
  {
    id: "selfhost",
    type: "screen-static",
    facecamStartSec: 38.13,
    durationSec: 4.4, // 132 frames
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "screenshot-docker.png",
    keywords: [
      { text: "Docker", startSec: 38.5, endSec: 40 },
      { text: "self-host", startSec: 40, endSec: 42 },
    ],
    backgroundEffect: {
      type: "grid",
      accentColor: "#10b981",
      intensity: 0.3,
    },
  },
  {
    id: "cta",
    type: "facecam-full",
    facecamStartSec: 42.53,
    durationSec: 4.4, // 132 frames
    faceBubble: "hidden",
    showSubtitles: true,
    overlayText: "floom.io",
    overlayTextTiming: [42.5, 46.5],
    backgroundEffect: {
      type: "vignette",
      accentColor: "#10b981",
      intensity: 0.6,
    },
  },
  {
    id: "end",
    type: "facecam-full",
    facecamStartSec: 46.93,
    durationSec: 2.93, // 88 frames
    faceBubble: "hidden",
    showSubtitles: false,
    showEndCard: true,
    backgroundEffect: {
      type: "orbs",
      accentColor: "#10b981",
      intensity: 0.5,
      orbCount: 2,
    },
  },
];
