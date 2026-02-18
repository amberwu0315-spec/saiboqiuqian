import { useMemo } from "react";
import FortuneCardPreview from "./FortuneCardPreview";
import type { DrawResult } from "../types";
import { THEMES, type ThemeKey } from "../theme";
import { buildShareCardPayload } from "../utils/shareCard";

interface ResultCardProps {
  theme: ThemeKey;
  result: DrawResult;
  drawAt: Date;
  onReroll: () => void;
  onSwitchMode: () => void;
}

export default function ResultCard({ theme, result, drawAt, onReroll, onSwitchMode }: ResultCardProps) {
  const t = THEMES[theme];
  const payload = useMemo(() => buildShareCardPayload(result, drawAt), [result, drawAt]);

  return (
    <section className={theme === "pixel" ? `${t.panel} flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-5` : "flex min-h-0 flex-1 flex-col"}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="h-full w-full min-w-0">
          <FortuneCardPreview theme={theme} payload={payload} drawAt={drawAt} stationeryLayout="split" />
        </div>
      </div>

      <div
        className={
          theme === "pixel"
            ? "mt-auto grid w-full shrink-0 grid-cols-2 gap-2 pt-3"
            : "mt-3 grid w-full shrink-0 grid-cols-2 gap-2"
        }
      >
        <button
          type="button"
          className={`${
            theme === "pixel"
              ? `${t.btnSecondary} ${t.mono} border-2`
              : "h-10 rounded-lg border-2 border-[#d8ccc0]/85 bg-transparent text-[#5b4e41] transition hover:bg-[#f7f1e8] active:translate-y-[1px]"
          } whitespace-nowrap px-4 text-sm md:text-base`}
          onClick={onSwitchMode}
        >
          🧭 玩玩别的签类型
        </button>
        <button
          type="button"
          className={`${
            theme === "pixel"
              ? `${t.btnPrimary} ${t.mono}`
              : "h-10 rounded-lg border text-white transition hover:brightness-95 active:translate-y-[1px]"
          } whitespace-nowrap px-4 text-sm md:text-base`}
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
          🔁 再抽一次
        </button>
      </div>
    </section>
  );
}
