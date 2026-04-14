/**
 * Animated flow diagram rendered as a Remotion component.
 *
 * Steps reveal one by one with slide+fade animations. Used as the
 * background for "animated-diagram" segments — replaces static PNG slides
 * for key process explanations.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import type { DiagramStep } from "./types";

export interface AnimatedDiagramProps {
  title: string;
  steps: DiagramStep[];
  width: number;
  height: number;
  /** Raw duration of the segment in seconds. */
  rawDurationSec: number;
  playbackRate: number;
  /** Time before first step appears (raw seconds). Default 0.5. */
  introSec?: number;
}

export const AnimatedDiagram: React.FC<AnimatedDiagramProps> = ({
  title,
  steps,
  width,
  height,
  rawDurationSec,
  playbackRate,
  introSec = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const outputTimeSec = frame / fps;
  const rawTimeSec = outputTimeSec * playbackRate;

  // Distribute step reveals evenly across the segment duration
  const revealWindowSec = rawDurationSec - introSec;
  const stepInterval = revealWindowSec / steps.length;

  return (
    <div
      style={{
        width,
        height,
        background: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 80px",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: "#ffffff",
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {/* Steps row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {steps.map((step, i) => {
          const revealAt = introSec + i * stepInterval;
          const animDur = 0.4;
          const progress = rawTimeSec < revealAt
            ? 0
            : rawTimeSec < revealAt + animDur
              ? interpolate(rawTimeSec, [revealAt, revealAt + animDur], [0, 1], {
                  easing: Easing.out(Easing.cubic),
                })
              : 1;

          const stepColor = step.color ?? "#1a7a4a";

          return (
            <React.Fragment key={i}>
              {/* Step box */}
              <div
                style={{
                  opacity: progress,
                  transform: `translateY(${(1 - progress) * 30}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 200,
                    minHeight: 160,
                    background: stepColor,
                    borderRadius: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 16px",
                    gap: 10,
                  }}
                >
                  {step.icon && (
                    <span style={{ fontSize: 48 }}>{step.icon}</span>
                  )}
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#fff",
                      textAlign: "center",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.label}
                  </span>
                  {step.detail && (
                    <span
                      style={{
                        fontSize: 16,
                        color: "rgba(255,255,255,0.75)",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {step.detail}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    fontSize: 52,
                    color: "#30363d",
                    margin: "0 12px",
                    paddingBottom: 20,
                    opacity: progress,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
