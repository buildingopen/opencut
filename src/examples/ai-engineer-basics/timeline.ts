/**
 * AI Engineer Basics video timeline.
 *
 * Skeleton timeline covering the full 526s (8.8min) recording.
 * TODO: Refine segment boundaries and add overlays once transcript.json arrives.
 *
 * ASSET MANIFEST (required in public/):
 *   ai-engineer-basics.mov  - Federico talking (primary footage)
 *
 * Source video: 1280x720 facecam, raw duration ~526s at 1x speed.
 * At playbackRate 1.2, rendered duration ≈ 438s.
 */
import type { TimelineSegment } from "../../engine";

export const TIMELINE: TimelineSegment[] = [
  // 0-30s: Intro — hook and topic setup
  // TODO: Narrow once transcript is reviewed (first 30 raw seconds)
  {
    id: "s01-intro",
    type: "facecam-full",
    facecamStartSec: 0,
    durationSec: 30,
    faceBubble: "hidden",
    showSubtitles: true,
    showTitleCard: true,
  },

  // 30-496s: Main content — AI Engineer Basics walkthrough
  // TODO: Split into topic sub-segments once transcript beats are mapped
  {
    id: "s02-main",
    type: "facecam-full",
    facecamStartSec: 30,
    durationSec: 466,
    faceBubble: "hidden",
    showSubtitles: true,
  },

  // 496-526s: Outro — CTA and sign-off
  {
    id: "s03-outro",
    type: "facecam-full",
    facecamStartSec: 496,
    durationSec: 30,
    faceBubble: "hidden",
    showSubtitles: true,
    showEndCard: true,
  },
];
