import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { FORMAT_DEMO_CONFIG } from "./config";
import { TIMELINE } from "./timeline";

const totalFrames = computeTotalFrames(TIMELINE, FORMAT_DEMO_CONFIG);

const FormatDemo: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={FORMAT_DEMO_CONFIG}
    subtitleSegments={[]}
    titleCardTitle="OpenCut"
    titleCardSubtitle="Background Effects & Typing Demo"
    endCardTitle="OpenCut"
    endCardCtaText="Learn more"
    endCardUrl="github.com/federicodeponte/opencut"
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="FormatDemoHorizontal"
      component={FormatDemo}
      durationInFrames={totalFrames}
      fps={FORMAT_DEMO_CONFIG.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="FormatDemoVertical"
      component={FormatDemo}
      durationInFrames={totalFrames}
      fps={FORMAT_DEMO_CONFIG.fps}
      width={1080}
      height={1920}
    />
    <Composition
      id="FormatDemoSquare"
      component={FormatDemo}
      durationInFrames={totalFrames}
      fps={FORMAT_DEMO_CONFIG.fps}
      width={1080}
      height={1080}
    />
  </>
);
