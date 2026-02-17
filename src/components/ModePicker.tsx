import type { Track } from "../types";
import { THEMES, type ThemeKey } from "../theme";

interface ModePickerProps {
  theme: ThemeKey;
  onChooseMode: (mode: Track) => void;
}

export default function ModePicker({ theme, onChooseMode }: ModePickerProps) {
  const t = THEMES[theme];

  if (theme === "pixel") {
    return (
      <section className={`${t.panel} p-4 md:p-5`}>
        <p className={`text-sm text-zinc-200 md:text-base ${t.mono}`}>今天，你想用哪种方式面对不确定？</p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            type="button"
            className={`${t.btnSecondary} ${t.mono} h-auto w-full px-4 py-3 text-center`}
            onClick={() => onChooseMode("trad")}
          >
            <span className="block text-sm md:text-base">🎐 传统签</span>
          </button>
          <button
            type="button"
            className={`${t.btnSecondary} ${t.mono} h-auto w-full px-4 py-3 text-center`}
            onClick={() => onChooseMode("mmm")}
          >
            <span className="block text-sm md:text-base">🧶 勉勉强强签</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`${t.panel} p-4 md:p-5`}>
      <p className="text-xs tracking-[0.08em] text-[#7a6a5d]">选择签类型</p>
      <p className="mt-2 text-sm text-[#54493e] md:text-base">先做一个选择，然后开始。</p>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          type="button"
          className="h-auto w-full rounded-xl border border-[#ff3b30]/65 bg-[#ff3b30] px-4 py-3 text-left text-white shadow-[0_10px_20px_rgba(255,59,48,0.2)] transition hover:bg-[#e4372d] active:translate-y-[1px]"
          onClick={() => onChooseMode("trad")}
        >
          <span className="block text-sm font-medium md:text-base">🎐 传统签</span>
          <span className="mt-1 block text-xs text-white/85">古风表达，偏含蓄</span>
        </button>
        <button
          type="button"
          className="h-auto w-full rounded-xl border border-[#ff3b30]/55 bg-[#ff3b30]/88 px-4 py-3 text-left text-white shadow-[0_10px_20px_rgba(255,59,48,0.18)] transition hover:bg-[#e4372d] active:translate-y-[1px]"
          onClick={() => onChooseMode("mmm")}
        >
          <span className="block text-sm font-medium md:text-base">🧶 勉勉强强签</span>
          <span className="mt-1 block text-xs text-white/85">更直接，偏日常</span>
        </button>
      </div>
    </section>
  );
}
