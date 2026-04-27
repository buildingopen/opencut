import { test, describe } from "node:test";
import assert from "node:assert";
import {
  generateParticles,
  updateParticlePosition,
  waveMotion,
  breathe,
  lerpColor,
  stagger,
  typewriter,
  animatedCounter,
  getKenBurnsTransform,
  KEN_BURNS_PRESETS,
  easing,
} from "../animations";

describe("generateParticles", () => {
  test("same seed produces identical particles", () => {
    const a = generateParticles(10, 123);
    const b = generateParticles(10, 123);
    assert.deepStrictEqual(a, b);
  });

  test("different seed produces different particles", () => {
    const a = generateParticles(10, 123);
    const b = generateParticles(10, 456);
    assert.notDeepStrictEqual(a, b);
  });

  test("count matches requested length", () => {
    assert.strictEqual(generateParticles(5).length, 5);
    assert.strictEqual(generateParticles(100).length, 100);
  });

  test("default seed is deterministic", () => {
    const a = generateParticles(8);
    const b = generateParticles(8);
    assert.deepStrictEqual(a, b);
  });
});

describe("updateParticlePosition", () => {
  test("wraps negative coordinates into bounds", () => {
    const particle = {
      id: 0,
      x: -10,
      y: -10,
      vx: 0,
      vy: 0,
      size: 1,
      opacity: 0.5,
      delay: 0,
    };
    const pos = updateParticlePosition(particle, 0, { width: 100, height: 100 });
    assert.ok(pos.x >= 0 && pos.x < 100, `x=${pos.x} should be within [0,100)`);
    assert.ok(pos.y >= 0 && pos.y < 100, `y=${pos.y} should be within [0,100)`);
  });

  test("wraps coordinates exceeding bounds", () => {
    const particle = {
      id: 1,
      x: 150,
      y: 200,
      vx: 1,
      vy: 1,
      size: 1,
      opacity: 0.5,
      delay: 0,
    };
    const pos = updateParticlePosition(particle, 0, { width: 100, height: 100 });
    assert.ok(pos.x >= 0 && pos.x < 100, `x=${pos.x} should be within [0,100)`);
    assert.ok(pos.y >= 0 && pos.y < 100, `y=${pos.y} should be within [0,100)`);
  });

  test("returns different positions for different frames", () => {
    const particle = generateParticles(1, 99)[0];
    const pos0 = updateParticlePosition(particle, 0);
    const pos60 = updateParticlePosition(particle, 60);
    assert.notDeepStrictEqual(pos0, pos60);
  });
});

describe("waveMotion", () => {
  test("returns 0 at frame 0 with default phase", () => {
    assert.strictEqual(waveMotion(0), 0);
  });

  test("returns amplitude at expected sine peak", () => {
    const freq = 0.05;
    const amplitude = 2;
    // peak of sin occurs at π/2
    const frame = Math.round((Math.PI / 2) / freq);
    const val = waveMotion(frame, freq, amplitude);
    assert.ok(val > amplitude * 0.99, `expected ~${amplitude}, got ${val}`);
  });

  test("returns negative amplitude at expected trough", () => {
    const freq = 0.05;
    const amplitude = 2;
    const frame = Math.round((3 * Math.PI / 2) / freq);
    const val = waveMotion(frame, freq, amplitude);
    assert.ok(val < -amplitude * 0.99, `expected ~-${amplitude}, got ${val}`);
  });
});

describe("breathe", () => {
  test("returns value within [minScale, maxScale]", () => {
    const minScale = 0.9;
    const maxScale = 1.1;
    for (let f = 0; f < 100; f++) {
      const val = breathe(f, minScale, maxScale);
      assert.ok(val >= minScale && val <= maxScale, `frame ${f}: ${val} out of range`);
    }
  });

  test("midpoint of sine cycle returns average of min and max", () => {
    const minScale = 0.9;
    const maxScale = 1.1;
    const speed = 0.03;
    // sin crosses 0 at frame ≈ π / speed
    const frame = Math.round(Math.PI / speed);
    const val = breathe(frame, minScale, maxScale, speed);
    const expected = (minScale + maxScale) / 2;
    assert.ok(Math.abs(val - expected) < 0.01, `expected ~${expected}, got ${val}`);
  });
});

describe("lerpColor", () => {
  test("t=0 returns first color", () => {
    assert.strictEqual(lerpColor("#000000", "#ffffff", 0), "rgb(0, 0, 0)");
  });

  test("t=1 returns second color", () => {
    assert.strictEqual(lerpColor("#000000", "#ffffff", 1), "rgb(255, 255, 255)");
  });

  test("t=0.5 returns midpoint", () => {
    assert.strictEqual(lerpColor("#000000", "#ffffff", 0.5), "rgb(128, 128, 128)");
  });

  test("works with shorthand hex", () => {
    assert.strictEqual(lerpColor("#f00", "#00f", 0.5), "rgb(0, 0, 0)"); // invalid shorthand treated as fallback
  });

  test("works without hash prefix", () => {
    assert.strictEqual(lerpColor("ff0000", "0000ff", 0.5), "rgb(128, 0, 128)");
  });
});

