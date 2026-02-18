import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "../types";
import { getTrackVisual, TRACK_ORDER } from "../constants/tracks";
import { THEMES, type ThemeKey } from "../theme";

interface ModePickerProps {
  theme: ThemeKey;
  onChooseMode: (mode: Track) => void;
}

type ModeItem = {
  key: Track | "random";
  modeLabel: string;
  pickerHint: string;
  accent: string;
  imageSources: readonly string[];
  track: Track | null;
};

const EMPTY_IMAGE_SOURCES: readonly string[] = [];
const AUTOPLAY_MS = 2600;
const USER_INTERACTION_COOLDOWN_MS = 5000;

const RANDOM_MODE_ITEM: ModeItem = {
  key: "random",
  modeLabel: "🎲 随机签",
  pickerHint: "随机进入三种签类型之一",
  accent: "#4d83d1",
  imageSources: EMPTY_IMAGE_SOURCES,
  track: null
};

function pickRandomTrack(): Track {
  return TRACK_ORDER[Math.floor(Math.random() * TRACK_ORDER.length)];
}

function normalizeIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }
  const mod = index % length;
  return mod >= 0 ? mod : mod + length;
}

function ModeCardMedia({ sources, label, isRandom }: { sources: readonly string[]; label: string; isRandom: boolean }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const noImage = sourceIndex >= sources.length;
  const imageSrc = sources[Math.min(sourceIndex, Math.max(sources.length - 1, 0))];

  useEffect(() => {
    setSourceIndex(0);
  }, [sources]);

  if (noImage) {
    if (isRandom) {
      return (
        <div className="absolute inset-0 bg-[linear-gradient(140deg,#65b7ff,#2f6fcc)]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#eef4fb"
              fontSize="58"
              fontWeight="900"
              fontFamily="Arial Black, Arial, PingFang SC, Microsoft YaHei, sans-serif"
            >
              ?
            </text>
          </svg>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(160deg,#b4a89b,#8b8177)] text-[72px] font-semibold text-white/92">
        ？
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={`${label}静态图`}
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      decoding="async"
      onError={() => setSourceIndex((idx) => idx + 1)}
    />
  );
}

export default function ModePicker({ theme, onChooseMode }: ModePickerProps) {
  const t = THEMES[theme];
  const isPixel = theme === "pixel";
  const modeItems: ModeItem[] = [
    ...TRACK_ORDER.map((track) => {
      const visual = getTrackVisual(track);
      return {
        key: track,
        modeLabel: visual.modeLabel,
        pickerHint: visual.pickerHint,
        accent: visual.accent,
        imageSources: visual.readyImageSources,
        track
      };
    }),
    RANDOM_MODE_ITEM
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollRafRef = useRef<number | null>(null);
  const lastInteractionAtRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const markUserInteraction = useCallback((): void => {
    lastInteractionAtRef.current = Date.now();
  }, []);

  const syncActiveCard = useCallback((): void => {
    const track = trackRef.current;
    if (!track || modeItems.length === 0) {
      return;
    }

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < modeItems.length; index += 1) {
      const card = cardRefs.current[index];
      if (!card) {
        continue;
      }
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    }

    setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
  }, [modeItems.length]);

  const scrollToCard = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth"): void => {
      const track = trackRef.current;
      const nextIndex = normalizeIndex(index, modeItems.length);
      const card = cardRefs.current[nextIndex];
      if (!track || !card) {
        return;
      }

      const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetLeft), behavior });
      setActiveIndex(nextIndex);
    },
    [modeItems.length]
  );

  const handleChooseModeItem = (item: ModeItem, index: number): void => {
    markUserInteraction();
    setActiveIndex(index);
    onChooseMode(item.track ?? pickRandomTrack());
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, modeItems.length);
  }, [modeItems.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      scrollToCard(0, "auto");
    }, 80);
    return () => window.clearTimeout(timer);
  }, [scrollToCard]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (Date.now() - lastInteractionAtRef.current < USER_INTERACTION_COOLDOWN_MS) {
        return;
      }
      scrollToCard(activeIndex + 1, "smooth");
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, scrollToCard]);

  useEffect(
    () => () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    },
    []
  );

  const handleTrackScroll = (): void => {
    if (scrollRafRef.current !== null) {
      return;
    }
    scrollRafRef.current = window.requestAnimationFrame(() => {
      syncActiveCard();
      scrollRafRef.current = null;
    });
  };

  return (
    <section className="relative flex min-h-0 flex-1 flex-col justify-center px-0.5 pb-1 pt-0.5">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full ${
          isPixel
            ? "bg-[radial-gradient(circle,_rgba(132,204,22,0.18)_0%,rgba(132,204,22,0)_72%)]"
            : "bg-[radial-gradient(circle,_rgba(224,198,174,0.5)_0%,rgba(224,198,174,0)_72%)]"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-full ${
          isPixel
            ? "bg-[radial-gradient(circle,_rgba(34,211,238,0.16)_0%,rgba(34,211,238,0)_74%)]"
            : "bg-[radial-gradient(circle,_rgba(197,170,150,0.36)_0%,rgba(197,170,150,0)_74%)]"
        }`}
      />
      <div
        ref={trackRef}
        className="relative flex min-h-0 flex-1 snap-x snap-mandatory items-center gap-3 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: "calc((100% - min(62vw, 320px)) / 2)",
          paddingRight: "calc((100% - min(62vw, 320px)) / 2)"
        }}
        onScroll={handleTrackScroll}
        onPointerDown={markUserInteraction}
        onTouchStart={markUserInteraction}
        onWheel={markUserInteraction}
      >
        {modeItems.map((item, index) => {
          const isActive = activeIndex === index;
          const isRandom = item.key === "random";
          return (
            <button
              key={item.key}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              type="button"
              className={`relative h-auto w-[62vw] min-w-[170px] max-w-[320px] max-h-[45dvh] shrink-0 snap-center overflow-hidden text-left transition-all duration-500 hover:brightness-95 active:translate-y-[1px] sm:min-w-[210px] sm:max-h-[50dvh] md:w-[300px] md:max-h-[56dvh] ${
                isPixel ? `${t.mono} rounded-[12px] border-[4px]` : "rounded-[12px] border-[4px]"
              } ${isActive ? "scale-[1.01] opacity-100" : "scale-[0.95] opacity-90"}`}
              style={{
                aspectRatio: "2 / 3",
                background: isRandom ? "linear-gradient(140deg,#65b7ff,#2f6fcc)" : undefined,
                backgroundColor: isRandom ? undefined : item.accent,
                borderColor: item.accent
              }}
              onClick={() => handleChooseModeItem(item, index)}
            >
              <ModeCardMedia sources={item.imageSources} label={item.modeLabel} isRandom={isRandom} />
              <div className={`absolute inset-0 ${isPixel ? "bg-gradient-to-t from-zinc-950/36 via-zinc-950/8 to-transparent" : "bg-gradient-to-t from-black/24 via-black/5 to-transparent"}`} />
              <div
                className={`absolute inset-x-0 bottom-0 px-2.5 py-2 ${
                  isPixel ? "bg-zinc-100/86" : "bg-[#fff6ec]/84"
                }`}
              >
                <span className={`block text-xs font-semibold sm:text-sm ${isPixel ? "text-zinc-900" : "text-[#4a392d]"}`}>{item.modeLabel}</span>
                <span className={`mt-1 block text-xs ${isPixel ? "text-zinc-700" : "text-[#6c5543]"}`}>{item.pickerHint}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-1 flex shrink-0 items-center justify-center gap-2">
        {modeItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={`${item.key}-dot`}
              type="button"
              aria-label={`切换到${item.modeLabel}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-6" : "w-2.5"} ${
                isPixel ? (isActive ? "bg-lime-300" : "bg-zinc-500") : isActive ? "bg-[#9b6f4d]" : "bg-[#d2b79f]"
              }`}
              onClick={() => {
                markUserInteraction();
                scrollToCard(index, "smooth");
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
