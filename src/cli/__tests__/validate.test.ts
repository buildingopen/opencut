import { describe, it } from "node:test";
import assert from "node:assert";
import { runChecks } from "../validate";
import type { TimelineSegment, VideoConfig } from "../../engine";

const DEFAULT_CONFIG: VideoConfig = {
  playbackRate: 1.0,
  fps: 30,
  width: 1920,
  height: 1080,
  crossfadeFrames: 10,
  facecamAsset: "",
};

async function validate(timeline: TimelineSegment[], config: VideoConfig = DEFAULT_CONFIG) {
  const fileContent = JSON.stringify(timeline, null, 2);
  return runChecks(timeline, config, "/nonexistent/public", fileContent);
}

describe("validate required fields", () => {
  it("passes for a valid minimal segment", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.strictEqual(errors.length, 0);
  });

  it("flags missing id", async () => {
    const errors = await validate([
      {
        id: "",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes("Missing required field: id")));
  });

  it("flags missing type", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      } as unknown as TimelineSegment,
    ]);
    assert.ok(errors.some((e) => e.message.includes("Missing required field: type")));
  });

  it("flags missing durationSec", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: undefined as unknown as number,
        faceBubble: "hidden",
        showSubtitles: false,
      } as unknown as TimelineSegment,
    ]);
    assert.ok(errors.some((e) => e.message.includes("Missing or invalid required field: durationSec")));
  });

  it("flags missing faceBubble", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "",
        showSubtitles: false,
      } as unknown as TimelineSegment,
    ]);
    assert.ok(errors.some((e) => e.message.includes("Missing required field: faceBubble")));
  });

  it("flags missing showSubtitles", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: undefined as unknown as boolean,
      } as unknown as TimelineSegment,
    ]);
    assert.ok(errors.some((e) => e.message.includes("Missing or invalid required field: showSubtitles")));
  });
});

describe("validate type-specific fields", () => {
  it("flags missing screenImage for screen-static", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "screen-static",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes('Type "screen-static" requires field: screenImage')));
  });

  it("flags missing screenVideo for screen-video", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "screen-video",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes('Type "screen-video" requires field: screenVideo')));
  });

  it("flags missing kineticText for kinetic-text", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "kinetic-text",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes('Type "kinetic-text" requires field: kineticText')));
  });

  it("passes when type-specific fields are present", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "screen-static",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        screenImage: "screenshot.png",
      },
    ]);
    assert.ok(!errors.some((e) => e.message.includes("requires field")));
  });
});

describe("validate cumulative drift", () => {
  it("passes when facecamStartSec equals cumulative sum", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
      {
        id: "s2",
        type: "facecam-full",
        facecamStartSec: 5,
        durationSec: 3,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.ok(!errors.some((e) => e.message.includes("Cumulative drift")));
  });

  it("flags drift when facecamStartSec is wrong", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
      },
      {
        id: "s2",
        type: "facecam-full",
        facecamStartSec: 6,
        durationSec: 3,
        faceBubble: "hidden",
        showSubtitles: false,
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes("Cumulative drift")));
  });
});

describe("validate keywords", () => {
  it("flags dead keyword outside segment bounds", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        keywords: [{ text: "Late", startSec: 6, endSec: 8 }],
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes('Dead keyword "Late"')));
  });

  it("flags overlapping keywords", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 10,
        faceBubble: "hidden",
        showSubtitles: false,
        keywords: [
          { text: "A", startSec: 1, endSec: 4 },
          { text: "B", startSec: 3, endSec: 6 },
        ],
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes("Keyword overlap")));
  });

  it("passes for non-overlapping keywords", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 10,
        faceBubble: "hidden",
        showSubtitles: false,
        keywords: [
          { text: "A", startSec: 1, endSec: 3 },
          { text: "B", startSec: 4, endSec: 6 },
        ],
      },
    ]);
    assert.ok(!errors.some((e) => e.message.includes("Keyword")));
  });
});

describe("validate inline panels", () => {
  it("flags dead inline panel outside segment bounds", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        inlinePanels: [
          {
            title: "Test",
            items: ["a"],
            startSec: 6,
            endSec: 8,
          },
        ],
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes('Dead inline panel "Test"')));
  });

  it("passes for inline panel within bounds", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        inlinePanels: [
          {
            title: "Test",
            items: ["a"],
            startSec: 1,
            endSec: 4,
          },
        ],
      },
    ]);
    assert.ok(!errors.some((e) => e.message.includes("inline panel")));
  });
});

describe("validate callouts", () => {
  it("flags dead callout exceeding segment duration", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        callouts: [
          { text: "Tip", position: "top-right", delaySec: 3, durationSec: 3 },
        ],
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes('Dead callout "Tip"')));
  });

  it("passes for callout within segment duration", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        callouts: [
          { text: "Tip", position: "top-right", delaySec: 1, durationSec: 3 },
        ],
      },
    ]);
    assert.ok(!errors.some((e) => e.message.includes("callout")));
  });
});

describe("validate overlayText timing", () => {
  it("flags overlayText timing outside segment bounds", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        overlayText: "Hello",
        overlayTextTiming: [6, 8],
      },
    ]);
    assert.ok(errors.some((e) => e.message.includes("overlayTextTiming")));
  });

  it("passes for overlayText timing within bounds", async () => {
    const errors = await validate([
      {
        id: "s1",
        type: "facecam-full",
        facecamStartSec: 0,
        durationSec: 5,
        faceBubble: "hidden",
        showSubtitles: false,
        overlayText: "Hello",
        overlayTextTiming: [1, 4],
      },
    ]);
    assert.ok(!errors.some((e) => e.message.includes("overlayTextTiming")));
  });
});
