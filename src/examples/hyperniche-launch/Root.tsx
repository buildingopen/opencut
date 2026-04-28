import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { HYPERNICHE_LAUNCH_CONFIG, AUDIO_OFFSET_SEC } from "./config";
import { TIMELINE } from "./timeline";
import { SUBTITLE_SEGMENTS } from "./subtitles";

const totalFrames = computeTotalFrames(TIMELINE, HYPERNICHE_LAUNCH_CONFIG);

const HypernicheLaunch: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={HYPERNICHE_LAUNCH_CONFIG}
    subtitleSegments={SUBTITLE_SEGMENTS}
    audioOffsetSec={AUDIO_OFFSET_SEC}
    titleCardTitle="HyperNiche"
    titleCardSubtitle="Your brain on sleep"
    endCardTitle="HyperNiche"
    endCardCtaText="Start tracking"
    endCardUrl="hyperniche.app"
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="HypernicheLaunch"
      component={HypernicheLaunch}
      durationInFrames={totalFrames}
      fps={HYPERNICHE_LAUNCH_CONFIG.fps}
      width={HYPERNICHE_LAUNCH_CONFIG.width}
      height={HYPERNICHE_LAUNCH_CONFIG.height}
    />
  </>
);
