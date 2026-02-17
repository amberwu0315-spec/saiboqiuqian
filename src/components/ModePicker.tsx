import type { Track } from "../types";
import { getTrackVisual, TRACK_ORDER } from "../constants/tracks";
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
        <div className="grid grid-cols-1 gap-3">
          {TRACK_ORDER.map((track) => {
            const visual = getTrackVisual(track);
            return (
              <button
                key={track}
                type="button"
                className={`${t.btnSecondary} ${t.mono} h-auto w-full px-4 py-3 text-center`}
                onClick={() => onChooseMode(track)}
              >
                <span className="block text-sm md:text-base">{visual.modeLabel}</span>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className={`${t.panel} p-4 md:p-5`}>
      <div className="grid grid-cols-1 gap-3">
        {TRACK_ORDER.map((track) => {
          const visual = getTrackVisual(track);
          return (
              <button
                key={track}
                type="button"
                className="h-auto w-full rounded-lg px-4 py-3 text-left text-white transition hover:brightness-95 active:translate-y-[1px]"
                style={{
                  backgroundColor: visual.accent,
                  boxShadow: `0 10px 20px ${visual.shadow}`
              }}
              onClick={() => onChooseMode(track)}
            >
              <span className="block text-sm font-medium md:text-base">
                {visual.modeLabel}
              </span>
              <span className="mt-1 block text-xs text-white/88">{visual.pickerHint}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
