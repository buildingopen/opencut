/**
 * Remotion root for the AI Engineer Basics video.
 *
 * Registers two compositions:
 *   - AiEngineerBasics: full-length video
 *   - AiEngineerBasicsPreview: first 5 seconds (for quick iteration)
 */
import React from "react";
import { Composition } from "remotion";
import { VideoComposition, computeTotalFrames } from "../../engine";
import { AI_ENGINEER_CONFIG, AUDIO_OFFSET_SEC } from "./config";
import { TIMELINE } from "./timeline";
import { SUBTITLE_SEGMENTS } from "./subtitles";

const totalFrames = computeTotalFrames(TIMELINE, AI_ENGINEER_CONFIG);

const AiEngineerBasics: React.FC = () => (
  <VideoComposition
    timeline={TIMELINE}
    videoConfig={AI_ENGINEER_CONFIG}
    subtitleSegments={SUBTITLE_SEGMENTS}
    audioOffsetSec={AUDIO_OFFSET_SEC}
    titleCardTitle="AI Engineer Basics"
    titleCardSubtitle="by Federico De Ponte"
    endCardTitle="AI Engineer Basics"
    endCardCtaText="Follow for more"
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AiEngineerBasics"
      component={AiEngineerBasics}
      durationInFrames={totalFrames}
      fps={AI_ENGINEER_CONFIG.fps}
      width={AI_ENGINEER_CONFIG.width}
      height={AI_ENGINEER_CONFIG.height}
    />
    <Composition
      id="AiEngineerBasicsPreview"
      component={AiEngineerBasics}
      durationInFrames={5 * AI_ENGINEER_CONFIG.fps}
      fps={AI_ENGINEER_CONFIG.fps}
      width={AI_ENGINEER_CONFIG.width}
      height={AI_ENGINEER_CONFIG.height}
    />
  </>
);
