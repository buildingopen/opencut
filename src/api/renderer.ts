import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { outputFile, updateJob } from "./jobs";

export interface RenderRequest {
  jobId: string;
  /** Remotion composition ID to render (e.g. "OpenSlidesDemo"). */
  compositionId: string;
  /** Entry point relative to project root (e.g. "src/examples/openslides/index.ts"). */
  entryPoint: string;
  /** Props passed into the composition — overrides its default props. */
  inputProps?: Record<string, unknown>;
}

export async function renderJob(req: RenderRequest): Promise<void> {
  const { jobId, compositionId, entryPoint, inputProps = {} } = req;

  updateJob(jobId, { status: "running" });

  try {
    const entry = path.resolve(process.cwd(), entryPoint);

    // Bundle the entry point into a local serve URL
    const serveUrl = await bundle({ entryPoint: entry });

    // Select the composition by ID (validates it exists + gets durationInFrames/fps/etc.)
    const composition = await selectComposition({
      serveUrl,
      id: compositionId,
      inputProps,
    });

    // Render to MP4
    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      outputLocation: outputFile(jobId),
      inputProps,
    });

    updateJob(jobId, { status: "done" });
  } catch (err) {
    updateJob(jobId, {
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}
