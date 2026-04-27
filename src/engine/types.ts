/**
 * Core type definitions for the video engine.
 *
 * These types define the data structures used to describe a video's
 * timeline, subtitle data, notification banners, and overlay keywords.
 */

// ---------------------------------------------------------------------------
// Face bubble
// ---------------------------------------------------------------------------

/** Where the circular face-cam bubble is positioned on screen. */
export type FaceBubblePosition =
  | "bottom-left"
  | "bottom-right"
  | "top-right"
  | "top-left"
  | "hidden";

// ---------------------------------------------------------------------------
// Keyword overlay
// ---------------------------------------------------------------------------

/** A keyword or phrase shown as a large overlay during a segment. */
export interface KeywordEntry {
  /** Text to display (e.g. "Design System"). */
  text: string;
  /** Start time in raw seconds (pre-speedup). */
  startSec: number;
  /** End time in raw seconds (pre-speedup). */
  endSec: number;
}

// ---------------------------------------------------------------------------
// Callout overlay
// ---------------------------------------------------------------------------

/** A small callout badge that appears over the video. */
export interface CalloutEntry {
  text: string;
  position: "top-right" | "top-left" | "center";
  /** Delay from the start of the segment, in raw seconds. */
  delaySec: number;
  /** Duration the callout stays visible, in raw seconds. */
  durationSec: number;
}

// ---------------------------------------------------------------------------
// Notification banner
// ---------------------------------------------------------------------------

/** A single notification message (e.g. a WhatsApp-style popup). */
export interface NotificationMessage {
  /** Display name of the sender. */
  sender: string;
  /** Message body text. */
  text: string;
  /** Delay from segment start in raw seconds before this message appears. */
  delaySec: number;
}

/** Visual style presets for the notification banner. */
export type NotificationStyle = "whatsapp" | "imessage" | "generic";

// ---------------------------------------------------------------------------
// Subtitle data (from Whisper or similar)
// ---------------------------------------------------------------------------

/** A single word with timing info from a speech-to-text transcript. */
export interface Word {
  word: string;
  /** Start time in seconds (raw, pre-speedup). */
  start: number;
  /** End time in seconds (raw, pre-speedup). */
  end: number;
}

/** A sentence-level subtitle segment containing individual words. */
export interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
  words: Word[];
}

// ---------------------------------------------------------------------------
// Background effects
// ---------------------------------------------------------------------------

/** Generative background effect types. */
export type BackgroundEffectType =
  | "orbs"
  | "particles"
  | "grid"
  | "waves"
  | "dots"
  | "vignette";

/** Configuration for a generative background effect on a segment. */
export interface BackgroundEffectConfig {
  type: BackgroundEffectType;
  /** Primary accent color (hex). Default "#4ade80". */
  accentColor?: string;
  /** Opacity/intensity multiplier (0-1). Default 0.5. */
  intensity?: number;
  /** For "orbs": number of orbs (1-3). Default 1. */
  orbCount?: number;
  /** For "particles": number of particles. Default 40. */
  particleCount?: number;
}

// ---------------------------------------------------------------------------
// Timeline segment
// ---------------------------------------------------------------------------

/** The kind of visual background a segment shows. */
export type SegmentType =
  | "facecam-full"
  | "slides"
  | "screen-static"
  | "screen-video"
  | "split-screen"
  | "animated-diagram"
  | "cta";

/**
 * A single segment in the video timeline.
 *
 * Each segment maps to a contiguous portion of the video and defines
 * what background to show, where the face bubble goes, which overlays
 * are active, and so on.
 */
export interface TimelineSegment {
  /** Unique identifier for this segment. */
  id: string;
  /** Visual background type. */
  type: SegmentType;
  /** Start time in the raw facecam footage (seconds). */
  facecamStartSec: number;
  /** Duration of this segment in raw seconds (pre-speedup). */
  durationSec: number;
  /** Where the face bubble circle appears. "hidden" = no bubble. */
  faceBubble: FaceBubblePosition;
  /** Whether subtitles are shown during this segment. */
  showSubtitles: boolean;

  // Background-specific fields
  /** Path to a static screenshot (relative to public/). Used when type = "screen-static". */
  screenImage?: string;
  /** Path to a screen recording video. Used when type = "screen-video". */
  screenVideo?: string;
  /** Array of slide image paths for a slideshow. Used when type = "slides". */
  slideImages?: string[];
  /** Duration each slide is shown, in raw seconds. */
  slideDuration?: number;

  // Overlay fields
  /** Small overlay text (e.g. "8 slides. Branded. Ready."). */
  overlayText?: string;
  /** [startSec, endSec] in raw time for the overlay text. */
  overlayTextTiming?: [number, number];
  /** Large keyword overlays shown during facecam-full segments. */
  keywords?: KeywordEntry[];
  /** Callout badges shown over the video. */
  callouts?: CalloutEntry[];

