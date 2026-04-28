import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { FLOOM_LAUNCH_CONFIG, AUDIO_OFFSET_SEC } from "./config";
import { TIMELINE } from "./timeline";
import { SUBTITLE_SEGMENTS } from "./subtitles";

const totalFrames = computeTotalFrames(TIMELINE, FLOOM_LAUNCH_CONFIG);

const FloomLaunch: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={FLOOM_LAUNCH_CONFIG}
    subtitleSegments={SUBTITLE_SEGMENTS}
    audioOffsetSec={AUDIO_OFFSET_SEC}
    titleCardTitle="Floom"
    titleCardSubtitle="Every API deserves an app"
    endCardTitle="Floom"
    endCardCtaText="Start building"
    endCardUrl="floom.io"
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="FloomLaunch"
      component={FloomLaunch}
      durationInFrames={totalFrames}
      fps={FLOOM_LAUNCH_CONFIG.fps}
      width={FLOOM_LAUNCH_CONFIG.width}
      height={FLOOM_LAUNCH_CONFIG.height}
    />
  </>
);
