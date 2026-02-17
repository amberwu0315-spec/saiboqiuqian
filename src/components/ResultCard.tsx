import { useEffect, useState } from "react";
import ShareFortuneCard from "./ShareFortuneCard";
import type { DrawResult } from "../types";
import { THEMES, type ThemeKey } from "../theme";
import { CAT_BG_IMAGE_PATH } from "../constants/catBackground";

const STUDIO_MOTTO = "【勉强的勉是共勉的勉，勉强的强是自强的强】";

interface ResultCardProps {
  theme: ThemeKey;
  result: DrawResult;
  drawAt: Date;
  onReroll: () => void;
  onSwitchMode: () => void;
}

function PixelResultView({ result }: { result: DrawResult }) {
  const title = result.track === "trad" ? `【传统签】第 ${result.fortune.id} 签 · ${result.fortune.level}` : `【勉勉强强签】${result.fortune.name}`;
  const lines =
    result.track === "trad"
      ? [...result.fortune.text, `解：${result.fortune.explain}`, `断：${result.fortune.judge}`]
      : [result.fortune.text, result.fortune.note];
  const extra = result.track === "trad" ? `🐱 ${STUDIO_MOTTO}` : result.fortune.disclaimer;

  return (
    <div className="border border-zinc-100/20 bg-zinc-950/70 p-4 md:p-5">
      <div className="font-mono text-lg font-bold tracking-tight text-lime-100 md:text-xl">{title}</div>

      <div className="mt-3 space-y-2 font-mono text-sm leading-relaxed text-zinc-100 md:text-base">
        {lines.map((line) => (
          <p key={line} className="before:mr-2 before:content-['>']">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-4 border-t-2 border-zinc-50/20 pt-3 font-mono text-xs text-zinc-300">{extra}</div>
    </div>
  );
}

function StationeryResultView({ result }: { result: DrawResult }) {
  const meta = result.track === "trad" ? "传统签" : "勉勉强强签";
  const title = result.track === "trad" ? `第 ${result.fortune.id} 签 · ${result.fortune.level}` : result.fortune.name;
  const lines =
    result.track === "trad"
      ? [...result.fortune.text, `解：${result.fortune.explain}`, `断：${result.fortune.judge}`]
      : [result.fortune.text, result.fortune.note];
  const extra = result.track === "trad" ? `🐱 ${STUDIO_MOTTO}` : result.fortune.disclaimer;

  return (
    <div className="relative px-6 pb-3 pt-7 md:px-8 md:pb-4 md:pt-8">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.1] [filter:saturate(0.26)_contrast(0.78)_blur(2.8px)] [mix-blend-mode:multiply]"
        style={{ backgroundImage: `url(${CAT_BG_IMAGE_PATH})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,244,0.88),rgba(250,241,229,0.84))]" />
      <div
        className="absolute bottom-[-10%] right-[-16%] h-[64%] w-[64%] bg-cover bg-center opacity-[0.1] [filter:saturate(0.24)_contrast(0.76)_blur(4px)] [mix-blend-mode:multiply]"
        style={{ backgroundImage: `url(${CAT_BG_IMAGE_PATH})` }}
      />

      <div className="relative">
        <p className="text-xs tracking-[0.08em] text-[#8b7a6d]">{meta}</p>
        <div className="mt-3 text-2xl font-semibold tracking-tight text-[#ff3b30] md:text-3xl">{title}</div>

        <div className="mt-6 space-y-4 text-[15px] leading-[2.05] text-[#4e4438] md:text-[17px] md:leading-[2.1]">
          {lines.map((line, index) => (
            <p key={`${index}-${line}`}>{line}</p>
          ))}
        </div>

        <div className="mt-8 border-t border-[#d6cabd]/75 pt-4 text-xs leading-relaxed text-[#6b5d51]">{extra}</div>
      </div>
    </div>
  );
}

export default function ResultCard({ theme, result, drawAt, onReroll, onSwitchMode }: ResultCardProps) {
  const t = THEMES[theme];
  const [showShareCard, setShowShareCard] = useState(true);

  useEffect(() => {
    setShowShareCard(true);
  }, [result, drawAt]);

  return (
    <>
      <section className={`${t.panel} flex min-h-[440px] flex-col p-4 md:p-5`}>
        {theme === "pixel" ? <PixelResultView result={result} /> : <StationeryResultView result={result} />}

        <div
          className={
            theme === "pixel"
              ? "mt-auto grid grid-cols-1 gap-3 pt-5 md:grid-cols-2"
              : "mt-4 grid grid-cols-1 gap-3 rounded-xl border border-[#d8ccc0]/75 bg-[#f8f1e8] p-3 md:grid-cols-2"
          }
        >
          <button
            type="button"
            className={`${
              theme === "pixel"
                ? `${t.btnSecondary} ${t.mono}`
                : "h-10 rounded-lg border border-[#d8ccc0]/80 bg-white/92 text-[#5b4e41] transition hover:bg-[#f7f1e8] active:translate-y-[1px]"
            } px-4 text-sm md:text-base`}
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
            换类型
          </button>
        </div>
      </section>

      {showShareCard && (
        <ShareFortuneCard theme={theme} result={result} drawAt={drawAt} onReroll={onReroll} onClose={() => setShowShareCard(false)} />
      )}
    </>
  );
}
