import type { Track } from "../types";
import { withBase } from "../utils/asset";

export type ShakeVideoSource = {
  src: string;
  type: "video/webm" | "video/mp4";
};

type TrackVisualConfig = {
  emoji: string;
  name: string;
  modeLabel: string;
  pickerHint: string;
  accent: string;
  accentHover: string;
  softSurface: string;
  shadow: string;
  readyImageSources: readonly string[];
  shakeVideoSources: readonly ShakeVideoSource[];
};

const SHARED_READY_IMAGE_FALLBACK = [
  withBase("/images/cat-ready.jpg"),
  withBase("/cat-ragdoll-seal-bicolor.jpg"),
  withBase("/videos/shake-draw.webm.png")
] as const;

const SHARED_SHAKE_VIDEO_FALLBACK = [
  { src: withBase("/videos/shake-draw.mp4"), type: "video/mp4" },
  { src: withBase("/videos/shake-draw.mp4.mp4"), type: "video/mp4" },
  { src: withBase("/videos/shake-draw.webm"), type: "video/webm" }
] as const satisfies readonly ShakeVideoSource[];

export const TRACK_ORDER: readonly Track[] = ["trad", "mmm", "yesno"] as const;

export const TRACK_VISUALS: Record<Track, TrackVisualConfig> = {
  trad: {
    emoji: "🎐",
    name: "传统签",
    modeLabel: "🎐 传统签",
    pickerHint: "判断 / 时机",
    accent: "#E37970",
    accentHover: "#D66C63",
    softSurface: "#f3ddd6",
    shadow: "rgba(227,121,112,0.18)",
    readyImageSources: [
      withBase("/images/ready-trad.jpg.png"),
      withBase("/images/ready-trad.jpg"),
      withBase("/images/shake-trad.webm.png"),
      ...SHARED_READY_IMAGE_FALLBACK
    ],
    shakeVideoSources: [
      { src: withBase("/videos/shake-trad.mp4.mp4"), type: "video/mp4" },
      { src: withBase("/videos/shake-trad.mp4"), type: "video/mp4" },
      { src: withBase("/videos/shake-trad.webm"), type: "video/webm" },
      ...SHARED_SHAKE_VIDEO_FALLBACK
    ]
  },
  mmm: {
    emoji: "🧶",
    name: "随心签",
    modeLabel: "🧶 随心签",
    pickerHint: "状态 / 允许",
    accent: "#9E7A63",
    accentHover: "#8B6B56",
    softSurface: "#efe3d9",
    shadow: "rgba(158,122,99,0.18)",
    readyImageSources: [
      withBase("/images/ready-mmm.jpg.png"),
      withBase("/images/ready-mmm.jpg"),
      withBase("/images/shake-mmm.webm.png"),
      ...SHARED_READY_IMAGE_FALLBACK
    ],
    shakeVideoSources: [
      { src: withBase("/videos/shake-mmm.mp4.mp4"), type: "video/mp4" },
      { src: withBase("/videos/shake-mmm.mp4"), type: "video/mp4" },
      { src: withBase("/videos/shake-mmm.webm"), type: "video/webm" },
      ...SHARED_SHAKE_VIDEO_FALLBACK
    ]
  },
  yesno: {
    emoji: "🧭",
    name: "遇事不决签",
    modeLabel: "🧭 遇事不决签",
    pickerHint: "方向 / 决断",
    accent: "#E79A4A",
    accentHover: "#D98936",
    softSurface: "#f4e5d3",
    shadow: "rgba(231,154,74,0.18)",
    readyImageSources: [
      withBase("/images/ready-yesno.jpg.png"),
      withBase("/images/ready-yesno.jpg"),
      withBase("/images/shake-yesno.webm.png"),
      ...SHARED_READY_IMAGE_FALLBACK
    ],
    shakeVideoSources: [
      { src: withBase("/videos/shake-yesno.mp4.mp4"), type: "video/mp4" },
      { src: withBase("/videos/shake-yesno.mp4"), type: "video/mp4" },
      { src: withBase("/videos/shake-yesno.webm"), type: "video/webm" },
      ...SHARED_SHAKE_VIDEO_FALLBACK
    ]
  }
};

export function getTrackVisual(track: Track): TrackVisualConfig {
  return TRACK_VISUALS[track];
}
