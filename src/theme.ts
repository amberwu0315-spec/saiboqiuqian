export type ThemeKey = "pixel" | "stationery";

type ThemeTokens = {
  appBg: string;
  panel: string;
  title: string;
  sub: string;
  btnPrimary: string;
  btnSecondary: string;
  chip: string;
  stage: string;
  card: string;
  mono: string;
  toggleWrap: string;
  toggleBtn: string;
  toggleActive: string;
  footer: string;
};

export const THEMES: Record<ThemeKey, ThemeTokens> = {
  pixel: {
    appBg:
      "bg-zinc-950 text-zinc-50 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.08),transparent_32%)]",
    panel:
      "relative overflow-hidden bg-zinc-950/90 border border-zinc-100/22 rounded-none shadow-[0_14px_30px_rgba(0,0,0,0.4)]",
    title: "font-bold tracking-tight text-2xl md:text-3xl",
    sub: "text-zinc-300 text-sm md:text-base",
    btnPrimary:
      "h-12 border border-lime-300/80 bg-zinc-950 hover:bg-zinc-900 active:translate-y-[1px] rounded-none font-semibold transition shadow-[0_0_0_1px_rgba(0,0,0,0.52)_inset]",
    btnSecondary:
      "h-12 border border-zinc-50/26 bg-transparent hover:bg-zinc-900/80 active:translate-y-[1px] rounded-none transition",
    chip: "inline-flex items-center gap-2 border border-zinc-50/40 bg-zinc-950 px-3 py-1 text-xs rounded-none",
    stage:
      "h-[280px] md:h-[360px] border border-zinc-50/24 bg-zinc-950 rounded-none flex items-center justify-center relative overflow-hidden",
    card: "border border-zinc-50/24 bg-zinc-950 rounded-none p-4 md:p-5",
    mono: "font-mono tracking-tight",
    toggleWrap: "border border-zinc-50/20 bg-zinc-900 p-1",
    toggleBtn: "px-3 py-1 text-xs border border-transparent rounded-none",
    toggleActive: "border-lime-300/80 bg-zinc-950 text-lime-200",
    footer: "pt-2 text-xs text-zinc-400"
  },
  stationery: {
    appBg:
      "bg-gradient-to-b from-[#fbf7f1] via-[#f4ede4] to-[#ece4da] text-zinc-900 bg-[radial-gradient(circle_at_16%_12%,rgba(176,165,156,0.14),transparent_34%),radial-gradient(circle_at_84%_4%,rgba(193,172,167,0.12),transparent_30%)]",
    panel:
      "relative overflow-hidden rounded-lg border border-[#d9cec1]/65 bg-[#fdf9f2]/92 shadow-[0_12px_28px_rgba(112,99,88,0.12)] backdrop-blur",
    title: "font-semibold tracking-tight text-2xl md:text-3xl text-[#4e4338]",
    sub: "text-[#6c5e52] text-sm md:text-base",
    btnPrimary:
      "h-12 rounded-lg border border-[#e06d67]/70 bg-[#e06d67] text-white hover:bg-[#cf615b] active:translate-y-[1px] font-medium transition shadow-[0_6px_14px_rgba(224,109,103,0.26)]",
    btnSecondary:
      "h-12 rounded-lg border border-[#d8ccbf]/70 bg-white/88 text-[#54493e] hover:bg-[#f7f1e8] active:translate-y-[1px] transition shadow-[0_1px_0_rgba(0,0,0,0.05)]",
    chip: "inline-flex items-center gap-2 rounded-lg border border-[#d8ccc0]/70 bg-white/92 px-3 py-1 text-xs text-[#645748]",
    stage:
      "h-[280px] md:h-[360px] rounded-lg border border-[#d9cec1]/60 bg-[linear-gradient(160deg,#fdf8f1,#f1e8de)] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.78)]",
    card: "rounded-lg border border-[#d9cec1]/60 bg-white/92 p-4 md:p-5 shadow-[0_10px_24px_rgba(112,99,88,0.12)]",
    mono: "",
    toggleWrap: "rounded-lg border border-[#d8ccc0]/70 bg-white/92 p-1 shadow-[0_3px_12px_rgba(112,99,88,0.1)]",
    toggleBtn: "px-3 py-1 text-xs border border-transparent rounded-lg",
    toggleActive: "border-[#cebbae]/85 bg-[#f7efe6] text-[#6d5955]",
    footer: "pt-2 text-xs text-[#726355]"
  }
};
