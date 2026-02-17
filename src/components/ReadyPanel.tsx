import { useState } from "react";
import { THEMES, type ThemeKey } from "../theme";
import { READY_IMAGE_SOURCE_LIST } from "../constants/shakeVideo";
import TubePixel from "./TubePixel";
import TubeStationery from "./TubeStationery";

interface ReadyPanelProps {
  theme: ThemeKey;
  modeLabel: string;
  supported: boolean;
  motionEnabled: boolean;
  permState: "unknown" | "granted" | "denied" | "unsupported";
  onClickDraw: () => void;
  onEnableShake: () => void;
  onSwitchMode: () => void;
}

export default function ReadyPanel({
  theme,
  modeLabel,
  supported,
  motionEnabled,
  permState,
  onClickDraw,
  onEnableShake,
  onSwitchMode
}: ReadyPanelProps) {
  const t = THEMES[theme];
  const canEnableShake = supported && !motionEnabled;
  const [readyImageIndex, setReadyImageIndex] = useState(0);
  const noReadyImage = readyImageIndex >= READY_IMAGE_SOURCE_LIST.length;
  const readyImageSrc = READY_IMAGE_SOURCE_LIST[Math.min(readyImageIndex, READY_IMAGE_SOURCE_LIST.length - 1)];

  const handleShakeTap = () => {
    if (canEnableShake) {
      onEnableShake();
    }
  };

  if (theme === "pixel") {
    return (
      <section className={`${t.panel} flex min-h-[540px] flex-col p-4 md:p-5`}>
        <div className="inline-flex w-fit items-center border border-zinc-500 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
          <span className={t.mono}>{modeLabel}</span>
        </div>

        <div className={`mt-5 ${t.stage}`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(163,230,53,0.08)_1px,transparent_1px)] bg-[length:100%_22px] opacity-30" />
          <div className="relative border border-zinc-100/15 bg-zinc-900/35 p-3">
            <TubePixel shaking={false} />
            <button
              type="button"
              className={`absolute left-1/2 top-1/2 h-10 -translate-x-1/2 -translate-y-1/2 px-4 text-sm ${
                canEnableShake
                  ? "border border-lime-300/75 bg-zinc-950 text-lime-200 hover:bg-zinc-900"
                  : "border border-zinc-500 bg-zinc-900 text-zinc-300"
              } ${t.mono}`}
              onClick={handleShakeTap}
            >
              摇一摇
            </button>
          </div>
        </div>

        {permState === "denied" && <p className="mt-3 text-xs text-zinc-400">未获得动作权限，可直接开始抽签。</p>}
        {!supported && <p className="mt-3 text-xs text-zinc-400">当前设备不支持摇一摇，可直接开始抽签。</p>}

        <div className="mt-auto grid grid-cols-1 gap-3 pt-5">
          <button type="button" className={`${t.btnSecondary} ${t.mono} px-4 text-sm md:text-base`} onClick={onClickDraw}>
            🎴 开始抽签
          </button>
          <button type="button" className={`${t.btnSecondary} ${t.mono} px-4 text-sm md:text-base`} onClick={onSwitchMode}>
            🔁 换一种类型
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`${t.panel} flex min-h-[540px] flex-col p-5`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.08em] text-[#7a6a5d]">准备抽签</p>
        <div className="inline-flex w-fit items-center rounded-full border border-[#d8ccc0]/70 bg-white/92 px-3 py-1 text-xs text-[#645748]">
          {modeLabel}
        </div>
      </div>
      <p className="mt-2 text-sm text-[#5c4f43]">选好类型后，直接开始就好。</p>

      <div className={`mt-5 ${t.stage} h-auto md:h-auto`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(181,169,157,0.18)_1px,transparent_1px)] bg-[length:100%_32px] opacity-20" />
        <div className="relative w-full p-2 md:p-3">
          {noReadyImage ? (
            <div className="flex min-h-[240px] w-full items-center justify-center bg-[#f4ece2]">
              <TubeStationery shaking={false} />
            </div>
          ) : (
            <img
              src={readyImageSrc}
              alt=""
              aria-hidden="true"
              className="block h-auto w-full rounded-2xl border border-[#d9cdc0]/70 bg-[#f7efe6] object-contain shadow-[0_10px_18px_rgba(112,99,88,0.12)]"
              loading="eager"
              decoding="async"
              onError={() => setReadyImageIndex((idx) => (idx < READY_IMAGE_SOURCE_LIST.length ? idx + 1 : idx))}
            />
          )}
        </div>
      </div>

      {canEnableShake && (
        <button
          type="button"
          className="mt-3 h-10 w-fit self-center rounded-full border border-[#d8ccc0]/75 bg-white/92 px-4 text-xs text-[#66584a] transition hover:bg-[#f7f1e8] active:translate-y-[1px]"
          onClick={handleShakeTap}
        >
          启用摇一摇（可选）
        </button>
      )}

      {permState === "denied" && <p className="mt-3 text-xs text-[#6d5e51]">未获得动作权限，可直接开始抽签。</p>}
      {!supported && <p className="mt-3 text-xs text-[#6d5e51]">当前设备不支持摇一摇，可直接开始抽签。</p>}

      <div className="mt-auto grid grid-cols-1 gap-3 pt-5 md:grid-cols-2">
        <button
          type="button"
          className="h-12 rounded-xl border border-[#ff3b30]/75 bg-[#ff3b30] px-4 text-sm text-white transition hover:bg-[#e4372d] active:translate-y-[1px] md:text-base"
          onClick={onClickDraw}
        >
          🎴 开始抽签
        </button>
        <button type="button" className={`${t.btnSecondary} px-4 text-sm md:text-base`} onClick={onSwitchMode}>
          🔁 换一种类型
        </button>
      </div>
    </section>
  );
}
