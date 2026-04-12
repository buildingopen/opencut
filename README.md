# OpenCut

Remotion-based video production engine. Define a timeline, point it at your footage and transcript, render a polished video.

Built for product demo videos: word-level subtitles, face-cam bubbles, keyword overlays, notification banners, title/end cards.

## How it works

```
Record (facecam + screen)
    |
Transcribe (Whisper --word_timestamps)
    |
Define timeline (array of TimelineSegments)
    |
Render (Remotion CLI)
    |
out/video.mp4
```

1. **Record** raw facecam footage, screen recordings, and screenshots.
2. **Transcribe** with Whisper using `--word_timestamps True` for word-level timing.
3. **Define a timeline** as an array of `TimelineSegment` objects that map sections of your recording to visual backgrounds and overlays.
4. **Configure** playback rate, resolution, facecam path, and background music in a `VideoConfig`.
5. **Render** with the Remotion CLI.

## Quick start

```bash
npm install

# Preview in browser (requires assets in public/)
npm run preview

# Render full video
npm run render
```

## Project structure

```
src/
  engine/                   # Reusable video components
    types.ts                # All TypeScript interfaces
    Composition.tsx         # Sequences timeline segments + audio
    Segment.tsx             # Renders one segment (background + overlays)
    FaceBubble.tsx          # Circular face-cam PiP
    SubtitleOverlay.tsx     # Word-level subtitles with active word highlight
    KeywordOverlay.tsx      # Large keyword text overlays
    TitleCard.tsx           # Full-screen title card
    EndCard.tsx             # Full-screen end card with CTA
    NotificationBanner.tsx  # Slide-in notification popups
    index.ts                # Public API exports
  examples/
    openslides/             # Example: OpenSlides product demo
```

## Creating a new video

Create a folder under `src/examples/your-project/` with three files:

**config.ts**

```ts
import type { VideoConfig } from "../../engine";

export const MY_CONFIG: VideoConfig = {
  playbackRate: 1.2,
  fps: 30,
  width: 1920,
  height: 1080,
  crossfadeFrames: 10,
  facecamAsset: "my-facecam.mov",
  bgMusicAsset: "music.mp3",
  bgMusicVolume: 0.06,
};
```

**timeline.ts**

```ts
import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  {
    id: "intro",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 10,
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
  },
  {
    id: "demo",
    type: "screen-static",
    facecamStartSec: 10,
    durationSec: 20,
    faceBubble: "bottom-left",
    showSubtitles: true,
    screenImage: "my-screenshot.png",
    keywords: [
      { text: "Key Feature", startSec: 12, endSec: 16 },
    ],
  },
];
```

**Root.tsx**

```tsx
import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { MY_CONFIG } from "./config";
import { TIMELINE } from "./timeline";
import { SUBTITLE_SEGMENTS } from "./subtitles";

const totalFrames = computeTotalFrames(TIMELINE, MY_CONFIG);

const MyVideo: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={MY_CONFIG}
    subtitleSegments={SUBTITLE_SEGMENTS}
    titleCardTitle="My Product"
    titleCardSubtitle="The tagline"
    endCardTitle="My Product"
    endCardCtaText="Try it now"
    endCardUrl="myproduct.com"
  />
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MyVideo"
    component={MyVideo}
    durationInFrames={totalFrames}
    fps={MY_CONFIG.fps}
    width={MY_CONFIG.width}
    height={MY_CONFIG.height}
  />
);
```

Place assets in `public/`, then render:

```bash
npx remotion render src/examples/your-project/index.ts MyVideo out/my-video.mp4
```

## Engine components

| Component | What it does |
|-----------|-------------|
| `VideoComposition` | Top-level component. Takes timeline, config, subtitles; sequences everything into the final video. |
| `Segment` | Renders one timeline segment: background (facecam/screenshot/video/slides) + overlays. |
| `FaceBubble` | Circular face-cam picture-in-picture. Configurable position, size, and filters. |
| `SubtitleOverlay` | Groups words into 3-7 word phrases, highlights the active word. |
| `KeywordOverlay` | Large uppercase text with scale-in animation, positioned at the top. |
| `TitleCard` | Full-screen title overlay with configurable text and colors. |
| `EndCard` | Full-screen end card with CTA button and URL pill. |
| `NotificationBanner` | macOS-style slide-in notifications. Presets: WhatsApp (green), iMessage (blue), generic (gray). |

All style props (`SubtitleStyle`, `KeywordStyle`, `CardStyle`, `EndCardStyle`) are optional overrides on `VideoComposition`.

## Rendering on a server

```bash
timeout 10m npx remotion render src/examples/openslides/index.ts OpenSlidesDemo out/video.mp4
```

Use `timeout` to prevent runaway renders.

## License

MIT
