import { useEffect, useState } from "react";
import { THEMES, type ThemeKey } from "../theme";
import { READY_IMAGE_SOURCE_LIST, SHAKE_VIDEO_SOURCE_LIST } from "../constants/shakeVideo";
import TubePixel from "./TubePixel";
import TubeStationery from "./TubeStationery";

interface ShakeStageProps {
  theme: ThemeKey;
  showPop: boolean;
  onMediaComplete?: () => void;
}

export default function ShakeStage({ theme, showPop, onMediaComplete }: ShakeStageProps) {
  const t = THEMES[theme];
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const [fallbackImageIndex, setFallbackImageIndex] = useState(0);
  const activeVideoSource =
    videoSourceIndex < SHAKE_VIDEO_SOURCE_LIST.length ? SHAKE_VIDEO_SOURCE_LIST[videoSourceIndex] : null;
  const useStationeryVideo = theme === "stationery" && Boolean(activeVideoSource);
  const noFallbackImage = fallbackImageIndex >= READY_IMAGE_SOURCE_LIST.length;
  const fallbackImageSrc = READY_IMAGE_SOURCE_LIST[Math.min(fallbackImageIndex, READY_IMAGE_SOURCE_LIST.length - 1)];

  useEffect(() => {
    if (theme !== "stationery" || !onMediaComplete || activeVideoSource) {
      return;
    }
    const timer = window.setTimeout(onMediaComplete, 3200);
    return () => window.clearTimeout(timer);
  }, [theme, onMediaComplete, activeVideoSource]);

  return (
    <section className={`${t.panel} p-5`}>
      {theme === "stationery" && (
        <div className="mb-3 text-center">
          <p className="text-xs tracking-[0.08em] text-[#7a6a5e]">抽签进行中</p>
        </div>
      )}
      <div className={`${t.stage} h-auto md:h-auto`}>
        {theme === "pixel" && (
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(163,230,53,0.08)_1px,transparent_1px)] bg-[length:100%_22px] opacity-35" />
        )}
        {theme === "stationery" && (
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(181,169,157,0.18)_1px,transparent_1px)] bg-[length:100%_32px] opacity-20" />
        )}

        <div
          className={`${
            theme === "pixel"
              ? "border border-zinc-100/15 bg-zinc-900/35 p-3"
              : "w-full rounded-2xl border border-[#d8ccbf]/70 bg-white/88 p-4 shadow-[0_8px_16px_rgba(112,99,88,0.1)]"
          }`}
        >
          {theme === "pixel" ? (
            <TubePixel shaking />
          ) : useStationeryVideo ? (
            <video
              key={activeVideoSource?.src}
              className="block h-auto w-full rounded-2xl border border-[#d4c8bc]/65 bg-[#f7efe6] object-contain shadow-[0_10px_20px_rgba(112,99,88,0.12)]"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={onMediaComplete}
              onError={() =>
                setVideoSourceIndex((idx) => (idx < SHAKE_VIDEO_SOURCE_LIST.length ? idx + 1 : idx))
              }
              aria-hidden="true"
            >
              {activeVideoSource && <source src={activeVideoSource.src} type={activeVideoSource.type} />}
            </video>
          ) : !noFallbackImage ? (
            <img
              src={fallbackImageSrc}
              alt=""
              aria-hidden="true"
              className="block h-auto w-full rounded-2xl border border-[#d4c8bc]/65 bg-[#f7efe6] object-contain shadow-[0_10px_20px_rgba(112,99,88,0.12)]"
              loading="eager"
              decoding="async"
              onError={() => setFallbackImageIndex((idx) => (idx < READY_IMAGE_SOURCE_LIST.length ? idx + 1 : idx))}
            />
          ) : (
            <TubeStationery shaking />
          )}
        </div>

        {showPop && theme === "pixel" && (
          <div
            className={`pointer-events-none absolute left-1/2 top-[140px] h-24 w-5 -translate-x-1/2 animate-popUp md:top-[180px] ${
              theme === "pixel"
                ? "rounded-none border-2 border-zinc-50/60 bg-zinc-900"
                : "rounded-full border border-[#d2bdbe]/70 bg-[#f3e8e5]"
            }`}
          />
        )}
      </div>
      {theme === "stationery" && <p className="mt-3 text-center text-xs text-[#7a6b5e]">请稍等，签文正在出现。</p>}
    </section>
  );
}
