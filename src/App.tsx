import { useCallback, useEffect, useState } from "react";
import AboutIntentModal from "./components/AboutIntentModal";
import ModePicker from "./components/ModePicker";
import ResultCard from "./components/ResultCard";
import ShakeStage from "./components/ShakeStage";
import { getTrackVisual } from "./constants/tracks";
import { drawFortune } from "./data/fortunes";
import { THEMES, type ThemeKey } from "./theme";
import type { DrawResult, Track } from "./types";

type Step = "chooseMode" | "shaking" | "result";

function FortuneJarMark({ theme, accent }: { theme: ThemeKey; accent: string }) {
  const pixelTone = theme === "pixel" ? "text-lime-300" : "";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[1em] w-[1em] items-center justify-center text-[0.95em] leading-[1] align-middle ${pixelTone}`}
      style={theme === "stationery" ? { color: accent } : undefined}
    >
      🐱
    </span>
  );
}

export default function App() {
  const theme: ThemeKey = "stationery";
  const textureClassByTheme: Record<ThemeKey, string> = {
    pixel: "app-texture-pixel",
    stationery: "app-texture-stationery"
  };
  const [step, setStep] = useState<Step>("chooseMode");
  const [mode, setMode] = useState<Track | null>(null);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [drawAt, setDrawAt] = useState<Date | null>(null);
  const [showPop, setShowPop] = useState(false);
  const [showAboutIntent, setShowAboutIntent] = useState(false);

  const t = THEMES[theme];
  const activeAccent = getTrackVisual(mode ?? "mmm").accent;

  const startShaking = useCallback(() => {
    if (!mode || step === "shaking") {
      return;
    }

    setResult(null);
    setDrawAt(null);
    setShowPop(false);
    setStep("shaking");
  }, [mode, step]);

  const finishShaking = useCallback(() => {
    if (step !== "shaking" || !mode) {
      return;
    }
    setResult(drawFortune(mode));
    setDrawAt(new Date());
    setStep("result");
  }, [step, mode]);

  useEffect(() => {
    if (step !== "shaking" || !mode) {
      return;
    }

    setShowPop(false);

    if (theme === "stationery") {
      return;
    }

    const totalDuration = 2500 + Math.floor(Math.random() * 1001);
    const popTimer = window.setTimeout(() => {
      setShowPop(true);
    }, Math.max(totalDuration - 480, 1200));
    const finishTimer = window.setTimeout(() => {
      finishShaking();
    }, totalDuration);

    return () => {
      window.clearTimeout(popTimer);
      window.clearTimeout(finishTimer);
    };
  }, [step, mode, theme, finishShaking]);

  const handleChooseMode = (nextMode: Track): void => {
    setMode(nextMode);
    setResult(null);
    setDrawAt(null);
    setShowPop(false);
    setStep("shaking");
  };

  const handleReroll = (): void => {
    startShaking();
  };

  const handleSwitchMode = (): void => {
    setMode(null);
    setResult(null);
    setDrawAt(null);
    setShowPop(false);
    setStep("chooseMode");
  };

  return (
    <div className={`relative h-dvh overflow-hidden ${t.appBg}`}>
      <div aria-hidden="true" className={`app-texture ${textureClassByTheme[theme]}`} />
      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-2xl flex-col px-3 pt-[12px] pb-[20px] sm:px-4">
        <header
          className="relative shrink-0 overflow-hidden rounded-lg border border-[#d9cec1]/65 bg-[#fdf9f2]/92 p-2 md:p-2.5"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 12% 14%,rgba(255,255,255,0.8) 0,rgba(255,255,255,0) 42%),radial-gradient(circle at 88% 10%,${activeAccent}1f 0,rgba(255,255,255,0) 34%),repeating-linear-gradient(90deg,rgba(255,255,255,0.1) 0,rgba(255,255,255,0.1) 1px,transparent 1px,transparent 8px)`
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d7cabd]/90 to-transparent" />
          <div className="relative w-full text-center">
            <button
              type="button"
              className={`${t.title} mx-auto inline-flex items-center justify-center gap-2 border-0 bg-transparent p-0 text-current hover:brightness-95`}
              onClick={() => setShowAboutIntent(true)}
            >
              <FortuneJarMark theme={theme} accent={activeAccent} />
              <span>赛博求签（图一乐）</span>
            </button>
            <p className={`${t.sub} mt-1`}>不是为了要答案，只是想停下来想一想。</p>
            <div className="mt-1 flex items-center justify-center gap-2 text-[11px] text-[#7f6f62]">
              <span className="h-px w-8 bg-[#dacdc0]" />
              <span className="rounded-full border border-[#d8ccc0]/78 bg-white/68 px-3 py-1">慢一点，也在往前走</span>
              <span className="h-px w-8 bg-[#dacdc0]" />
            </div>
          </div>
        </header>

        <main className="mt-[20px] mb-[50px] flex min-h-0 flex-1 flex-col overflow-hidden">
          {step === "chooseMode" && <ModePicker theme={theme} onChooseMode={handleChooseMode} />}

          {step === "shaking" && mode && <ShakeStage theme={theme} mode={mode} showPop={showPop} onMediaComplete={finishShaking} />}

          {step === "result" && result && drawAt && (
            <ResultCard
              theme={theme}
              result={result}
              drawAt={drawAt}
              onReroll={handleReroll}
              onSwitchMode={handleSwitchMode}
            />
          )}
        </main>

        <footer className={`${t.footer} mt-auto shrink-0 pt-0 text-center text-[10px] leading-tight`}>勉勉强强工作室 · 勉强开业</footer>
      </div>

      <AboutIntentModal theme={theme} open={showAboutIntent} onClose={() => setShowAboutIntent(false)} />
    </div>
  );
}
