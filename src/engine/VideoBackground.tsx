/**
 * B-roll video background with Ken Burns motion.
 *
 * Renders an OffthreadVideo layer with cinematic slow zoom/pan,
 * a darken overlay, optional color tint, and vignette.
 *
 * Usage:
 *   <VideoBackground
 *     videoUrl="broll/nature.mp4"
 *     opacity={0.4}
 *     darken={0.5}
 *     presetIndex={2}
 *   />
 */
import React from "react";
import {
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KEN_BURNS_PRESETS, getKenBurnsTransform } from "./animations";

export interface VideoBackgroundProps {
  /** Local path (relative to public/) or remote URL. */
  videoUrl: string;
  /** Base opacity of the video layer. Default 0.3. */
  opacity?: number;
  /** CSS blur in pixels. Default 0. */
  blur?: number;
  /** Darken overlay strength (0-1). Default 0.4. */
  darken?: number;
  /** Optional CSS color string for a tint overlay (e.g. "#1e3a5f"). */
  colorTint?: string;
  /** Which Ken Burns preset to use (0-7). Default 0. */
  presetIndex?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  opacity = 0.3,
  blur = 0,
  darken = 0.4,
  colorTint,
  presetIndex = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const preset = KEN_BURNS_PRESETS[presetIndex % KEN_BURNS_PRESETS.length];
  const progress =
    durationInFrames > 0 ? Math.min(1, Math.max(0, frame / durationInFrames)) : 0;
  const transform = getKenBurnsTransform(preset, progress);

  const resolvedSrc = videoUrl.startsWith("http")
    ? videoUrl
    : staticFile(videoUrl);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity,
      }}
    >
      {/* Video layer with Ken Burns motion */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${transform.scale}) translate(${transform.translateX}%, ${transform.translateY}%)`,
          transformOrigin: "center center",
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      >
        <OffthreadVideo
          src={resolvedSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Darken overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0, 0, 0, ${darken})`,
          pointerEvents: "none",
        }}
      />

      {/* Optional color tint */}
      {colorTint && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colorTint,
            mixBlendMode: "multiply",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
