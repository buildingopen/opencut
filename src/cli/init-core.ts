/**
 * Core template generation logic for the init CLI.
 * Extracted for testability.
 */

export const VALID_TEMPLATES = ["facecam", "product", "text-only"] as const;
export type Template = (typeof VALID_TEMPLATES)[number];

export function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function kebabToCamel(str: string): string {
  const pascal = kebabToPascal(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export interface GeneratedFiles {
  config: string;
  timeline: string;
  subtitles: string;
  root: string;
  index: string;
  readme: string;
}

export function generateProject(name: string, template: Template): GeneratedFiles {
  const compName = kebabToPascal(name);

  const config = `import type { VideoConfig } from "../../engine";

export const CONFIG: VideoConfig = {
  playbackRate: 1.2,
  fps: 30,
  width: 1920,
  height: 1080,
  crossfadeFrames: 10,
  facecamAsset: "facecam.mp4",
  bgMusicAsset: "music.mp3",
  bgMusicVolume: 0.06,
};
`;

  const facecamTimeline = `import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  {
    id: "s01-hook",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 8,
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
    keywords: [
      { text: "Hook", startSec: 2, endSec: 6 },
    ],
  },
  {
    id: "s02-main",
    type: "facecam-full",
    facecamStartSec: 8,
    durationSec: 12,
    faceBubble: "bottom-right",
    showSubtitles: true,
    overlayText: "Your tagline here",
    overlayTextTiming: [8, 14],
    keywords: [
      { text: "Key Concept", startSec: 9, endSec: 13 },
    ],
    callouts: [
      { text: "Pro tip", position: "top-right", delaySec: 2, durationSec: 3 },
    ],
  },
  {
    id: "s03-outro",
    type: "facecam-full",
    facecamStartSec: 20,
    durationSec: 8,
    faceBubble: "hidden",
    showSubtitles: true,
    showEndCard: true,
  },
];
`;

  const productTimeline = `import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  {
    id: "s01-intro",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 8,
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
    keywords: [
      { text: "Product Demo", startSec: 1, endSec: 5 },
    ],
  },
  {
    id: "s02-dashboard",
    type: "screen-static",
    facecamStartSec: 8,
    durationSec: 10,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "screenshots/dashboard.png",
    overlayText: "Main dashboard overview",
    overlayTextTiming: [8, 14],
  },
  {
    id: "s03-app",
    type: "app-mockup",
    facecamStartSec: 18,
    durationSec: 10,
    faceBubble: "bottom-right",
    showSubtitles: true,
    appMockup: {
      title: "My App",
      url: "myapp.com",
      tabs: [
        { name: "Overview", active: true },
        { name: "Settings", active: false },
      ],
      rows: [
        { label: "Users", value: "12.4k", score: 94, intent: "positive" },
        { label: "Revenue", value: "$8.2k", score: 87, intent: "positive" },
      ],
      accentColor: "#4ade80",
    },
  },
  {
    id: "s04-compare",
    type: "comparison",
    facecamStartSec: 28,
    durationSec: 12,
    faceBubble: "bottom-left",
    showSubtitles: true,
    comparison: {
      title: "Why us?",
      subtitle: "Head-to-head feature comparison",
      rows: [
        {
          name: "Competitor A",
          features: { "Auto-sync": false, "AI captions": "Manual", "4K Export": true },
        },
        {
          name: "Our Product",
          features: { "Auto-sync": true, "AI captions": "Whisper", "4K Export": true },
          highlight: true,
        },
      ],
      featureLabels: ["Auto-sync", "AI captions", "4K Export"],
      accentColor: "#4ade80",
    },
  },
  {
    id: "s05-outro",
    type: "facecam-full",
    facecamStartSec: 40,
    durationSec: 8,
    faceBubble: "hidden",
    showSubtitles: true,
    showEndCard: true,
  },
];
`;

  const textOnlyTimeline = `import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  {
    id: "s01-kinetic-intro",
    type: "kinetic-text",
    facecamStartSec: 0,
    durationSec: 6,
    faceBubble: "hidden",
    showSubtitles: false,
    kineticText: {
      text: "Big Ideas",
      highlightWords: ["Big"],
      accentColor: "#4ade80",
    },
    backgroundEffect: {
      type: "particles",
      accentColor: "#4ade80",
      intensity: 0.6,
      particleCount: 50,
    },
  },
  {
    id: "s02-kinetic-body",
    type: "kinetic-text",
    facecamStartSec: 6,
    durationSec: 8,
    faceBubble: "hidden",
    showSubtitles: false,
    kineticText: {
      text: "Explained in Motion",
      highlightWords: ["Motion"],
      accentColor: "#60a5fa",
    },
    backgroundEffect: {
      type: "waves",
      accentColor: "#60a5fa",
      intensity: 0.5,
    },
  },
  {
    id: "s03-outro",
    type: "kinetic-text",
    facecamStartSec: 14,
    durationSec: 6,
    faceBubble: "hidden",
    showSubtitles: false,
    showEndCard: true,
    kineticText: {
      text: "Thanks for watching",
      accentColor: "#fbbf24",
    },
    backgroundEffect: {
      type: "orbs",
      accentColor: "#fbbf24",
      intensity: 0.5,
      orbCount: 2,
    },
  },
];
`;

  const timelines: Record<Template, string> = {
    facecam: facecamTimeline,
    product: productTimeline,
    "text-only": textOnlyTimeline,
  };

  const subtitles = `import type { SubtitleSegment } from "../../engine";

export const SUBTITLE_SEGMENTS: SubtitleSegment[] = [];
`;

  const root = `import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { CONFIG } from "./config";
import { TIMELINE } from "./timeline";
import { SUBTITLE_SEGMENTS } from "./subtitles";

const totalFrames = computeTotalFrames(TIMELINE, CONFIG);

const ${compName}: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={CONFIG}
    subtitleSegments={SUBTITLE_SEGMENTS}
    titleCardTitle="${compName}"
    titleCardSubtitle="Your Name"
    endCardTitle="${compName}"
    endCardCtaText="Follow for more"
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="${compName}"
      component={${compName}}
      durationInFrames={totalFrames}
      fps={CONFIG.fps}
      width={CONFIG.width}
      height={CONFIG.height}
    />
    <Composition
      id="${compName}Preview"
      component={${compName}}
      durationInFrames={5 * CONFIG.fps}
      fps={CONFIG.fps}
      width={CONFIG.width}
      height={CONFIG.height}
    />
  </>
);
`;

  const index = `import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
`;

  const readme = `# ${name}

OpenCut video project generated with the \`${template}\` template.

## Files

- \`config.ts\` — video settings
- \`timeline.ts\` — scene-by-scene timeline
- \`subtitles.ts\` — Whisper-generated captions
- \`Root.tsx\` — Remotion root component
- \`index.ts\` — entry point
`;

  return {
    config,
    timeline: timelines[template],
    subtitles,
    root,
    index,
    readme,
  };
}
