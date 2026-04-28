import { describe, it } from "node:test";
import assert from "node:assert";
import { findProjectFile, extractCompositionId, parseFramesArg, findEntryPoint } from "../render";
import fs from "fs";
import path from "path";
import os from "os";

describe("render findProjectFile", () => {
  it("returns the file path when given a .json file", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    const file = path.join(dir, "project.json");
    fs.writeFileSync(file, "{}");
    assert.strictEqual(findProjectFile(file), file);
    fs.rmSync(dir, { recursive: true });
  });

  it("returns the file path when given a .yaml file", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    const file = path.join(dir, "project.yaml");
    fs.writeFileSync(file, "");
    assert.strictEqual(findProjectFile(file), file);
    fs.rmSync(dir, { recursive: true });
  });

  it("finds project.json in a directory", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    fs.writeFileSync(path.join(dir, "project.json"), "{}");
    assert.strictEqual(findProjectFile(dir), path.join(dir, "project.json"));
    fs.rmSync(dir, { recursive: true });
  });

  it("prefers project.json over project.yaml", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    fs.writeFileSync(path.join(dir, "project.json"), "{}");
    fs.writeFileSync(path.join(dir, "project.yaml"), "");
    assert.strictEqual(findProjectFile(dir), path.join(dir, "project.json"));
    fs.rmSync(dir, { recursive: true });
  });

  it("throws when no project file exists", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    assert.throws(() => findProjectFile(dir), /No project\.json/);
    fs.rmSync(dir, { recursive: true });
  });
});

describe("render extractCompositionId", () => {
  it("extracts id from Root.tsx content", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    const file = path.join(dir, "Root.tsx");
    fs.writeFileSync(file, `<Composition id="MyVideo" component={MyVideo} />`);
    assert.strictEqual(extractCompositionId(file), "MyVideo");
    fs.rmSync(dir, { recursive: true });
  });

  it("extracts the first id when multiple exist", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    const file = path.join(dir, "Root.tsx");
    fs.writeFileSync(
      file,
      `<Composition id="First" component={First} /><Composition id="Second" component={Second} />`
    );
    assert.strictEqual(extractCompositionId(file), "First");
    fs.rmSync(dir, { recursive: true });
  });

  it("throws when no id is found", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    const file = path.join(dir, "Root.tsx");
    fs.writeFileSync(file, `export const Root = () => <div>hello</div>;`);
    assert.throws(() => extractCompositionId(file), /Could not find composition id/);
    fs.rmSync(dir, { recursive: true });
  });
});

describe("render parseFramesArg", () => {
  it("parses --frames 0-149", () => {
    assert.strictEqual(parseFramesArg(["--frames", "0-149"]), "0-149");
  });

  it("parses --frames=0-149", () => {
    assert.strictEqual(parseFramesArg(["--frames=0-149"]), "0-149");
  });

  it("returns null when not present", () => {
    assert.strictEqual(parseFramesArg(["--preview"]), null);
  });

  it("returns null for empty args", () => {
    assert.strictEqual(parseFramesArg([]), null);
  });
});

describe("render findEntryPoint", () => {
  it("returns index.ts path when it exists", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    fs.writeFileSync(path.join(dir, "index.ts"), "");
    assert.strictEqual(findEntryPoint(dir), path.join(dir, "index.ts"));
    fs.rmSync(dir, { recursive: true });
  });

  it("throws when index.ts does not exist", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencut-test-"));
    assert.throws(() => findEntryPoint(dir), /No index\.ts/);
    fs.rmSync(dir, { recursive: true });
  });
});
