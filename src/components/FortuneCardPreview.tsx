import { useEffect, useMemo, useState } from "react";
import type { DecisionValue } from "../types";
import type { ThemeKey } from "../theme";
import { formatLunarDate, formatSolarDate, formatTimestamp, type ShareCardPayload } from "../utils/shareCard";

interface FortuneCardPreviewProps {
  theme: ThemeKey;
  payload: ShareCardPayload;
  drawAt: Date;
  stationeryLayout?: "split" | "overlay";
}

export function PixelCardPreview({ payload, drawAt }: { payload: ShareCardPayload; drawAt: Date }) {
  return (
    <div
      data-fortune-card-version="v2"
      className="h-full border-2 border-lime-300/70 bg-zinc-950 p-[clamp(0.7rem,1.8dvh,1.25rem)] font-mono text-zinc-100 shadow-[0_0_0_1px_rgba(163,230,53,0.25)_inset]"
    >
      <div className="mx-auto inline-flex items-center border border-lime-300/70 bg-zinc-900 px-3 py-1 text-xs text-lime-200">{payload.modeLabel}</div>
      <h3 className="mt-2 text-center text-[clamp(1rem,2.8dvh,1.5rem)] font-semibold tracking-tight text-lime-100">{payload.title}</h3>
      <p className="mt-1 text-center text-[11px] text-zinc-400 sm:text-xs">
        {formatLunarDate(drawAt)} · {formatSolarDate(drawAt)}
      </p>

      <div className="mt-[clamp(0.55rem,1.6dvh,1.2rem)] space-y-2 text-center text-[clamp(0.74rem,1.6dvh,0.9rem)] leading-relaxed text-zinc-100">
        {payload.lines.map((line) => (
          <p key={line}>
            {line}
          </p>
        ))}
      </div>

      <div className="mt-auto border-t border-zinc-700 pt-[clamp(0.45rem,1.4dvh,0.8rem)] text-center text-[11px] text-zinc-400 sm:text-xs">
        <p>抽签时间：{formatTimestamp(drawAt)}</p>
        <p className="mt-1">{payload.source}</p>
      </div>
    </div>
  );
}

