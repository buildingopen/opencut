import { test, describe } from "node:test";
import assert from "node:assert";
import {
  beatsToFrames,
  barsToFrames,
  buildSceneStarts,
  getSyncedMusicVolume,
  getGridBPM,
  getBeatSyncPlaybackRate,
} from "../MusicSync";

describe("beatsToFrames", () => {
  test("converts beats to frames correctly", () => {
    // 120 bpm, 30 fps => 0.5s per beat => 15 frames per beat
    assert.strictEqual(beatsToFrames(1, 120, 30), 15);
    assert.strictEqual(beatsToFrames(4, 120, 30), 60);
  });

  test("rounds to nearest frame", () => {
    // 140 bpm, 24 fps => 60/140 ≈ 0.4286s per beat => 10.286 frames per beat
    assert.strictEqual(beatsToFrames(1, 140, 24), 10);
    assert.strictEqual(beatsToFrames(3, 140, 24), 31); // round(30.857)
  });

  test("zero beats returns 0", () => {
    assert.strictEqual(beatsToFrames(0, 120, 30), 0);
  });
});

describe("barsToFrames", () => {
  test("converts bars (4 beats) to frames", () => {
    // 120 bpm, 30 fps => 15 frames/beat => 60 frames/bar
    assert.strictEqual(barsToFrames(1, 120, 30), 60);
    assert.strictEqual(barsToFrames(2, 120, 30), 120);
  });

  test("zero bars returns 0", () => {
    assert.strictEqual(barsToFrames(0, 120, 30), 0);
  });
});

describe("getGridBPM", () => {
  test("derives BPM from fps and frames-per-beat", () => {
    // 30 fps, 15 frames/beat => 120 bpm
    assert.strictEqual(getGridBPM(30, 15), 120);
  });

  test("handles 24 fps at 12 frames/beat", () => {
    assert.strictEqual(getGridBPM(24, 12), 120);
  });
});

describe("getBeatSyncPlaybackRate", () => {
  test("returns 1 when source and target BPM match", () => {
    assert.strictEqual(getBeatSyncPlaybackRate(120, 120), 1);
  });

  test("returns correct ratio for speedup", () => {
    assert.strictEqual(getBeatSyncPlaybackRate(120, 140), 140 / 120);
  });

  test("returns correct ratio for slowdown", () => {
    assert.strictEqual(getBeatSyncPlaybackRate(140, 120), 120 / 140);
  });
});

describe("buildSceneStarts", () => {
  test("builds starts without overlap as cumulative sum", () => {
    const durations = [100, 200, 150];
    const starts = buildSceneStarts(durations, 0);
    assert.deepStrictEqual(starts, [0, 100, 300]);
  });

  test("applies overlap between scenes", () => {
    const durations = [100, 200, 150];
    const overlap = 20;
    const starts = buildSceneStarts(durations, overlap);
    // scene 0 starts at 0, scene 1 at 100-20=80, scene 2 at 80+200-20=260
    assert.deepStrictEqual(starts, [0, 80, 260]);
  });

  test("handles single scene", () => {
    assert.deepStrictEqual(buildSceneStarts([500], 30), [0]);
  });

  test("large overlap reduces starts aggressively", () => {
    const durations = [100, 100, 100];
    const starts = buildSceneStarts(durations, 90);
    assert.deepStrictEqual(starts, [0, 10, 20]);
  });
});

describe("getSyncedMusicVolume", () => {
  test("starts at 0 and fades in", () => {
    const totalFrames = 300;
    const baseVolume = 0.5;
    const fadeIn = 30;
    const fadeOut = 30;
    assert.strictEqual(getSyncedMusicVolume(0, totalFrames, baseVolume, fadeIn, fadeOut), 0);
    const midFade = getSyncedMusicVolume(15, totalFrames, baseVolume, fadeIn, fadeOut);
    assert.ok(midFade > 0 && midFade < baseVolume, `midFade=${midFade} should be between 0 and ${baseVolume}`);
  });

  test("reaches full volume after fade-in", () => {
    const totalFrames = 300;
    const baseVolume = 0.8;
    const fadeIn = 30;
    const fadeOut = 30;
    const vol = getSyncedMusicVolume(30, totalFrames, baseVolume, fadeIn, fadeOut);
    assert.strictEqual(vol, baseVolume);
  });

  test("fades out at the end", () => {
    const totalFrames = 300;
    const baseVolume = 0.8;
    const fadeIn = 30;
    const fadeOut = 30;
    const vol = getSyncedMusicVolume(299, totalFrames, baseVolume, fadeIn, fadeOut);
    assert.strictEqual(vol, 0);
    const midFade = getSyncedMusicVolume(285, totalFrames, baseVolume, fadeIn, fadeOut);
    assert.ok(midFade > 0 && midFade < baseVolume, `midFade=${midFade} should be between 0 and ${baseVolume}`);
  });

  test("holds full volume in the middle", () => {
    const totalFrames = 300;
    const baseVolume = 0.6;
    const fadeIn = 30;
    const fadeOut = 30;
    const vol = getSyncedMusicVolume(150, totalFrames, baseVolume, fadeIn, fadeOut);
    assert.strictEqual(vol, baseVolume);
  });

  test("curve respects baseVolume scaling", () => {
    const totalFrames = 100;
    const fadeIn = 10;
    const fadeOut = 10;
    const v1 = getSyncedMusicVolume(5, totalFrames, 0.5, fadeIn, fadeOut);
    const v2 = getSyncedMusicVolume(5, totalFrames, 1.0, fadeIn, fadeOut);
    assert.strictEqual(v2, v1 * 2);
  });
});
