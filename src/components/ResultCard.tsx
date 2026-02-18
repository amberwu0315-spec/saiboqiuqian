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
  const payload = buildShareCardPayload(result, drawAt);

  return (
    <>
      <section className={theme === "pixel" ? `${t.panel} flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-5` : "flex min-h-0 flex-1 flex-col"}>
        <div className="flex min-h-0 flex-1 items-center justify-center pt-0.5">
          <div className={theme === "pixel" ? "mx-auto w-full max-w-[260px] aspect-[9/16]" : "mx-auto w-full max-w-[500px]"}>
            <FortuneCardPreview theme={theme} payload={payload} drawAt={drawAt} />
          </div>
        </div>

        <div
          className={
            theme === "pixel"
              ? "mt-auto grid shrink-0 grid-cols-1 gap-2.5 pt-3 sm:pt-4 md:grid-cols-2"
              : "mx-auto mt-2 grid w-full max-w-[500px] shrink-0 grid-cols-1 gap-2.5 sm:mt-3 md:grid-cols-2"
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
            🔁 再抽一次
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
            🧭 玩玩别的签类型
          </button>
        </div>
      </section>
    </>
  );
}
