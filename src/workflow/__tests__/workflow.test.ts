import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import fs from "fs";
import path from "path";
import os from "os";
import { loadProject } from "../loader";
import { validateProject } from "../validator";
import { generateFromProject } from "../generator";
import type { VideoProjectConfig } from "../types";

describe("workflow loader", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-loader-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("loads a valid JSON project", () => {
    const project: VideoProjectConfig = {
      name: "Test",
      format: "horizontal",
      facecam: "./facecam.mp4",
      playbackRate: 1.0,
      segments: [{ type: "title", duration: 2 }],
    };
    const filePath = path.join(tmpDir, "project.json");
    fs.writeFileSync(filePath, JSON.stringify(project, null, 2));

    const loaded = loadProject(filePath);
    assert.strictEqual(loaded.name, "Test");
    assert.strictEqual(loaded.format, "horizontal");
  });

  it("loads a valid YAML project", () => {
    const yaml = `
name: YamlTest
format: vertical
facecam: ./facecam.mp4
playbackRate: 1.2
segments:
  - type: facecam
    duration: 5
`;
    const filePath = path.join(tmpDir, "project.yaml");
    fs.writeFileSync(filePath, yaml);

    const loaded = loadProject(filePath);
    assert.strictEqual(loaded.name, "YamlTest");
    assert.strictEqual(loaded.format, "vertical");
    assert.strictEqual(loaded.segments.length, 1);
  });

  it("throws when file does not exist", () => {
    assert.throws(() => loadProject(path.join(tmpDir, "missing.json")), /not found/);
  });

  it("throws for unsupported file format", () => {
    const filePath = path.join(tmpDir, "project.txt");
    fs.writeFileSync(filePath, "not valid");
    assert.throws(() => loadProject(filePath), /Unsupported project file format/);
  });
});

describe("workflow validator", () => {
  const base: VideoProjectConfig = {
    name: "Test",
    format: "horizontal",
    facecam: "./facecam.mp4",
    playbackRate: 1.0,
    segments: [{ type: "title", duration: 2 }],
  };

  it("returns no errors for a valid project", () => {
    const errors = validateProject(base);
    assert.strictEqual(errors.length, 0);
  });

  it("flags missing name", () => {
    const errors = validateProject({ ...base, name: "" });
    assert.ok(errors.some((e) => e.includes("name")));
  });

  it("flags invalid format", () => {
    const errors = validateProject({ ...base, format: "invalid" as unknown as VideoProjectConfig["format"] });
    assert.ok(errors.some((e) => e.includes("format")));
  });

  it("flags missing facecam", () => {
    const errors = validateProject({ ...base, facecam: "" });
    assert.ok(errors.some((e) => e.includes("facecam")));
  });

  it("flags invalid playbackRate", () => {
    const errors = validateProject({ ...base, playbackRate: 0 });
    assert.ok(errors.some((e) => e.includes("playbackRate")));
  });

  it("flags empty segments", () => {
    const errors = validateProject({ ...base, segments: [] });
    assert.ok(errors.some((e) => e.includes("segments")));
  });

  it("flags segment missing type", () => {
    const errors = validateProject({
      ...base,
      segments: [{ type: "", duration: 2 }],
    });
    assert.ok(errors.some((e) => e.includes("type")));
  });

  it("flags segment invalid duration", () => {
    const errors = validateProject({
      ...base,
      segments: [{ type: "title", duration: -1 }],
    });
    assert.ok(errors.some((e) => e.includes("duration")));
  });
});

describe("workflow generator", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-gen-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("generates Remotion files from a project", () => {
    const project: VideoProjectConfig = {
      name: "GenTest",
      format: "horizontal",
      facecam: "./facecam.mp4",
      playbackRate: 1.0,
      segments: [
        { type: "title", duration: 2 },
        { type: "facecam", duration: 5 },
      ],
    };

    generateFromProject(project, tmpDir);

    assert.ok(fs.existsSync(path.join(tmpDir, "config.ts")));
    assert.ok(fs.existsSync(path.join(tmpDir, "timeline.ts")));
    assert.ok(fs.existsSync(path.join(tmpDir, "Root.tsx")));
    assert.ok(fs.existsSync(path.join(tmpDir, "index.ts")));
  });

  it("includes project name in generated config", () => {
    const project: VideoProjectConfig = {
      name: "NamedProject",
      format: "square",
      facecam: "./cam.mp4",
      playbackRate: 1.2,
      segments: [{ type: "title", duration: 1 }],
    };

    generateFromProject(project, tmpDir);

    const configContent = fs.readFileSync(path.join(tmpDir, "config.ts"), "utf-8");
    assert.ok(configContent.includes("NAMEDPROJECT_CONFIG"));
    assert.ok(configContent.includes("width: 1080"));
    assert.ok(configContent.includes("height: 1080"));
    assert.ok(configContent.includes("playbackRate: 1.2"));
  });

  it("includes segments in generated timeline", () => {
    const project: VideoProjectConfig = {
      name: "SegTest",
      format: "horizontal",
      facecam: "./cam.mp4",
      playbackRate: 1.0,
      segments: [
        { type: "title", duration: 2 },
        { type: "end", duration: 3 },
      ],
    };

    generateFromProject(project, tmpDir);

    const timelineContent = fs.readFileSync(path.join(tmpDir, "timeline.ts"), "utf-8");
    assert.ok(timelineContent.includes("title"));
    assert.ok(timelineContent.includes("end"));
  });
});
