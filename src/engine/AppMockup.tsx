/**
 * Animated UI mockup scene for product demos.
 *
 * Renders a dark browser chrome with traffic-light dots, a URL bar,
 * selectable tabs, and staggered data rows with optional score bars
 * and intent badges.
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

interface AppMockupProps {
  title: string;
  url?: string;
  tabs?: { name: string; active: boolean }[];
  rows?: { label: string; value: string; score?: number; intent?: string }[];
  accentColor?: string;
}

export const AppMockup: React.FC<AppMockupProps> = ({
  title,
  url = "app.example.com",
  tabs = [],
  rows = [],
  accentColor = "#3b82f6",
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const cardProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1]);
  const cardOpacity = cardProgress;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: Math.min(width * 0.85, 1100),
          background: "#111827",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          overflow: "hidden",
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 20px",
            background: "#1f2937",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#374151",
                borderRadius: 8,
                padding: "6px 16px",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 400,
                width: "100%",
                textAlign: "center",
              }}
            >
              {url}
            </div>
          </div>
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
          <div
            style={{
              display: "flex",
              background: "#1f2937",
              padding: "0 12px",
            }}
          >
            {tabs.map((tab, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: tab.active ? 600 : 500,
                  color: tab.active
                    ? "#ffffff"
                    : "rgba(255,255,255,0.5)",
                  background: tab.active ? "#111827" : "transparent",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottom: tab.active
                    ? "none"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {tab.name}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "32px 28px" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 28,
            }}
          >
            {title}
          </div>

          {rows.map((row, i) => {
            const rowDelay = 8 + i * 5;
            const rowProgress =
              frame < rowDelay
                ? 0
                : spring({
                    frame: frame - rowDelay,
                    fps,
                    config: {
                      damping: 14,
                      stiffness: 180,
                      mass: 0.6,
                    },
                  });

            const translateX = interpolate(
              rowProgress,
              [0, 1],
              [40, 0]
            );
            const opacity = rowProgress;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom:
                    i < rows.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                  opacity,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: 4,
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {row.value}
                  </div>
                </div>

                {typeof row.score === "number" && (
                  <div
                    style={{
                      width: 120,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 6,
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.max(0, Math.min(100, row.score))}%`,
                          height: "100%",
                          background: accentColor,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: accentColor,
                        minWidth: 28,
                        textAlign: "right",
                      }}
                    >
                      {row.score}
                    </span>
                  </div>
                )}

                {row.intent && (
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#ffffff",
                      background: accentColor,
                      borderRadius: 50,
                      padding: "4px 12px",
                      flexShrink: 0,
                    }}
                  >
                    {row.intent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
