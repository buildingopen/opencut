import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { OPENDRAFT_RESEARCH_CONFIG, AUDIO_OFFSET_SEC } from "./config";
import { TIMELINE } from "./timeline";
import { SUBTITLE_SEGMENTS } from "./subtitles";

const totalFrames = computeTotalFrames(TIMELINE, OPENDRAFT_RESEARCH_CONFIG);

const OpendraftResearch: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={OPENDRAFT_RESEARCH_CONFIG}
    subtitleSegments={SUBTITLE_SEGMENTS}
    audioOffsetSec={AUDIO_OFFSET_SEC}
    titleCardTitle="Sleep Debt"
    titleCardSubtitle="Why you can't trust your tired brain"
    endCardTitle="OpenDraft"
    endCardCtaText="Learn more"
    endCardUrl="github.com/federicodeponte/opencut"
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="OpendraftResearch"
      component={OpendraftResearch}
      durationInFrames={totalFrames}
      fps={OPENDRAFT_RESEARCH_CONFIG.fps}
      width={OPENDRAFT_RESEARCH_CONFIG.width}
      height={OPENDRAFT_RESEARCH_CONFIG.height}
    />
  </>
);
