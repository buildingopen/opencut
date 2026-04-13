import axios from "axios";
import fs from "fs";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export type VoiceId = "rachel" | "adam" | "josh" | "elli" | "bella";

// Voice IDs verified working on free tier (newer premade voices)
const VOICE_IDS: Record<VoiceId, string> = {
  rachel: "EXAVITQu4vr4xnSDxMaL", // Sarah - Mature, Reassuring (legacy rachel ID blocked on free tier)
  adam: "pNInz6obpgDQGcFmaJgB",   // Adam - Dominant, Firm
  josh: "TX3LPaxmHKxFdv7VOQHJ",   // Liam - Energetic (legacy josh ID blocked on free tier)
  elli: "cgSgspJ2msm6clMCkdW9",   // Jessica - Playful, Bright (legacy elli ID blocked on free tier)
  bella: "hpp4J3VqNfWAUOO0d1Us",  // Bella - Professional, Bright
};

export interface TtsOptions {
  text: string;
  voice?: VoiceId; // default: "rachel"
  outputPath: string; // absolute path where .mp3 is saved
  modelId?: string;
}

/**
 * Text-to-speech: tries ElevenLabs first, falls back to gTTS (Python) if
 * ElevenLabs returns a non-2xx status (e.g. 402 on free tier with library voices).
 */
export async function textToSpeech(opts: TtsOptions): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (apiKey) {
    try {
      await elevenLabsTts(opts, apiKey);
      return opts.outputPath;
    } catch (err: unknown) {
      const status =
        typeof err === "object" && err !== null && "status" in err
          ? (err as { status?: number }).status
          : undefined;
      console.warn(
        `[tts] ElevenLabs failed (${status ?? "unknown"}), falling back to gTTS`,
      );
    }
  }

  await gtts(opts.text, opts.outputPath);
  return opts.outputPath;
}

async function elevenLabsTts(opts: TtsOptions, apiKey: string): Promise<void> {
  const voice = opts.voice ?? "rachel";
  const modelId = opts.modelId ?? "eleven_turbo_v2_5";
  const voiceId = VOICE_IDS[voice];

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

  const response = await axios.post(
    url,
    {
      text: opts.text,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    },
    {
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      responseType: "stream",
    },
  );

  await new Promise<void>((resolve, reject) => {
    const writer = fs.createWriteStream(opts.outputPath);
    (response.data as NodeJS.ReadableStream).pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function gtts(text: string, outputPath: string): Promise<void> {
  const script = `
import sys
from gtts import gTTS
tts = gTTS(text=sys.argv[1], lang='en', slow=False)
tts.save(sys.argv[2])
`;
  await execFileAsync("python3", ["-c", script, text, outputPath]);
}
