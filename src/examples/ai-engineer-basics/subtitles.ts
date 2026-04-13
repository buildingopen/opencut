/**
 * AI Engineer Basics video subtitles.
 *
 * TODO: Populate from transcript.json once Whisper finishes on AX41.
 * Run: ssh ax41 'cat /tmp/ai-engineer-basics-v2.json' > ~/opencut/public/transcript.json
 * Then convert word-level timestamps to SubtitleSegment[] entries here.
 *
 * All timestamps should be in raw seconds (pre-speedup).
 */
import type { SubtitleSegment } from "../../engine";

export const SUBTITLE_SEGMENTS: SubtitleSegment[] = [];
