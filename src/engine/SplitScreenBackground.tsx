/**
 * Split-screen layout: face on one side, content panel on the other.
 *
 * Face occupies ~40% of width, content panel ~60%. Used for longer
 * concept explanations where keeping the face visible matters.
 */
import React from "react";
import { OffthreadVideo, staticFile, Img, useVideoConfig } from "remotion";
import type { SplitContent } from "./types";

export interface SplitScreenBackgroundProps {
  facecamStartSec: number;
  facecamAsset: string;
  playbackRate: number;
  splitContent: SplitContent;
  width: number;
  height: number;
}

export const SplitScreenBackground: React.FC<SplitScreenBackgroundProps> = ({
  facecamStartSec,
  facecamAsset,
  playbackRate,
  splitContent,
  width,
  height,
}) => {
  const { fps } = useVideoConfig();
  const faceWidth = Math.round(width * 0.4);
  const contentWidth = width - faceWidth;
  const accentColor = splitContent.accentColor ?? "#4ade80";
  const bgColor = splitContent.bgColor ?? "#0d1117";

  const faceEl = (
    <div style={{ width: faceWidth, height, flexShrink: 0, overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(facecamAsset)}
        startFrom={Math.round(facecamStartSec * fps)}
        playbackRate={playbackRate}
        style={{ width: faceWidth, height, objectFit: "cover" }}
        volume={0}
        muted
      />
    </div>
  );

  const contentEl = (
    <div
      style={{
        width: contentWidth,
        height,
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 56px",
        flexShrink: 0,
      }}
    >
      {splitContent.contentType === "image" && splitContent.imagePath && (
        <Img
          src={staticFile(splitContent.imagePath)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}

      {splitContent.contentType === "bullets" && splitContent.bullets && (
        <>
          <div
            style={{
              fontFamily: "Inter, -apple-system, sans-serif",
              fontSize: 42,
              fontWeight: 800,
              color: accentColor,
              marginBottom: 40,
              lineHeight: 1.2,
            }}
          >
            {splitContent.bullets.title}
          </div>
          {splitContent.bullets.items.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: accentColor,
                  minWidth: 36,
                  fontFamily: "Inter, -apple-system, sans-serif",
                }}
              >
                {splitContent.bullets?.itemStyle === "numbered" ? `${i + 1}.` : "→"}
              </span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#e0e0e0",
                  lineHeight: 1.45,
                  fontFamily: "Inter, -apple-system, sans-serif",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </>
      )}

      {splitContent.contentType === "code" && splitContent.code && (
        <>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 22,
              background: "#161b22",
              borderRadius: 12,
              padding: "32px 36px",
              border: "1px solid #30363d",
              color: "#e6edf3",
              lineHeight: 1.7,
              overflow: "hidden",
            }}
          >
            {splitContent.code.lines.map((line, i) => (
              <div key={i}>{line || " "}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", width, height, flexDirection: "row" }}>
      {splitContent.faceSide === "left" ? (
        <>{faceEl}{contentEl}</>
      ) : (
        <>{contentEl}{faceEl}</>
      )}
    </div>
  );
};
