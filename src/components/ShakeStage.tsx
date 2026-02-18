import { useEffect, useState } from "react";
import { getTrackVisual } from "../constants/tracks";
import { THEMES, type ThemeKey } from "../theme";
import type { Track } from "../types";
import TubePixel from "./TubePixel";
import TubeStationery from "./TubeStationery";

interface ShakeStageProps {
  theme: ThemeKey;
  mode: Track;
  showPop: boolean;
  onMediaComplete?: () => void;
}

export default function ShakeStage({ theme, mode, showPop, onMediaComplete }: ShakeStageProps) {
  const t = THEMES[theme];
  const visual = getTrackVisual(mode);
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const [fallbackImageIndex, setFallbackImageIndex] = useState(0);
  const activeVideoSource =
    videoSourceIndex < visual.shakeVideoSources.length ? visual.shakeVideoSources[videoSourceIndex] : null;
  const useStationeryVideo = theme === "stationery" && Boolean(activeVideoSource);
  const noFallbackImage = fallbackImageIndex >= visual.readyImageSources.length;
  const fallbackImageSrc = visual.readyImageSources[Math.min(fallbackImageIndex, visual.readyImageSources.length - 1)];

  useEffect(() => {
    setVideoSourceIndex(0);
    setFallbackImageIndex(0);
  }, [mode]);

  useEffect(() => {
    if (theme !== "stationery" || !onMediaComplete || activeVideoSource) {
      return;
    }
    const timer = window.setTimeout(onMediaComplete, 3200);
    return () => window.clearTimeout(timer);
  }, [theme, onMediaComplete, activeVideoSource]);

  return (
    <section className={`${t.panel} flex min-h-0 flex-1 flex-col`}>
      {theme === "stationery" && (
        <div className="mb-1.5 flex shrink-0 items-center justify-between gap-3 px-1">
          <p className="text-sm tracking-[0.06em]" style={{ color: visual.accent }}>
            抽签进行中
          </p>
          {useStationeryVideo && (
            <button
              type="button"
              className="h-7 rounded-lg border bg-white px-2.5 text-[11px] text-[#66584a] transition hover:bg-[#f7f1e8] active:translate-y-[1px]"
              style={{ borderColor: visual.accent }}
              onClick={onMediaComplete}
            >
              跳过视频
            </button>
          )}
        </div>
      )}
      <div className={`${t.stage} min-h-0 flex-[1.15] px-1`}>
        {theme === "pixel" && (
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(163,230,53,0.08)_1px,transparent_1px)] bg-[length:100%_22px] opacity-35" />
        )}

        <div
          className={`${
            theme === "pixel"
              ? "border border-zinc-100/15 bg-zinc-900/35 p-3"
              : "h-full w-full p-0"
          }`}
        >
          {theme === "pixel" ? (
            <TubePixel shaking />
          ) : (
            <div className="h-full w-full overflow-hidden rounded-lg bg-[#f7efe6]">
              {useStationeryVideo ? (
                <video
                  key={activeVideoSource?.src}
                  className="block h-full w-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={onMediaComplete}
                  onError={() =>
                    setVideoSourceIndex((idx) => (idx < visual.shakeVideoSources.length ? idx + 1 : idx))
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
                  className="block h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={() => setFallbackImageIndex((idx) => (idx < visual.readyImageSources.length ? idx + 1 : idx))}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <TubeStationery shaking />
                </div>
              )}
            </div>
          )}
        </div>

        {showPop && theme === "pixel" && (
          <div
            className={`pointer-events-none absolute left-1/2 top-[140px] h-24 w-5 -translate-x-1/2 animate-popUp md:top-[180px] ${
              theme === "pixel"
                ? "rounded-none border-2 border-zinc-50/60 bg-zinc-900"
                : "rounded-lg border border-[#d2bdbe]/70 bg-[#f3e8e5]"
            }`}
          />
        )}
      </div>
      {theme === "stationery" && <p className="mt-1.5 shrink-0 text-center text-xs text-[#7a6b5e]">请稍等，签文正在出现。</p>}
    </section>
  );
}