  /** Whether to show the title card overlay at the start of this segment. */
  showTitleCard?: boolean;
  /** Whether to show the end card overlay at the end of this segment. */
  showEndCard?: boolean;

  /**
   * Notification banner messages to overlay on this segment.
   * When set, a static background image (notificationBackgroundImage) is used
   * instead of screenVideo, and the messages slide in on top.
   */
  notifications?: {
    messages: NotificationMessage[];
    style: NotificationStyle;
    /** Static background image to use instead of screenVideo. */
    backgroundImage?: string;
  };

  /** Inline concept panels overlaid on the face (any segment type). */
  inlinePanels?: InlinePanel[];
  /** Split-screen configuration. Required when type = "split-screen". */
  splitContent?: SplitContent;
  /** Steps for an animated diagram. Required when type = "animated-diagram". */
  diagramSteps?: DiagramStep[];
  /** Title for the animated diagram. */
  diagramTitle?: string;

  /** Optional generative background effect layered behind the segment. */
  backgroundEffect?: BackgroundEffectConfig;
}

// ---------------------------------------------------------------------------
// Video configuration
// ---------------------------------------------------------------------------

/** Top-level configuration for a video project. */
export interface VideoConfig {
  /** Playback speed multiplier (e.g. 1.3 for 1.3x speedup). */
  playbackRate: number;
  /** Frames per second of the output video. */
  fps: number;
  /** Output video width in pixels. */
  width: number;
  /** Output video height in pixels. */
  height: number;
  /** Number of frames for crossfade transitions between segments. */
  crossfadeFrames: number;
  /** Path to the primary facecam video asset (relative to public/). */
  facecamAsset: string;
  /** Optional path to background music (relative to public/). */
  bgMusicAsset?: string;
  /** Volume for background music (0-1). Defaults to 0.08. */
  bgMusicVolume?: number;
}

// ---------------------------------------------------------------------------
// Style configuration
// ---------------------------------------------------------------------------

/** Style overrides for the subtitle overlay. */
export interface SubtitleStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  activeColor?: string;
  inactiveColor?: string;
  /** CSS text-shadow outline strings. */
  outline?: string[];
  bottomOffset?: number;
  bottomOffsetWithBubble?: number;
}

/** Style overrides for keyword overlays. */
export interface KeywordStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  outline?: string[];
  topOffset?: number;
}

/** Style overrides for title and end cards. */
export interface CardStyle {
  fontFamily?: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
  titleColor?: string;
  subtitleColor?: string;
  backgroundColor?: string;
  backdropBlur?: string;
}

/** Style overrides for the end card specifically. */
export interface EndCardStyle extends CardStyle {
  ctaColor?: string;
  ctaText?: string;
  url?: string;
  urlFontFamily?: string;
}

// ---------------------------------------------------------------------------
// Inline panel overlay
// ---------------------------------------------------------------------------

/** An inline concept-explanation panel overlaid on the face without cutting away. */
export interface InlinePanel {
  /** Short title, e.g. "What is CI/CD?" */
  title: string;
  /** Bullet points or numbered steps. */
  items: string[];
  /** Layout of items. Default "bullets". */
  itemStyle?: "bullets" | "numbered";
  /** Start time in raw seconds (pre-speedup). */
  startSec: number;
  /** End time in raw seconds (pre-speedup). */
  endSec: number;
  /** Panel position on screen. Default "bottom". */
  position?: "bottom" | "bottom-right" | "center-right";
  /** Accent color for title bar (CSS color string). Default "#4ade80" (green). */
  accentColor?: string;
}

// ---------------------------------------------------------------------------
// Split-screen content
// ---------------------------------------------------------------------------

/** Content shown on the non-face side of a split-screen segment. */
export interface SplitContent {
  /** Which side the face occupies (content goes on the other side). */
  faceSide: "left" | "right";
  contentType: "image" | "bullets" | "code";
  /** Path relative to public/ for contentType "image". */
  imagePath?: string;
  /** For contentType "bullets". */
  bullets?: {
    title: string;
    items: string[];
    itemStyle?: "bullets" | "numbered";
  };
  /** For contentType "code": syntax-highlighted lines. */
  code?: {
    language: string;
    lines: string[];
  };
  /** Background color of the content panel. Default "#0d1117". */
  bgColor?: string;
  /** Accent color. Default "#4ade80". */
  accentColor?: string;
}

// ---------------------------------------------------------------------------
// Animated diagram step
// ---------------------------------------------------------------------------

/** A single step in an animated flow diagram. */
export interface DiagramStep {
  /** Short label for this step. */
  label: string;
  /** Optional detail line below the label. */
  detail?: string;
  /** Optional emoji or single character icon. */
  icon?: string;
  /** Accent color for this step's box. Default "#1a7a4a". */
  color?: string;
}
