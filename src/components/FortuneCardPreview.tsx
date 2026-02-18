import type { ThemeKey } from "../theme";
import { formatLunarDate, formatSolarDate, formatTimestamp, type ShareCardPayload } from "../utils/shareCard";

interface FortuneCardPreviewProps {
  theme: ThemeKey;
  payload: ShareCardPayload;
  drawAt: Date;
}

export function PixelCardPreview({ payload, drawAt }: { payload: ShareCardPayload; drawAt: Date }) {
  return (
    <div className="h-full border-2 border-lime-300/70 bg-zinc-950 p-[clamp(0.7rem,1.8dvh,1.25rem)] font-mono text-zinc-100 shadow-[0_0_0_1px_rgba(163,230,53,0.25)_inset]">
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

export function StationeryCardPreview({ payload, drawAt }: { payload: ShareCardPayload; drawAt: Date }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-[#d9cdc0]/60 px-[clamp(0.95rem,2dvh,1.8rem)] pb-[clamp(0.95rem,2.2dvh,1.8rem)] pt-[clamp(1rem,2.4dvh,2rem)] shadow-[0_12px_26px_rgba(112,99,88,0.12)]"
      style={{ background: `linear-gradient(180deg,#fdf8f2,${payload.surfaceTint})` }}
    >
      <p className="text-center text-xs tracking-[0.08em] text-[#8b7a6d]">{payload.modeLabel}</p>
      <h3
        className="mx-auto mt-2 max-w-[18ch] text-center text-[clamp(1.12rem,3dvh,1.85rem)] font-semibold tracking-tight"
        style={{ color: payload.accent }}
      >
        {payload.title}
      </h3>
      <p className="mt-2 text-center text-[11px] text-[#75685a] sm:text-xs">
        {formatLunarDate(drawAt)} · {formatSolarDate(drawAt)}
      </p>

      <div className="mx-auto mt-[clamp(0.8rem,1.9dvh,1.5rem)] max-w-[31ch] space-y-[clamp(0.45rem,1.2dvh,0.95rem)] text-center text-[clamp(0.82rem,1.85dvh,1rem)] leading-[clamp(1.35rem,2.7dvh,2.05rem)] text-[#4e4438]">
        {payload.lines.map((line, index) => (
          <p key={`${index}-${line}`}>{line}</p>
        ))}
      </div>

      <div className="mt-[clamp(0.8rem,2dvh,1.8rem)] border-t border-[#d6cabd]/75 pt-[clamp(0.45rem,1.4dvh,1rem)] text-center text-[11px] leading-relaxed text-[#75685a] sm:text-xs">
        <p>抽签时间：{formatTimestamp(drawAt)}</p>
        <p className="mt-1">{payload.source}</p>
      </div>
    </div>
  );
}

export default function FortuneCardPreview({ theme, payload, drawAt }: FortuneCardPreviewProps) {
  return theme === "pixel" ? <PixelCardPreview payload={payload} drawAt={drawAt} /> : <StationeryCardPreview payload={payload} drawAt={drawAt} />;
}
