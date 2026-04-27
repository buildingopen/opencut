import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  {
    id: "intro",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 6,
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
    backgroundEffect: {
      type: "orbs",
      accentColor: "#4ade80",
      intensity: 0.5,
      orbCount: 2,
    },
  },
  {
    id: "typing-demo",
    type: "facecam-full",
    facecamStartSec: 6,
    durationSec: 8,
    faceBubble: "bottom-right",
    showSubtitles: true,
    keywords: [
      { text: "Typing Effect", startSec: 6, endSec: 10 },
    ],
    backgroundEffect: {
      type: "particles",
      accentColor: "#60a5fa",
      intensity: 0.6,
      particleCount: 30,
    },
  },
  {
    id: "grid-transition",
    type: "screen-static",
    facecamStartSec: 14,
    durationSec: 6,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "screenshot.png",
    backgroundEffect: {
      type: "grid",
      accentColor: "#a78bfa",
      intensity: 0.4,
    },
  },
  {
    id: "waves",
    type: "facecam-full",
    facecamStartSec: 20,
    durationSec: 6,
    faceBubble: "bottom-right",
    showSubtitles: true,
    backgroundEffect: {
      type: "waves",
      accentColor: "#f472b6",
      intensity: 0.5,
    },
  },
  {
    id: "dots-outro",
    type: "facecam-full",
    facecamStartSec: 26,
    durationSec: 6,
    faceBubble: "hidden",
    showSubtitles: false,
    showEndCard: true,
    backgroundEffect: {
      type: "dots",
      accentColor: "#fbbf24",
      intensity: 0.5,
    },
    overlayText: "Thanks for watching",
    overlayTextTiming: [26, 32],
  },
];