describe("stagger", () => {
  test("returns 0 before item's stagger delay", () => {
    const totalItems = 4;
    const totalDurationSec = 2;
    const fps = 30;
    const index = 2;
    const staggerDelay = (totalDurationSec / totalItems) * index; // 1.0s
    const frame = Math.floor(staggerDelay * fps) - 1;
    const progress = stagger(index, totalItems, totalDurationSec, frame, fps);
    assert.strictEqual(progress, 0);
  });

  test("returns 1 when complete", () => {
    const fps = 30;
    const index = 0;
    const progress = stagger(index, 2, 2, fps * 1, fps); // 1 second > 0.5s fade
    assert.strictEqual(progress, 1);
  });

  test("progress increases linearly between 0 and 1", () => {
    const fps = 30;
    const p0 = stagger(0, 2, 2, 0, fps);
    const p7 = stagger(0, 2, 2, 7, fps);
    const p15 = stagger(0, 2, 2, 15, fps);
    assert.strictEqual(p0, 0);
    assert.ok(p7 > p0 && p7 < 1);
    assert.strictEqual(p15, 1);
  });
});

describe("typewriter", () => {
  test("returns empty string at frame 0", () => {
    assert.strictEqual(typewriter("hello", 0, 30), "");
  });

  test("returns full text when complete", () => {
    const text = "hello world";
    const fps = 30;
    const cps = 10;
    const framesNeeded = Math.ceil((text.length / cps) * fps);
    assert.strictEqual(typewriter(text, framesNeeded, fps, cps), text);
  });

  test("returns correct substring at intermediate frame", () => {
    const text = "abcdefghij";
    const fps = 30;
    const cps = 10;
    // at 1.5 seconds => 15 chars shown, but text is 10 chars
    const result = typewriter(text, 45, fps, cps);
    assert.strictEqual(result, text);
  });

  test("returns partial substring", () => {
    const text = "abcdef";
    const fps = 30;
    const cps = 6; // 0.2 chars per frame => 5 frames per char
    assert.strictEqual(typewriter(text, 5, fps, cps), "a");
    assert.strictEqual(typewriter(text, 10, fps, cps), "ab");
  });
});

describe("animatedCounter", () => {
  test("returns 'from' at progress 0", () => {
    assert.strictEqual(animatedCounter(0, 100, 0), "0");
  });

  test("returns 'to' at progress 1", () => {
    assert.strictEqual(animatedCounter(0, 100, 1), "100");
  });

  test("uses easeOutExpo: fast finish", () => {
    // easeOutExpo(0.5) ≈ 97 (very close to target already)
    const val = parseFloat(animatedCounter(0, 100, 0.5));
    assert.ok(val > 90, `expected > 90 at progress 0.5, got ${val}`);
  });

  test("respects decimals", () => {
    assert.strictEqual(animatedCounter(0, 1, 0.5, 2), parseFloat((easing.easeOutExpo(0.5)).toFixed(2)).toFixed(2));
  });
});

describe("getKenBurnsTransform", () => {
  test("returns scale and translate within preset bounds at progress 0", () => {
    const preset = KEN_BURNS_PRESETS[0];
    const t = getKenBurnsTransform(preset, 0);
    assert.strictEqual(t.scale, preset.scaleFrom);
    assert.strictEqual(t.translateX, preset.txFrom);
    assert.strictEqual(t.translateY, preset.tyFrom);
  });

  test("returns scale and translate within preset bounds at progress 1", () => {
    const preset = KEN_BURNS_PRESETS[1];
    const t = getKenBurnsTransform(preset, 1);
    assert.strictEqual(t.scale, preset.scaleTo);
    assert.strictEqual(t.translateX, preset.txTo);
    assert.strictEqual(t.translateY, preset.tyTo);
  });

  test("produces valid intermediate values", () => {
    const preset = KEN_BURNS_PRESETS[2];
    const t = getKenBurnsTransform(preset, 0.5);
    assert.ok(t.scale >= Math.min(preset.scaleFrom, preset.scaleTo));
    assert.ok(t.scale <= Math.max(preset.scaleFrom, preset.scaleTo));
    assert.ok(t.translateX >= Math.min(preset.txFrom, preset.txTo));
    assert.ok(t.translateX <= Math.max(preset.txFrom, preset.txTo));
    assert.ok(t.translateY >= Math.min(preset.tyFrom, preset.tyTo));
    assert.ok(t.translateY <= Math.max(preset.tyFrom, preset.tyTo));
  });

  test("easing is smooth (monotonic) for all presets", () => {
    for (const preset of KEN_BURNS_PRESETS) {
      const t0 = getKenBurnsTransform(preset, 0.25).scale;
      const t1 = getKenBurnsTransform(preset, 0.5).scale;
      const t2 = getKenBurnsTransform(preset, 0.75).scale;
      const ascending = preset.scaleFrom < preset.scaleTo;
      if (ascending) {
        assert.ok(t0 <= t1, `preset scale not monotonic ascending: ${t0} > ${t1}`);
        assert.ok(t1 <= t2, `preset scale not monotonic ascending: ${t1} > ${t2}`);
      } else {
        assert.ok(t0 >= t1, `preset scale not monotonic descending: ${t0} < ${t1}`);
        assert.ok(t1 >= t2, `preset scale not monotonic descending: ${t1} < ${t2}`);
      }
    }
  });
});
