import { describe, it } from "node:test";
import assert from "node:assert";
import { VALID_TEMPLATES, generateProject, kebabToPascal, kebabToCamel } from "../init-core";

describe("init-core utilities", () => {
  it("kebabToPascal converts correctly", () => {
    assert.strictEqual(kebabToPascal("my-project"), "MyProject");
    assert.strictEqual(kebabToPascal("hello"), "Hello");
    assert.strictEqual(kebabToPascal("a-b-c"), "ABC");
  });

  it("kebabToCamel converts correctly", () => {
    assert.strictEqual(kebabToCamel("my-project"), "myProject");
    assert.strictEqual(kebabToCamel("hello"), "hello");
  });

  it("has exactly 3 valid templates", () => {
    assert.deepStrictEqual(VALID_TEMPLATES, ["facecam", "product", "text-only"]);
  });
});

describe("init-core generateProject", () => {
  it("generates all 6 files for facecam template", () => {
    const files = generateProject("test-video", "facecam");
    assert.ok(files.config.includes("VideoConfig"));
    assert.ok(files.timeline.includes("TimelineSegment"));
    assert.ok(files.subtitles.includes("SubtitleSegment"));
    assert.ok(files.root.includes("TestVideo"));
    assert.ok(files.index.includes("registerRoot"));
    assert.ok(files.readme.includes("test-video"));
  });

  it("generates all 6 files for product template", () => {
    const files = generateProject("test-video", "product");
    assert.ok(files.timeline.includes("appMockup"));
    assert.ok(files.timeline.includes("comparison"));
    assert.ok(files.root.includes("TestVideo"));
  });

  it("generates all 6 files for text-only template", () => {
    const files = generateProject("test-video", "text-only");
    assert.ok(files.timeline.includes("kinetic-text"));
    assert.ok(files.timeline.includes("backgroundEffect"));
    assert.ok(files.root.includes("TestVideo"));
  });

  it("uses correct component name in Root.tsx", () => {
    const files = generateProject("my-cool-video", "facecam");
    assert.ok(files.root.includes("MyCoolVideo"));
    assert.ok(files.root.includes('id="MyCoolVideo"'));
    assert.ok(files.root.includes('id="MyCoolVideoPreview"'));
  });

  it("config includes facecamAsset for facecam template", () => {
    const files = generateProject("test", "facecam");
    assert.ok(files.config.includes('facecamAsset: "facecam.mp4"'));
  });

  it("text-only config includes facecamAsset", () => {
    const files = generateProject("test", "text-only");
    assert.ok(files.config.includes('facecamAsset: "facecam.mp4"'));
  });
});
