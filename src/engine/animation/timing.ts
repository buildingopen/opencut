/**
 * Timing and sequencing utilities.
 */

import { easing } from "./easing";

/** Compute a 0-1 progress value for an item in a staggered reveal. */
export function stagger(
  index: number,
  totalItems: number,
  totalDurationSeconds: number,
  frame: number,
  fps: number
): number {
  const staggerDelay = (totalDurationSeconds / totalItems) * index;
  const itemFrame = Math.max(0, frame - staggerDelay * fps);
  return Math.min(1, itemFrame / (fps * 0.5));
}

/** Return the substring that should be visible for a typewriter effect. */
export function typewriter(
  text: string,
  frame: number,
  fps: number,
  charsPerSecond: number = 20
): string {
  const charsToShow = Math.floor((frame / fps) * charsPerSecond);
  return text.slice(0, charsToShow);
}

/** Interpolate a number with ease-out-expo easing. */
export function animatedCounter(
  from: number,
  to: number,
  progress: number,
  decimals: number = 0
): string {
  const value = from + (to - from) * easing.easeOutExpo(progress);
  return value.toFixed(decimals);
}

/** 0-1 progress for a line-drawing animation. */
export function drawConnectionProgress(
  frame: number,
  startDelay: number,
  duration: number
): number {
  const progress = (frame - startDelay) / duration;
  return Math.max(0, Math.min(1, progress));
}
