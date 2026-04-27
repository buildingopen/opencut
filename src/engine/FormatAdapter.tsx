/**
 * Multi-format video adapter.
 *
 * Wraps content designed for a reference resolution (default 1920×1080)
 * and scales it to fit target output formats (horizontal, vertical, square).
 * Centers the content and adds black letterbox / pillarbox bars when needed.
 *
 * For vertical output, facecam content is naturally centered so the
 * pillarbox crop is usually safe. If you need edge-to-edge filling,
 * consider pre-cropping facecam footage before passing it in.
 */
import React from "react";

export type VideoFormat = "horizontal" | "vertical" | "square";

export interface FormatAdapterProps {
  format: VideoFormat;
  children: React.ReactNode;
  /** Width the children are authored for. Default 1920. */
  contentWidth?: number;
  /** Height the children are authored for. Default 1080. */
  contentHeight?: number;
}

const FORMAT_DIMENSIONS: Record<VideoFormat, { width: number; height: number }> = {
  horizontal: { width: 1920, height: 1080 },
  vertical: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
};

export const FormatAdapter: React.FC<FormatAdapterProps> = ({
  format,
  children,
  contentWidth = 1920,
  contentHeight = 1080,
}) => {
  const { width: targetW, height: targetH } = FORMAT_DIMENSIONS[format];

  // Scale to fit entirely inside the target frame (contain)
  const scale = Math.min(targetW / contentWidth, targetH / contentHeight);
  const scaledW = contentWidth * scale;
  const scaledH = contentHeight * scale;

  const left = (targetW - scaledW) / 2;
  const top = (targetH - scaledH) / 2;

  return (
    <div
      style={{
        width: targetW,
        height: targetH,
        background: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left,
          top,
          width: scaledW,
          height: scaledH,
        }}
      >
        <div
          style={{
            width: contentWidth,
            height: contentHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/** Return Remotion composition dimensions for a given format. */
export function getFormatDimensions(format: VideoFormat): {
  width: number;
  height: number;
} {
  return FORMAT_DIMENSIONS[format];
}
