import type { TimelineSegment } from "../../engine";

/**
 * HyperNiche Launch Video Timeline
 * Productivity app launch with comparison table and animated workflow.
 */
export const TIMELINE: TimelineSegment[] = [
  {
    id: "hook",
    type: "kinetic-text",
    facecamStartSec: 0,
    durationSec: 5.87,
    faceBubble: "hidden",
    showSubtitles: true,
    kineticText: {
      text: "Your brain is a pathological liar when tired",
      highlightWords: ["pathological", "liar"],
      accentColor: "#ef4444",
    },
    backgroundEffect: {
      type: "particles",
      accentColor: "#f87171",
      intensity: 0.5,
      particleCount: 30,
    },
  },
  {
    id: "hero",
    type: "facecam-full",
    facecamStartSec: 5.87,
    durationSec: 5.87,
    faceBubble: "bottom-right",
    showSubtitles: true,
    backgroundEffect: {
      type: "orbs",
      accentColor: "#f97316",
      intensity: 0.5,
      orbCount: 2,
    },
  },
  {
    id: "comparison",
    type: "comparison",
    facecamStartSec: 11.73,
    durationSec: 7.33,
    faceBubble: "bottom-left",
    showSubtitles: true,
    comparison: {
      title: "Sleep Trackers Compared",
      subtitle: "Who actually helps you fix sleep?",
      rows: [
        {
          name: "HyperNiche",
          logo: "hyperniche-logo.png",
          features: {
            "Sleep tracking": true,
            "Cognitive tests": true,
            "Microsleep detection": true,
            "Personalized advice": true,
            "Price": "Free",
          },
          highlight: true,
        },
        {
          name: "Fitbit",
          features: {
            "Sleep tracking": true,
            "Cognitive tests": false,
            "Microsleep detection": false,
            "Personalized advice": false,
            "Price": "$9.99/mo",
          },
        },
        {
          name: "Oura",
          features: {
            "Sleep tracking": true,
            "Cognitive tests": false,
            "Microsleep detection": false,
            "Personalized advice": true,
            "Price": "$5.99/mo",
          },
        },
      ],
      featureLabels: [
        "Sleep tracking",
        "Cognitive tests",
        "Microsleep detection",
        "Personalized advice",
        "Price",
      ],
      accentColor: "#f97316",
    },
    backgroundEffect: {
      type: "grid",
      accentColor: "#fb923c",
      intensity: 0.3,
    },
  },
  {
    id: "workflow",
    type: "animated-diagram",
    facecamStartSec: 19.07,
    durationSec: 5.87,
    faceBubble: "bottom-right",
    showSubtitles: true,
    diagramTitle: "How HyperNiche Works",
    diagramSteps: [
      { label: "Track", detail: "Monitor sleep & cognition", icon: "📊", color: "#f97316" },
      { label: "Analyze", detail: "AI finds patterns", icon: "🧠", color: "#fb923c" },
      { label: "Act", detail: "Personalized interventions", icon: "⚡", color: "#fdba74" },
      { label: "Improve", detail: "Measure real results", icon: "📈", color: "#fed7aa" },
    ],
    backgroundEffect: {
      type: "waves",
      accentColor: "#f97316",
      intensity: 0.4,
    },
  },
  {
    id: "features",
    type: "facecam-full",
    facecamStartSec: 24.93,
    durationSec: 5.87,
    faceBubble: "bottom-left",
    showSubtitles: true,
    inlinePanels: [
      {
        title: "Key Features",
        items: [
          "Reaction time tests",
          "Microsleep alerts",
          "Sleep debt calculator",
          " circadian rhythm optimizer",
        ],
        startSec: 25,
        endSec: 30,
        position: "bottom-right",
        accentColor: "#f97316",
      },
    ],
    backgroundEffect: {
      type: "dots",
      accentColor: "#fb923c",
      intensity: 0.5,
    },
  },
  {
    id: "cta",
    type: "facecam-full",
    facecamStartSec: 30.8,
    durationSec: 4.4,
    faceBubble: "hidden",
    showSubtitles: true,
    overlayText: "hyperniche.app",
    overlayTextTiming: [30.8, 34.8],
    backgroundEffect: {
      type: "vignette",
      accentColor: "#f97316",
      intensity: 0.6,
    },
  },
  {
    id: "end",
    type: "facecam-full",
    facecamStartSec: 35.2,
    durationSec: 2.93,
    faceBubble: "hidden",
    showSubtitles: false,
    showEndCard: true,
    backgroundEffect: {
      type: "orbs",
      accentColor: "#f97316",
      intensity: 0.5,
      orbCount: 2,
    },
  },
];
