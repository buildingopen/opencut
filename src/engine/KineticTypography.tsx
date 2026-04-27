/**
 * High-energy kinetic typography scene.
 *
 * Words slam in dramatically one by one with spring physics.
 * Highlighted words pop in an accent color. The container fades
 * out during the last 20 frames.
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

interface KineticTypographyProps {
  text: string;
  highlightWords?: string[];
  accentColor?: string;
  fontSize?: number;
  staggerFrames?: number;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  highlightWords = [],
  accentColor = "#ef4444",
  fontSize = 64,
  staggerFrames = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const words = text.split(" ");

  const containerOpacity =
    frame > durationInFrames - 20
      ? interpolate(
          frame,
          [durationInFrames - 20, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        )
      : 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: `0 ${fontSize * 1.25}px`,
        gap: `${fontSize * 0.35}px ${fontSize * 0.5}px`,
        opacity: containerOpacity,
      }}
    >
      {words.map((word, i) => {
        const wordStartFrame = i * staggerFrames;
        if (frame < wordStartFrame) return null;

        const progress = spring({
          frame: frame - wordStartFrame,
          fps,
          config: { damping: 12, stiffness: 200, mass: 0.5 },
        });

        const isHighlight = highlightWords.includes(word);
        const scale = interpolate(progress, [0, 1], [2.5, 1]);
        const opacity = progress;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily:
                "Montserrat, Liberation Sans, Arial Black, sans-serif",
              fontSize,
              fontWeight: isHighlight ? 900 : 800,
              color: isHighlight ? accentColor : "#ffffff",
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              transform: `scale(${scale})`,
              opacity,
              lineHeight: 1.2,
            }}
          >
            {word}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};
