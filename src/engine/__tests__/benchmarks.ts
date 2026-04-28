/**
 * Performance benchmarks for animation utilities.
 *
 * Run via:
 *   node --require ts-node/register src/engine/__tests__/benchmarks.ts
 */

import { generateParticles, updateParticlePosition } from "../animation/particles";
import { simulateAudioReactivity } from "../animation/audio";
import { KEN_BURNS_PRESETS, getKenBurnsTransform } from "../animation/kenburns";

interface BenchmarkResult {
  benchmark: string;
  iterations: number;
  totalMs: number;
  avgMs: number;
}

const results: BenchmarkResult[] = [];

function bench(name: string, iterations: number, fn: () => void): void {
  const label = `bench:${name}`;
  console.time(label);
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  console.timeEnd(label);

  // Re-run for precise total measurement (console.timeEnd prints to stderr,
  // but we also want a programmatic result for the markdown table).
  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = process.hrtime.bigint();
  const totalMs = Number(end - start) / 1_000_000;
  results.push({
    benchmark: name,
    iterations,
    totalMs,
    avgMs: totalMs / iterations,
  });
}

// ---------------------------------------------------------------------------
// Benchmark: generateParticles
// ---------------------------------------------------------------------------

for (const count of [10, 100, 500, 1000]) {
  bench(`generateParticles(${count})`, 1000, () => {
    generateParticles(count, 42);
  });
}

// ---------------------------------------------------------------------------
// Benchmark: updateParticlePosition (100 particles over 300 frames)
// ---------------------------------------------------------------------------

{
  const particles = generateParticles(100, 42);
  let frame = 0;
  bench("updateParticlePosition (100×300)", 100 * 300, () => {
    updateParticlePosition(particles[frame % particles.length], frame);
    frame++;
  });
}

// ---------------------------------------------------------------------------
// Benchmark: simulateAudioReactivity over 900 frames
// ---------------------------------------------------------------------------

{
  let frame = 0;
  bench("simulateAudioReactivity (900)", 900, () => {
    simulateAudioReactivity(frame, 1);
    frame++;
  });
}

// ---------------------------------------------------------------------------
// Benchmark: getKenBurnsTransform for all 8 presets over 300 frames
// ---------------------------------------------------------------------------

{
  let frame = 0;
  const presets = KEN_BURNS_PRESETS;
  bench("getKenBurnsTransform (8×300)", presets.length * 300, () => {
    const preset = presets[frame % presets.length];
    const progress = (frame % 300) / 300;
    getKenBurnsTransform(preset, progress);
    frame++;
  });
}

// ---------------------------------------------------------------------------
// Print markdown table to stderr
// ---------------------------------------------------------------------------

const lines: string[] = [
  "",
  "## Animation Benchmark Results",
  "",
  "| Benchmark | Iterations | Total (ms) | Avg (ms) |",
  "|---|---:|---:|---:|",
  ...results.map((r) => {
    const total = r.totalMs.toFixed(3);
    const avg = r.avgMs.toFixed(6);
    return `| ${r.benchmark} | ${r.iterations.toLocaleString()} | ${total} | ${avg} |`;
  }),
  "",
];

console.error(lines.join("\n"));
