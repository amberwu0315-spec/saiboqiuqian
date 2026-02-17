export type ShakeVideoSource = {
  src: string;
  type: "video/webm" | "video/mp4";
};

export const SHAKE_VIDEO_SOURCE_LIST: readonly ShakeVideoSource[] = [
  { src: "/videos/shake-draw.mp4", type: "video/mp4" },
  { src: "/videos/shake-draw.mp4.mp4", type: "video/mp4" },
  { src: "/videos/shake-draw.webm", type: "video/webm" }
] as const;

export const READY_IMAGE_SOURCE_LIST: readonly string[] = [
  "/images/cat-ready.jpg",
  "/cat-ragdoll-seal-bicolor.jpg",
  "/videos/shake-draw.webm.png"
] as const;
