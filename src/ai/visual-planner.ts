/**
 * AI visual planning pipeline.
 *
 * Reads a transcript and existing timeline, then uses Gemini to identify
 * "explanation moments" where inline panels or split-screen visuals would
 * add educational value.
 *
 * Output is a list of VisualInjection specs that can be merged into the
 * timeline via visual-inject.ts.
 */
import { getGeminiModel, GEMINI_FLASH } from "./gemini";
import type { SubtitleSegment, TimelineSegment, InlinePanel } from "../engine/types";

export interface VisualInjection {
  /** Raw second where the visual should appear. */
  rawStartSec: number;
  /** Raw second where it should disappear. */
  rawEndSec: number;
  /** Preferred visual type. */
  type: "inline-panel" | "split-screen" | "animated-diagram";
  /** Title for the panel or diagram. */
  title: string;
  /** Bullet points or step labels. */
  items: string[];
  /** Style: bullets or numbered steps. */
  itemStyle?: "bullets" | "numbered";
  /** AI's reasoning for this injection (not rendered). */
  notes?: string;
}

interface RawInjection {
  rawStartSec: number;
  rawEndSec: number;
  type: "inline-panel" | "split-screen" | "animated-diagram";
  title: string;
  items: string[];
  itemStyle?: "bullets" | "numbered";
  notes?: string;
}

function buildPlannerPrompt(
  transcriptText: string,
  timelineOverview: string,
): string {
  return `You are a video editor analyzing a talking-head educational video transcript.
Your job: identify moments where the speaker introduces or explains a concept, and
suggest a visual panel to appear at that moment to reinforce understanding.

TRANSCRIPT:
${transcriptText}

EXISTING TIMELINE STRUCTURE (segments already have visuals):
${timelineOverview}

OUTPUT RULES:
- Respond with ONLY a valid JSON array (no markdown, no explanation).
- Each entry matches this TypeScript interface:
  {
    "rawStartSec": number,    // when to show (raw seconds from transcript)
    "rawEndSec": number,      // when to hide (3-8 seconds after start recommended)
    "type": "inline-panel" | "split-screen" | "animated-diagram",
    "title": string,          // ≤6 words, e.g. "What is CI/CD?"
    "items": string[],        // 3-5 short bullets or steps (≤12 words each)
    "itemStyle": "bullets" | "numbered",  // numbered for ordered processes
    "notes": string           // why this injection helps
  }

SELECTION CRITERIA (only suggest visuals for these moments):
1. Speaker explicitly defines or explains a concept for the first time
   ("CI/CD stands for...", "what that means is...", "so basically...")
2. Speaker lists a process or numbered steps
   ("first you... then... finally...")
3. Speaker makes a comparison or contrast
   ("unlike X, Y does...")
4. Avoid: general statements, personal stories, transitions, calls to action

QUALITY RULES:
- Max 8 injections total — be selective, not exhaustive
- Each panel must add genuine educational value, not just repeat what is said
- Don't inject during sections that already have screen-static slides (see timeline)
- Prefer inline-panel for short definitions (3-5s), split-screen for processes (5-8s),
  animated-diagram only for multi-step flows

Start your response with [ and end with ].`;
}

function buildTimelineOverview(timeline: TimelineSegment[]): string {
  return timeline.map(seg => {
    const hasVisual = seg.type !== "facecam-full";
    return `${seg.facecamStartSec}s-${seg.facecamStartSec + seg.durationSec}s: ${seg.type}${hasVisual ? " (has visual)" : ""}`;
  }).join("\n");
}

function buildTranscriptText(segments: SubtitleSegment[]): string {
  return segments.map(seg =>
    `[${seg.start.toFixed(1)}s] ${seg.text}`
  ).join("\n");
}

function stripJsonFences(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
}

function validateInjection(obj: unknown): obj is RawInjection {
  if (typeof obj !== "object" || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o["rawStartSec"] === "number" &&
    typeof o["rawEndSec"] === "number" &&
    typeof o["type"] === "string" &&
    typeof o["title"] === "string" &&
    Array.isArray(o["items"])
  );
}

export async function generateVisualPlan(
  transcript: SubtitleSegment[],
  existingTimeline: TimelineSegment[],
  model = GEMINI_FLASH,
): Promise<VisualInjection[]> {
  const transcriptText = buildTranscriptText(transcript);
  const timelineOverview = buildTimelineOverview(existingTimeline);
  const prompt = buildPlannerPrompt(transcriptText, timelineOverview);

  const geminiModel = getGeminiModel(model);
  const result = await geminiModel.generateContent(prompt);
  const text = stripJsonFences(result.response.text());

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Retry once
    const retryPrompt = prompt + "\n\nIMPORTANT: Output ONLY the JSON array. Start with [ and end with ]. No other text.";
    const retryResult = await geminiModel.generateContent(retryPrompt);
    parsed = JSON.parse(stripJsonFences(retryResult.response.text()));
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Visual planner response is not a JSON array");
  }

  return (parsed as unknown[])
    .filter(validateInjection)
    .map(inj => ({
      rawStartSec: inj.rawStartSec,
      rawEndSec: inj.rawEndSec,
      type: inj.type,
      title: inj.title,
      items: inj.items as string[],
      itemStyle: inj.itemStyle,
      notes: inj.notes as string | undefined,
    }));
}

/**
 * Convert VisualInjection[] into InlinePanel[] attached to the correct
 * timeline segments. Returns a new timeline with inlinePanels merged in.
 */
export function mergeInlinePanels(
  timeline: TimelineSegment[],
  injections: VisualInjection[],
): TimelineSegment[] {
  const inlinePanelInjections = injections.filter(i => i.type === "inline-panel");

  return timeline.map(seg => {
    const segEnd = seg.facecamStartSec + seg.durationSec;
    const matching = inlinePanelInjections.filter(inj =>
      inj.rawStartSec >= seg.facecamStartSec &&
      inj.rawStartSec < segEnd
    );

    if (matching.length === 0) return seg;

    const newPanels: InlinePanel[] = matching.map(inj => ({
      title: inj.title,
      items: inj.items,
      itemStyle: inj.itemStyle,
      startSec: inj.rawStartSec,
      endSec: Math.min(inj.rawEndSec, segEnd - 0.5),
    }));

    return {
      ...seg,
      inlinePanels: [...(seg.inlinePanels ?? []), ...newPanels],
    };
  });
}
