interface TubePixelProps {
  shaking: boolean;
}

const faces = [
  { label: "签", transform: "translateZ(38px)" },
  { label: "运", transform: "rotateY(120deg) translateZ(38px)" },
  { label: "启", transform: "rotateY(240deg) translateZ(38px)" }
];

export default function TubePixel({ shaking }: TubePixelProps) {
  return (
    <div className="relative h-56 w-56 md:h-72 md:w-72 [perspective:920px]">
      <div className={`absolute inset-0 left-1/2 top-1/2 h-[174px] w-[122px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] md:h-[212px] md:w-[146px] ${shaking ? "animate-tubeSpin3d" : ""}`}>
        <div className="absolute -top-5 left-1/2 h-7 w-[136px] -translate-x-1/2 rounded-lg border border-cyan-300/70 bg-zinc-900 shadow-[0_0_12px_rgba(34,211,238,0.24)]" />
        <div className="absolute -top-3 left-1/2 h-3 w-[108px] -translate-x-1/2 rounded-lg bg-cyan-300/25" />

        {faces.map((face) => (
          <div
            key={face.label}
            className="absolute inset-0 overflow-hidden border border-cyan-300/70 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] shadow-[inset_0_0_0_1px_rgba(236,72,153,0.24)]"
            style={{ transform: face.transform }}
          >
            <div className="absolute inset-x-2 top-2 h-px bg-cyan-300/65" />
            <div className="absolute inset-x-2 bottom-2 h-px bg-fuchsia-300/55" />
            <div className="absolute left-2 top-5 h-[2px] w-6 bg-fuchsia-300/60" />
            <div className="absolute right-2 top-7 h-[2px] w-5 bg-cyan-300/55" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-cyan-300/55 bg-cyan-100/90 px-2 py-1 text-center font-mono text-[10px] tracking-wider text-sky-900 md:text-xs">
              {face.label}
            </div>
          </div>
        ))}

        <div className={`absolute left-1/2 top-[24px] h-[112px] w-[8px] -translate-x-1/2 rounded-sm bg-zinc-200/75 ${shaking ? "animate-sticksPixel" : ""}`} />
        <div className={`absolute left-1/2 top-[28px] ml-3 h-[104px] w-[7px] -translate-x-1/2 rounded-sm bg-zinc-300/70 ${shaking ? "animate-sticksPixel" : ""}`} />
        <div className={`absolute left-1/2 top-[28px] -ml-3 h-[104px] w-[7px] -translate-x-1/2 rounded-sm bg-zinc-300/70 ${shaking ? "animate-sticksPixel" : ""}`} />

        <div className="absolute -bottom-5 left-1/2 h-7 w-[136px] -translate-x-1/2 rounded-lg border border-fuchsia-300/60 bg-zinc-900 shadow-[0_0_12px_rgba(217,70,239,0.18)]" />
      </div>

      <div className="absolute bottom-5 left-1/2 h-3 w-[150px] -translate-x-1/2 rounded-lg bg-cyan-400/20 blur-[2px]" />
    </div>
  );
}
