import { useEffect, useState } from "react";
import type { DrawResult } from "../types";
import type { ThemeKey } from "../theme";
import { buildShareCardPayload, downloadShareCardPng, formatLunarDate, formatSolarDate, formatTimestamp } from "../utils/shareCard";
import { CAT_BG_IMAGE_PATH } from "../constants/catBackground";

interface ShareFortuneCardProps {
  theme: ThemeKey;
  result: DrawResult;
  drawAt: Date;
  onReroll: () => void;
  onClose: () => void;
}

function PixelCardPreview({ payload, drawAt }: { payload: ReturnType<typeof buildShareCardPayload>; drawAt: Date }) {
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

function StationeryCardPreview({ payload, drawAt }: { payload: ReturnType<typeof buildShareCardPayload>; drawAt: Date }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#d9cdc0]/60 bg-[linear-gradient(180deg,#fdf8f2,#f1e8de)] px-6 pb-6 pt-8 shadow-[0_12px_26px_rgba(112,99,88,0.12)] sm:px-8 sm:pb-8 sm:pt-9">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.13] [filter:saturate(0.28)_contrast(0.76)_blur(2.8px)] [mix-blend-mode:multiply]"
        style={{ backgroundImage: `url(${CAT_BG_IMAGE_PATH})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,244,0.9),rgba(250,241,229,0.88))]" />
      <div
        className="absolute bottom-[-12%] right-[-22%] h-[70%] w-[70%] bg-cover bg-center opacity-[0.12] [filter:saturate(0.24)_contrast(0.74)_blur(4px)] [mix-blend-mode:multiply]"
        style={{ backgroundImage: `url(${CAT_BG_IMAGE_PATH})` }}
      />

      <p className="relative text-xs tracking-[0.08em] text-[#8b7a6d]">{payload.modeLabel}</p>
      <h3 className="relative mt-3 max-w-[18ch] text-2xl font-semibold tracking-tight text-[#ff3b30] sm:text-3xl">{payload.title}</h3>
      <p className="relative mt-2 text-[11px] text-[#75685a] sm:text-xs">
        日期：{formatLunarDate(drawAt)} · {formatSolarDate(drawAt)}
      </p>

      <div className="relative mt-6 max-w-[31ch] space-y-4 text-[15px] leading-[2.05] text-[#4e4438] sm:text-[16px] sm:leading-[2.08]">
        {payload.lines.map((line, index) => (
          <p key={`${index}-${line}`}>{line}</p>
        ))}
      </div>

      <div className="relative mt-8 border-t border-[#d6cabd]/75 pt-4 text-[11px] leading-relaxed text-[#75685a] sm:text-xs">
        <p>抽签时间：{formatTimestamp(drawAt)}</p>
        <p className="mt-1">{payload.source}</p>
      </div>
    </div>
  );
}

export default function ShareFortuneCard({ theme, result, drawAt, onReroll, onClose }: ShareFortuneCardProps) {
  const payload = buildShareCardPayload(result, drawAt);
  const [exporting, setExporting] = useState(false);
  const [toastText, setToastText] = useState("");

  const handleDownload = async () => {
    if (exporting) {
      return;
    }
    try {
      setExporting(true);
      await downloadShareCardPng(payload, theme);
      setToastText("已保存到下载列表");
    } catch {
      setToastText("保存失败，请重试");
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (!toastText) {
      return;
    }
    const timer = window.setTimeout(() => setToastText(""), 1500);
    return () => window.clearTimeout(timer);
  }, [toastText]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-[2px]">
      <div
        className={`relative w-full shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${
          theme === "pixel"
            ? "max-w-[440px] border-2 border-lime-300/70 bg-zinc-950 p-4 shadow-[0_0_0_1px_rgba(163,230,53,0.25)_inset,0_18px_40px_rgba(0,0,0,0.45)]"
            : "max-w-[560px] rounded-2xl border border-[#d9cec1]/70 bg-[#fdf8f2] p-5"
        }`}
      >
        <button
          type="button"
          aria-label="关闭签图弹窗"
            className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-lg leading-none ${
              theme === "pixel"
                ? "border-2 border-zinc-500 bg-zinc-900 text-zinc-200 hover:border-lime-300/70 hover:text-lime-200"
                : "rounded-full border border-[#d8ccc0]/75 bg-white text-[#6b5c4f] hover:bg-[#f7f1e8]"
            }`}
          onClick={onClose}
        >
          ✕
        </button>

        <div className="pt-8">
          <div className={theme === "pixel" ? "mx-auto w-full max-w-[340px] aspect-[9/16]" : "mx-auto w-full max-w-[500px]"}>
            {theme === "pixel" ? <PixelCardPreview payload={payload} drawAt={drawAt} /> : <StationeryCardPreview payload={payload} drawAt={drawAt} />}
          </div>
        </div>

        <div className={theme === "pixel" ? "mt-4" : "mt-4 rounded-xl border border-[#d8ccc0]/75 bg-[#f8f1e8] p-3"}>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`h-11 text-sm font-medium active:translate-y-[1px] ${
                theme === "pixel"
                  ? "border-2 border-zinc-500 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                  : "rounded-xl border border-[#d8ccc0]/75 bg-white/92 text-[#574b3f] hover:bg-[#f7f1e8]"
              }`}
              onClick={onReroll}
            >
              再抽一次
            </button>
            <button
              type="button"
              className={`h-11 text-sm font-medium active:translate-y-[1px] ${
                theme === "pixel"
                  ? "border-2 border-lime-300/75 bg-zinc-950 text-lime-200 hover:bg-zinc-900"
                  : "rounded-xl border border-[#ff3b30]/80 bg-[#ff3b30] text-white hover:bg-[#e4372d]"
              }`}
              onClick={handleDownload}
              disabled={exporting}
            >
              {exporting ? "保存中…" : "保存至相册"}
            </button>
          </div>
        </div>
      </div>

      {toastText && (
        <div
          className={`pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 px-3 py-2 text-xs ${
            theme === "pixel"
              ? "border border-lime-300/70 bg-zinc-950 text-lime-200 font-mono"
              : "rounded-lg border border-[#d8ccc0]/78 bg-[#fdf8f2] text-[#67594b] shadow-sm"
          }`}
        >
          {toastText}
        </div>
      )}
    </div>
  );
}
