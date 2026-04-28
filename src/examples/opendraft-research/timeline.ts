import type { TimelineSegment } from "../../engine";

/**
 * OpenDraft Research Video Timeline
 * Educational video about sleep debt and brain performance.
 * Based on Van Dongen et al. (2003) sleep restriction study.
 */
export const TIMELINE: TimelineSegment[] = [
  {
    id: "hook",
    type: "kinetic-text",
    facecamStartSec: 0,
    durationSec: 4.5,
    faceBubble: "hidden",
    showSubtitles: true,
    kineticText: {
      text: "The Hidden Math of Sleep Debt",
      highlightWords: ["Hidden", "Sleep", "Debt"],
      accentColor: "#10b981",
    },
    backgroundEffect: {
      type: "particles",
      accentColor: "#34d399",
      intensity: 0.4,
      particleCount: 25,
    },
  },
  {
    id: "context",
    type: "facecam-full",
    facecamStartSec: 4.5,
    durationSec: 5.5,
    faceBubble: "bottom-right",
    showSubtitles: true,
    inlinePanels: [
      {
        title: "Research Synthesis",
        items: [
          "Van Dongen et al. (2003)",
          "Walker (2017)",
          "Williamson et al.",
          "Harrison & Horne",
        ],
        startSec: 4.5,
        endSec: 10,
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
    id: "question",
    type: "kinetic-text",
    facecamStartSec: 10,
    durationSec: 5.5,
    faceBubble: "hidden",
    showSubtitles: true,
    kineticText: {
      text: "Can you trust your tired brain?",
      highlightWords: ["trust", "tired"],
      accentColor: "#f59e0b",
    },
    backgroundEffect: {
      type: "waves",
      accentColor: "#fbbf24",
      intensity: 0.4,
    },
  },
  {
    id: "reveal",
    type: "kinetic-text",
    facecamStartSec: 15.5,
    durationSec: 4.5,
    faceBubble: "hidden",
    showSubtitles: true,
    kineticText: {
      text: "Your brain is a PATHOLOGICAL LIAR",
      highlightWords: ["PATHOLOGICAL", "LIAR"],
      accentColor: "#ef4444",
    },
    backgroundEffect: {
      type: "particles",
      accentColor: "#f87171",
      intensity: 0.6,
      particleCount: 35,
    },
  },
  {
    id: "data",
    type: "comparison",
    facecamStartSec: 20,
    durationSec: 11.5,
    faceBubble: "bottom-left",
    showSubtitles: true,
    comparison: {
      title: "The Sleep Debt Equation",
      subtitle: "Van Dongen et al. (2003)",
      rows: [
        {
          name: "6 hours/night",
          features: {
            "Duration": "2 weeks",
            "Cognitive impact": "Severe",
            "Equivalent to": "48h awake",
          },
          highlight: true,
        },
        {
          name: "8 hours/night",
          features: {
            "Duration": "Baseline",
            "Cognitive impact": "Normal",
            "Equivalent to": "Rested",
          },
        },
      ],
      featureLabels: ["Duration", "Cognitive impact", "Equivalent to"],
      accentColor: "#ef4444",
    },
    backgroundEffect: {
      type: "grid",
      accentColor: "#fca5a5",
      intensity: 0.3,
    },
  },
  {
    id: "microsleeps",
    type: "animated-diagram",
    facecamStartSec: 31.5,
    durationSec: 8,
    faceBubble: "bottom-right",
    showSubtitles: true,
    diagramTitle: "Microsleeps: Brain Shutdown",
    diagramSteps: [
      { label: "Alert", detail: "Normal awareness", icon: "🟢", color: "#10b981" },
      { label: "Drowsy", detail: "Reaction time slows", icon: "🟡", color: "#f59e0b" },
      { label: "Microsleep", detail: "0.5s brain shutdown", icon: "🔴", color: "#ef4444" },
      { label: "Unaware", detail: "You don't notice it", icon: "⚫", color: "#374151" },
    ],
    backgroundEffect: {
      type: "dots",
      accentColor: "#f87171",
      intensity: 0.5,
    },
  },
  {
    id: "dissociation",
    type: "facecam-full",
    facecamStartSec: 39.5,
    durationSec: 12,
    faceBubble: "bottom-right",
    showSubtitles: true,
    inlinePanels: [
      {
        title: "Judgment-Vigilance Dissociation",
        items: [
          "Performance keeps crashing",
          "Feeling of sleepiness levels off",
          "You believe you've adjusted",
          "You're functionally impaired",
        ],
        startSec: 39.5,
        endSec: 51.5,
        position: "bottom-right",
        accentColor: "#f59e0b",
      },
    ],
    keywords: [
      { text: "THE GAP", startSec: 42, endSec: 46 },
      { text: "DISSOCIATION", startSec: 46, endSec: 50 },
    ],
    backgroundEffect: {
      type: "waves",
      accentColor: "#fbbf24",
      intensity: 0.4,
    },
  },
  {
    id: "warning",
    type: "kinetic-text",
    facecamStartSec: 51.5,
    durationSec: 7.5,
    faceBubble: "hidden",
    showSubtitles: true,
    kineticText: {
      text: "FUNCTIONALLY IMPAIRED",
      highlightWords: ["IMPAIRED"],
      accentColor: "#ef4444",
    },
    backgroundEffect: {
      type: "vignette",
      accentColor: "#ef4444",
      intensity: 0.7,
    },
  },
  {
    id: "takeaway",
    type: "facecam-full",
    facecamStartSec: 59,
    durationSec: 14,
    faceBubble: "hidden",
    showSubtitles: true,
    showEndCard: true,
    overlayText: "Just go to bed.",
    overlayTextTiming: [59, 66],
    backgroundEffect: {
      type: "orbs",
      accentColor: "#10b981",
      intensity: 0.5,
      orbCount: 3,
    },
  },
];
