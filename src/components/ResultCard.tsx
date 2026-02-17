import { useEffect, useRef, useState } from "react";
import FortuneCardPreview from "./FortuneCardPreview";
import ShareFortuneCard from "./ShareFortuneCard";
import type { DrawResult } from "../types";
import { THEMES, type ThemeKey } from "../theme";
import { buildShareCardPayload, downloadShareCardPng } from "../utils/shareCard";

interface ResultCardProps {
  theme: ThemeKey;
  result: DrawResult;
  drawAt: Date;
  onReroll: () => void;
  onSwitchMode: () => void;
}

export default function ResultCard({ theme, result, drawAt, onReroll, onSwitchMode }: ResultCardProps) {
  const t = THEMES[theme];
  const payload = buildShareCardPayload(result, drawAt);
  const previewRef = useRef<HTMLDivElement>(null);
  const [showShareCard, setShowShareCard] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    setShowShareCard(true);
  }, [result, drawAt]);

  useEffect(() => {
    if (!toastText) {
      return;
    }
    const timer = window.setTimeout(() => setToastText(""), 1500);
    return () => window.clearTimeout(timer);
  }, [toastText]);

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

  return (
    <>
      <section className={`${t.panel} flex min-h-[440px] flex-col p-4 md:p-5`}>
        <div className="pt-1">
          <div ref={previewRef} className={theme === "pixel" ? "mx-auto w-full max-w-[340px] aspect-[9/16]" : "mx-auto w-full max-w-[500px]"}>
            <FortuneCardPreview theme={theme} payload={payload} drawAt={drawAt} />
          </div>
        </div>

        <div
          className={
            theme === "pixel"
              ? "mt-auto grid grid-cols-1 gap-3 pt-5 md:grid-cols-3"
              : "mt-4 grid grid-cols-1 gap-3 md:grid-cols-3"
          }
        >
          <button
            type="button"
            className={`${
              theme === "pixel"
                ? `${t.btnPrimary} ${t.mono}`
                : "h-10 rounded-lg border text-white transition hover:brightness-95 active:translate-y-[1px]"
            } px-4 text-sm md:text-base`}
            style={
              theme === "pixel"
                ? undefined
                : {
                    borderColor: payload.accent,
                    backgroundColor: payload.accent,
                    boxShadow: `0 6px 14px ${payload.accent}33`
                  }
            }
            onClick={onReroll}
          >
            再抽一次
          </button>
          <button
            type="button"
            className={`${
              theme === "pixel"
                ? `${t.btnSecondary} ${t.mono}`
                : "h-10 rounded-lg border border-[#d8ccc0]/80 bg-white/92 text-[#5b4e41] transition hover:bg-[#f7f1e8] active:translate-y-[1px]"
            } px-4 text-sm md:text-base`}
            onClick={onSwitchMode}
          >
            玩玩别的签类型
          </button>
          <button
            type="button"
            className={`${
              theme === "pixel"
                ? `${t.btnSecondary} ${t.mono}`
                : "h-10 rounded-lg border border-[#d8ccc0]/80 bg-white/92 text-[#5b4e41] transition hover:bg-[#f7f1e8] active:translate-y-[1px]"
            } px-4 text-sm md:text-base`}
            onClick={handleDownload}
            disabled={exporting}
          >
            {exporting ? "保存中…" : "保存至相册"}
          </button>
        </div>
      </section>

      {showShareCard && (
        <ShareFortuneCard theme={theme} result={result} drawAt={drawAt} onReroll={onReroll} onClose={() => setShowShareCard(false)} />
      )}

      {toastText && (
        <div
          className={`pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 px-3 py-2 text-xs ${
            theme === "pixel"
              ? "border border-lime-300/70 bg-zinc-950 font-mono text-lime-200"
              : "rounded-lg border border-[#d8ccc0]/78 bg-[#fdf8f2] text-[#67594b] shadow-sm"
          }`}
        >
          {toastText}
        </div>
      )}
    </>
  );
}
