/**
 * Animated competitor comparison table.
 *
 * Dark theme with a subtle grid background, staggered row reveals,
 * and a pulsing glow on the highlighted hero row.
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";

interface ComparisonRow {
  name: string;
  logo?: string;
  features: Record<string, boolean | string>;
  highlight?: boolean;
}

interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  rows: ComparisonRow[];
  featureLabels: string[];
  accentColor?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  subtitle,
  rows,
  featureLabels,
  accentColor = "#3b82f6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.7 },
  });

  const titleOpacity = titleProgress;
  const titleTranslateY = interpolate(titleProgress, [0, 1], [30, 0]);

  const glowPulse = Math.sin(frame * 0.08) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        fontFamily: "Inter, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 80px",
      }}
    >
      {/* Subtle grid background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 11 }, (_, i) => {
          const pos = (i / 10) * 100;
          return (
            <React.Fragment key={i}>
              <line
                x1={pos}
                y1="0"
                x2={pos}
                y2="100"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.15"
              />
              <line
                x1="0"
                y1={pos}
                x2="100"
                y2={pos}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.15"
              />
            </React.Fragment>
          );
        })}
      </svg>

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: subtitle ? 12 : 40,
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: 1,
          }}
        >
          {title}
        </div>
      </div>

      {subtitle && (
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            zIndex: 1,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Table */}
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `200px repeat(${featureLabels.length}, 1fr)`,
            gap: 16,
            padding: "14px 24px",
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          <div />
          {featureLabels.map((label, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              {label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const rowDelay = 10 + i * 6;
          const rowProgress =
            frame < rowDelay
              ? 0
              : spring({
                  frame: frame - rowDelay,
                  fps,
                  config: {
                    damping: 14,
                    stiffness: 160,
                    mass: 0.7,
                  },
                });

          const opacity = rowProgress;
          const translateY = interpolate(rowProgress, [0, 1], [20, 0]);

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: `200px repeat(${featureLabels.length}, 1fr)`,
                gap: 16,
                alignItems: "center",
                padding: "18px 24px",
                borderRadius: 14,
                background: row.highlight
                  ? `${accentColor}14`
                  : "rgba(255,255,255,0.03)",
                border: row.highlight
                  ? `1px solid ${accentColor}40`
                  : "1px solid rgba(255,255,255,0.05)",
                boxShadow: row.highlight
                  ? `0 0 ${24 + glowPulse * 16}px ${accentColor}25`
                  : "none",
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {/* Name / Logo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {row.logo && (
                  <Img
                    src={staticFile(row.logo)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      objectFit: "contain",
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: row.highlight ? 700 : 600,
                    color: row.highlight ? accentColor : "#ffffff",
                  }}
                >
                  {row.name}
                </span>
              </div>

              {/* Features */}
              {featureLabels.map((label, j) => {
                const value = row.features[label];
                return (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {typeof value === "boolean" ? (
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: value ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {value ? "✓" : "✕"}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
