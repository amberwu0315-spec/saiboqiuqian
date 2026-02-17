import { getTrackVisual, type ShakeVideoSource } from "./tracks";
import type { Track } from "../types";

export type { ShakeVideoSource };

export function getShakeVideoSourceList(track: Track): readonly ShakeVideoSource[] {
  return getTrackVisual(track).shakeVideoSources;
}

export function getReadyImageSourceList(track: Track): readonly string[] {
  return getTrackVisual(track).readyImageSources;
}
