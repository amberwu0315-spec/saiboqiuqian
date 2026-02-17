import { useEffect, useRef, useState } from "react";
import FortuneCardPreview from "./FortuneCardPreview";
import type { DrawResult } from "../types";
import type { ThemeKey } from "../theme";
import { buildShareCardPayload, downloadShareCardPng } from "../utils/shareCard";

interface ShareFortuneCardProps {
  theme: ThemeKey;
  result: DrawResult;
  drawAt: Date;
  onReroll: () => void;
  onClose: () => void;
}

export default function ShareFortuneCard({ theme, result, drawAt, onReroll, onClose }: ShareFortuneCardProps) {
  const payload = buildShareCardPayload(result, drawAt);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [toastText, setToastText] = useState("");

  const handleDownload = async () => {
    if (exporting) {
      return;
    }
    try {
      setExporting(true);
      await downloadShareCardPng(payload, theme, previewRef.current);
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
            : "max-w-[560px] rounded-lg border border-[#d9cec1]/70 bg-[#fdf8f2] p-5"
        }`}
      >
        <button
          type="button"
          aria-label="关闭签图弹窗"
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-lg leading-none ${
              theme === "pixel"
                ? "border-2 border-zinc-500 bg-zinc-900 text-zinc-200 hover:border-lime-300/70 hover:text-lime-200"
              : "rounded-lg border border-[#d8ccc0]/75 bg-white text-[#6b5c4f] hover:bg-[#f7f1e8]"
          }`}
          onClick={onClose}
        >
          ✕
        </button>

        <div className="pt-8">
          <div ref={previewRef} className={theme === "pixel" ? "mx-auto w-full max-w-[340px] aspect-[9/16]" : "mx-auto w-full max-w-[500px]"}>
            <FortuneCardPreview theme={theme} payload={payload} drawAt={drawAt} />
          </div>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`h-11 text-sm font-medium active:translate-y-[1px] ${
                theme === "pixel"
                  ? "border-2 border-zinc-500 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                  : "rounded-lg border border-[#d8ccc0]/75 bg-white/92 text-[#574b3f] hover:bg-[#f7f1e8]"
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
                  : "rounded-lg border text-white hover:brightness-95"
              }`}
              style={
                theme === "pixel"
                  ? undefined
                  : {
                      borderColor: payload.accent,
                      backgroundColor: payload.accent,
                      boxShadow: `0 6px 14px ${payload.accent}33`
                    }
              }
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
