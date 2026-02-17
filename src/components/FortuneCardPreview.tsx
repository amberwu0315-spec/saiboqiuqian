import type { ThemeKey } from "../theme";
import { formatLunarDate, formatSolarDate, formatTimestamp, type ShareCardPayload } from "../utils/shareCard";

interface FortuneCardPreviewProps {
  theme: ThemeKey;
  payload: ShareCardPayload;
  drawAt: Date;
}

export function PixelCardPreview({ payload, drawAt }: { payload: ShareCardPayload; drawAt: Date }) {
  return (
    <div className="h-full border-2 border-lime-300/70 bg-zinc-950 p-4 font-mono text-zinc-100 shadow-[0_0_0_1px_rgba(163,230,53,0.25)_inset] sm:p-5">
      <div className="inline-flex items-center border border-lime-300/70 bg-zinc-900 px-3 py-1 text-xs text-lime-200">{payload.modeLabel}</div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-lime-100 sm:text-2xl">{payload.title}</h3>
      <p className="mt-1 text-[11px] text-zinc-400 sm:text-xs">
        日期：{formatLunarDate(drawAt)} · {formatSolarDate(drawAt)}
      </p>

      <div className="mt-5 space-y-2 text-sm leading-relaxed text-zinc-100 sm:mt-6">
        {payload.lines.map((line) => (
          <p key={line} className="before:mr-2 before:text-lime-300 before:content-['>']">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-auto border-t border-zinc-700 pt-3 text-[11px] text-zinc-400 sm:text-xs">
        <p>抽签时间：{formatTimestamp(drawAt)}</p>
        <p className="mt-1">{payload.source}</p>
      </div>
    </div>
  );
}

export function StationeryCardPreview({ payload, drawAt }: { payload: ShareCardPayload; drawAt: Date }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#d9cdc0]/60 px-6 pb-6 pt-8 shadow-[0_12px_26px_rgba(112,99,88,0.12)] sm:px-8 sm:pb-8 sm:pt-9"
      style={{ background: `linear-gradient(180deg,#fdf8f2,${payload.surfaceTint})` }}
    >
      <p className="text-xs tracking-[0.08em] text-[#8b7a6d]">{payload.modeLabel}</p>
      <h3 className="mt-3 max-w-[18ch] text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: payload.accent }}>
        {payload.title}
      </h3>
      <p className="mt-2 text-[11px] text-[#75685a] sm:text-xs">
        日期：{formatLunarDate(drawAt)} · {formatSolarDate(drawAt)}
      </p>

      <div className="mt-6 max-w-[31ch] space-y-4 text-[15px] leading-[2.05] text-[#4e4438] sm:text-[16px] sm:leading-[2.08]">
        {payload.lines.map((line, index) => (
          <p key={`${index}-${line}`}>{line}</p>
        ))}
      </div>

      <div className="mt-8 border-t border-[#d6cabd]/75 pt-4 text-[11px] leading-relaxed text-[#75685a] sm:text-xs">
        <p>抽签时间：{formatTimestamp(drawAt)}</p>
        <p className="mt-1">{payload.source}</p>
      </div>
    </div>
  );
}

export default function FortuneCardPreview({ theme, payload, drawAt }: FortuneCardPreviewProps) {
  return theme === "pixel" ? <PixelCardPreview payload={payload} drawAt={drawAt} /> : <StationeryCardPreview payload={payload} drawAt={drawAt} />;
}
