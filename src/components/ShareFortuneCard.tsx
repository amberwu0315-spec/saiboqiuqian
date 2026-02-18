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
  captureOnly?: boolean;
  autoCaptureToken?: number;
  onAutoCaptureDone?: (success: boolean) => void;
}

export default function ShareFortuneCard({
  theme,
  result,
  drawAt,
  onReroll,
  onClose,
  captureOnly = false,
  autoCaptureToken,
  onAutoCaptureDone
}: ShareFortuneCardProps) {
  const payload = buildShareCardPayload(result, drawAt);
  const previewRef = useRef<HTMLDivElement>(null);
  const lastAutoCaptureTokenRef = useRef<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [toastText, setToastText] = useState("");
  const isAutoCaptureMode = autoCaptureToken !== undefined;

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
    if (!isAutoCaptureMode || autoCaptureToken === undefined) {
      return;
    }
    if (lastAutoCaptureTokenRef.current === autoCaptureToken) {
      return;
    }
    lastAutoCaptureTokenRef.current = autoCaptureToken;

    let cancelled = false;
    const run = async () => {
      try {
        setExporting(true);
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => resolve());
        });
        await downloadShareCardPng(payload, theme, previewRef.current);
        if (!cancelled) {
          onAutoCaptureDone?.(true);
        }
      } catch {
        if (!cancelled) {
          onAutoCaptureDone?.(false);
        }
      } finally {
        if (!cancelled) {
          setExporting(false);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [autoCaptureToken, isAutoCaptureMode, onAutoCaptureDone, payload, theme]);

  useEffect(() => {
    if (!toastText) {
      return;
    }
    const timer = window.setTimeout(() => setToastText(""), 1500);
    return () => window.clearTimeout(timer);
  }, [toastText]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-[2px]">
      <div className="w-full max-w-[560px]">
        <div className="relative mx-auto w-full max-w-[360px] aspect-[9/16]">
          {!captureOnly && (
            <button
              type="button"
              aria-label="关闭签图弹窗"
              className={`absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center text-lg leading-none ${
                theme === "pixel"
                  ? "border-2 border-white/90 bg-zinc-900/70 text-white hover:bg-zinc-800/80"
                  : "rounded-lg border-2 border-white/90 bg-black/20 text-white hover:bg-black/35"
              }`}
              onClick={onClose}
            >
              ✕
            </button>
          )}
          <div ref={previewRef} className="h-full w-full">
            <FortuneCardPreview theme={theme} payload={payload} drawAt={drawAt} />
          </div>
        </div>

        {!captureOnly && (
          <div className="mx-auto mt-3 grid w-full max-w-[360px] grid-cols-2 gap-2">
            <button
              type="button"
              className={`h-11 text-sm font-medium active:translate-y-[1px] ${
                theme === "pixel"
                  ? "border-2 border-white/85 bg-transparent text-white hover:bg-white/10"
                  : "rounded-lg border-2 border-white/90 bg-transparent text-white hover:bg-white/10"
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
              {exporting ? "保存中…" : "💾 保存至相册"}
            </button>
          </div>
        )}
      </div>

      {toastText && !captureOnly && (
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
