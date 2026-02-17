import { useCallback, useEffect, useState } from "react";
import AboutIntentModal from "./components/AboutIntentModal";
import ModePicker from "./components/ModePicker";
import ReadyPanel from "./components/ReadyPanel";
import ResultCard from "./components/ResultCard";
import ShakeStage from "./components/ShakeStage";
import { drawFortune } from "./data/fortunes";
import { requestMotionPermission, useShake, type MotionPermissionState } from "./hooks/useShake";
import { THEMES, type ThemeKey } from "./theme";
import type { DrawResult, Track } from "./types";

type Step = "chooseMode" | "ready" | "shaking" | "result";

function modeLabel(mode: Track): string {
  return mode === "trad" ? "🎐 传统签" : "🧶 勉勉强强签";
}

function FortuneJarMark({ theme }: { theme: ThemeKey }) {
  const tone = theme === "pixel" ? "text-lime-300" : "text-[#ff3b30]";
  return <span aria-hidden="true" className={`inline-flex text-[0.95em] leading-none ${tone}`}>🐱</span>;
}

export default function App() {
  const theme: ThemeKey = "stationery";
  const [step, setStep] = useState<Step>("chooseMode");
  const [mode, setMode] = useState<Track | null>(null);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [drawAt, setDrawAt] = useState<Date | null>(null);
  const [showPop, setShowPop] = useState(false);
  const [showAboutIntent, setShowAboutIntent] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [permState, setPermState] = useState<MotionPermissionState>("unknown");

  const t = THEMES[theme];

  const startShaking = useCallback(() => {
    if (!mode || step === "shaking") {
      return;
    }

    setResult(null);
    setDrawAt(null);
    setShowPop(false);
    setStep("shaking");
  }, [mode, step]);

  const { supported } = useShake({
    enabled: step === "ready" && motionEnabled,
    cooldownMs: 1200,
    threshold: 16,
    onShake: startShaking
  });

  useEffect(() => {
    if (!supported) {
      setPermState("unsupported");
      return;
    }

    const anyMotion = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
    if (!anyMotion.requestPermission) {
      setPermState("unsupported");
      setMotionEnabled(true);
    }
  }, [supported]);

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
    setStep("ready");
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

  const enableShake = async (): Promise<void> => {
    const permission = await requestMotionPermission();
    if (permission === "granted") {
      setPermState("granted");
      setMotionEnabled(true);
      return;
    }
    if (permission === "unsupported") {
      setPermState("unsupported");
      setMotionEnabled(true);
      return;
    }
    setPermState("denied");
    setMotionEnabled(false);
  };

  return (
    <div className={`min-h-dvh ${t.appBg}`}>
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6 md:gap-5 md:py-10">
        <header
          className="flex items-start justify-between gap-3 rounded-2xl border border-[#d9cec1]/65 bg-[#fdf9f2]/92 p-3 md:p-4"
        >
          <div>
            <h1 className={`${t.title} inline-flex items-baseline gap-2`}>
              <FortuneJarMark theme={theme} />
              <span>赛博求签</span>
            </h1>
            <p className={t.sub}>抽一支签，继续今天。</p>
            <button
              type="button"
              className="mt-1 text-xs text-[#ff3b30] hover:text-[#d63027]"
              onClick={() => setShowAboutIntent(true)}
            >
              如果你好奇
            </button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 md:gap-5">
          {step === "chooseMode" && <ModePicker theme={theme} onChooseMode={handleChooseMode} />}

          {step === "ready" && mode && (
            <ReadyPanel
              theme={theme}
              modeLabel={modeLabel(mode)}
              supported={supported}
              motionEnabled={motionEnabled}
              permState={permState}
              onClickDraw={startShaking}
              onEnableShake={enableShake}
              onSwitchMode={handleSwitchMode}
            />
          )}

          {step === "shaking" && mode && <ShakeStage theme={theme} showPop={showPop} onMediaComplete={finishShaking} />}

          {step === "result" && result && drawAt && (
            <ResultCard theme={theme} result={result} drawAt={drawAt} onReroll={handleReroll} onSwitchMode={handleSwitchMode} />
          )}
        </main>

        <footer className={`${t.footer} text-center`}>勉勉强强工作室 · 勉强开业</footer>
      </div>

      <AboutIntentModal theme={theme} open={showAboutIntent} onClose={() => setShowAboutIntent(false)} />
    </div>
  );
}