export function StationeryCardPreview({
  payload,
  drawAt,
  layout = "split"
}: {
  payload: ShareCardPayload;
  drawAt: Date;
  layout?: "split" | "overlay";
}) {
  const isOverlayLayout = layout === "overlay";
  const [imageIndex, setImageIndex] = useState(0);
  const imageSrc = useMemo(
    () => payload.imageSources[Math.min(imageIndex, Math.max(payload.imageSources.length - 1, 0))],
    [payload.imageSources, imageIndex]
  );
  const noImage = imageIndex >= payload.imageSources.length;
  const monthLabel = drawAt.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  const dayLabel = String(drawAt.getDate()).padStart(2, "0");
  const monthFontFamily = '"Avenir Next","Helvetica Neue","PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif';
  const decisionTextByType: Record<DecisionValue, string> = {
    yes: "是",
    no: "否",
    wait: "再等等"
  };
  const typeStyleByCardType: Record<ShareCardPayload["cardType"], { patternClass: string }> = {
    traditional: {
      patternClass: "fortune-pattern-traditional"
    },
    random: {
      patternClass: "fortune-pattern-random"
    },
    decision: {
      patternClass: "fortune-pattern-decision"
    }
  };
  const typeStyle = typeStyleByCardType[payload.cardType];
  const splitTagLines = (tags: string[]): { primary: string; secondary: string } => {
    if (tags.length === 0) {
      return { primary: "无", secondary: "" };
    }
    if (tags.length === 1) {
      return { primary: tags[0], secondary: "" };
    }
    return {
      primary: tags[0],
      secondary: tags.slice(1).join(" ")
    };
  };
  const positiveText = splitTagLines(payload.positiveTags);
  const negativeText = splitTagLines(payload.negativeTags);
  const countChars = (value: string): number => Array.from(value.trim()).length;
  const longestTagChars = Math.max(
    countChars(positiveText.primary),
    countChars(positiveText.secondary),
    countChars(negativeText.primary),
    countChars(negativeText.secondary),
    1
  );
  const tagTextWidthEm = longestTagChars;
  const tagsContainerClass = "ml-auto mr-[12px] flex w-max max-w-[calc(100%-24px)] flex-col items-start gap-y-[clamp(0.95rem,2.2dvh,1.3rem)]";

  const tagRows = (
    <>
      <div className="flex w-max max-w-full items-start gap-x-[clamp(0.52rem,1.3dvh,0.8rem)]">
        <span
          className="inline-flex h-[clamp(2.35rem,5.4dvh,2.95rem)] w-[clamp(2.35rem,5.4dvh,2.95rem)] items-center justify-center rounded-full border border-[#b6aa89] text-[clamp(1.51rem,3.25dvh,2.01rem)] leading-none text-[#101010]"
        >
          宜
        </span>
        <div
          className="max-w-full pt-[2px] text-left text-[#101010]"
          style={{ width: `${tagTextWidthEm}em` }}
        >
          <p className="whitespace-nowrap text-[clamp(0.99rem,2.25dvh,1.55rem)] leading-[1.06] tracking-[0.02em]">{positiveText.primary}</p>
          {positiveText.secondary && (
            <p className="mt-[clamp(0.2rem,0.55dvh,0.34rem)] whitespace-nowrap text-[clamp(0.71rem,1.4dvh,0.99rem)] leading-[1.16] tracking-[0.08em]">{positiveText.secondary}</p>
          )}
        </div>
      </div>

      <div className="flex w-max max-w-full items-start gap-x-[clamp(0.52rem,1.3dvh,0.8rem)]">
        <span
          className="inline-flex h-[clamp(2.35rem,5.4dvh,2.95rem)] w-[clamp(2.35rem,5.4dvh,2.95rem)] items-center justify-center rounded-full border border-[#b6aa89] text-[clamp(1.51rem,3.25dvh,2.01rem)] leading-none text-[#101010]"
        >
          忌
        </span>
        <div
          className="max-w-full pt-[2px] text-left text-[#101010]"
          style={{ width: `${tagTextWidthEm}em` }}
        >
          <p className="whitespace-nowrap text-[clamp(0.99rem,2.25dvh,1.55rem)] leading-[1.06] tracking-[0.02em]">{negativeText.primary}</p>
          {negativeText.secondary && (
            <p className="mt-[clamp(0.2rem,0.55dvh,0.34rem)] whitespace-nowrap text-[clamp(0.71rem,1.4dvh,0.99rem)] leading-[1.16] tracking-[0.08em]">{negativeText.secondary}</p>
          )}
        </div>
      </div>
    </>
  );

  useEffect(() => {
    setImageIndex(0);
  }, [payload.track, payload.topLine, payload.themeWord]);

  return (
    <div
      data-fortune-card-version="v2"
      className={`relative h-full overflow-hidden rounded-[16px] border border-[#d8cdc1] ${isOverlayLayout ? "" : "flex flex-col"}`}
      style={{ background: `linear-gradient(180deg,#fffaf4 0%,#f5ede2 56%,${payload.surfaceTint} 100%)`, fontFamily: monthFontFamily }}
    >
      <div className={`relative overflow-hidden ${isOverlayLayout ? "h-full" : "min-h-0 flex-[1.6]"}`}>
        {noImage ? (
          <div className="absolute inset-0 bg-[linear-gradient(165deg,#efe6dc,#ddd1c4)]" />
        ) : (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover ${
              isOverlayLayout ? "" : "saturate-[0.56] contrast-[0.84] brightness-[0.95]"
            }`}
            loading="eager"
            decoding="async"
            onError={() => setImageIndex((idx) => (idx < payload.imageSources.length ? idx + 1 : idx))}
          />
        )}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${typeStyle.patternClass}`} />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            isOverlayLayout
              ? "bg-gradient-to-b from-white/18 via-white/20 to-white/24"
              : "bg-gradient-to-b from-black/12 via-black/[0.03] to-black/18"
          }`}
        />
        {isOverlayLayout && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#f7f4ee]/50 backdrop-blur-[1px] backdrop-saturate-60"
          />
        )}

        <p
          className={`absolute z-[2] text-[clamp(1rem,2.1dvh,1.35rem)] leading-[1.95] text-[#222] [text-orientation:mixed] [writing-mode:vertical-rl] ${
            isOverlayLayout ? "left-[10px] top-[10px] font-medium" : "left-3 top-4"
          }`}
          style={{ textShadow: "0 1px 8px rgba(255,255,255,0.45)" }}
        >
          {payload.topLine}
        </p>

        {payload.cardType === "decision" && payload.decision && (
          <span
            className={`absolute right-4 rounded-full bg-[#ffffffda] px-3 py-1 text-xs font-semibold tracking-[0.06em] text-[#3f384f] ${
              isOverlayLayout ? "bottom-[clamp(10.5rem,22dvh,13rem)]" : "bottom-[88px]"
            }`}
          >
            {decisionTextByType[payload.decision]}
          </span>
        )}

        <div
          className={`absolute z-[2] text-right text-white ${
            isOverlayLayout ? "right-[10px] top-[10px]" : "bottom-3 right-4"
          }`}
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.38)" }}
        >
          <p className="text-[clamp(1.12rem,2.9dvh,1.68rem)] font-semibold leading-none tracking-[0.14em]">{monthLabel}</p>
          <p className="mt-[clamp(0.14rem,0.4dvh,0.25rem)] text-[clamp(3rem,8.8dvh,5.1rem)] font-black leading-[0.9] tracking-[0.02em]">{dayLabel}</p>
        </div>

        {isOverlayLayout && <div className={`${tagsContainerClass} absolute bottom-[12px] right-0 z-[1]`}>{tagRows}</div>}
      </div>

      {!isOverlayLayout && (
        <div className="relative bg-[#ececec] px-0 pb-[clamp(0.95rem,2.2dvh,1.4rem)] pt-[clamp(0.9rem,2dvh,1.2rem)]">
          <div className={tagsContainerClass}>{tagRows}</div>
        </div>
      )}
    </div>
  );
}

export default function FortuneCardPreview({ theme, payload, drawAt, stationeryLayout = "split" }: FortuneCardPreviewProps) {
  return theme === "pixel" ? (
    <PixelCardPreview payload={payload} drawAt={drawAt} />
  ) : (
    <StationeryCardPreview payload={payload} drawAt={drawAt} layout={stationeryLayout} />
  );
}
