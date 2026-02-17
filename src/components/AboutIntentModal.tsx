import { useEffect } from "react";
import type { ThemeKey } from "../theme";

interface AboutIntentModalProps {
  theme: ThemeKey;
  open: boolean;
  onClose: () => void;
}

export default function AboutIntentModal({ theme, open, onClose }: AboutIntentModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-[2px]">
      <section
        className={`w-full max-w-md p-5 md:p-6 ${
          theme === "pixel"
            ? "border border-zinc-100/25 bg-zinc-950/95 text-zinc-100"
            : "rounded-2xl border border-[#d9cec1]/70 bg-[#fdf8f2] text-zinc-800 shadow-[0_14px_34px_rgba(112,99,88,0.13)] md:px-8 md:py-7"
        }`}
      >
        <h2 className={`text-base md:text-lg ${theme === "pixel" ? "font-mono text-zinc-100" : "font-medium text-[#5a4c40] md:text-xl"}`}>
          关于这个小玩意儿
        </h2>

        <div className={`mt-4 space-y-3 text-sm leading-relaxed ${theme === "pixel" ? "font-mono text-zinc-300" : "text-[#5b4f44] md:text-[15px] md:leading-8"}`}>
          <p>我做它，只是想在不确定里，有一个能停一下的时刻。</p>
          <p>很多时候我并不缺答案，我只是想被一句话轻轻接住。</p>
          <p>所以它不会替人做决定，只把那一刻认真留下来。</p>
        </div>

        <div className={`mt-6 ${theme === "pixel" ? "" : "flex justify-end"}`}>
          <button
            type="button"
            className={`h-10 text-sm active:translate-y-[1px] ${
              theme === "pixel"
                ? "w-full border border-zinc-100/30 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 font-mono"
                : "rounded-full border border-[#d8ccc0]/75 bg-white px-4 text-[#625447] hover:bg-[#f7f1e8]"
            }`}
            onClick={onClose}
          >
            关掉
          </button>
        </div>
      </section>
    </div>
  );
}
