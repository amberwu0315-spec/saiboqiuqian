import { THEMES, type ThemeKey } from "../theme";

interface ThemeToggleProps {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const t = THEMES[theme];

  return (
    <div className={`flex items-center gap-2 ${t.toggleWrap}`}>
      <button
        type="button"
        className={`${t.toggleBtn} ${theme === "pixel" ? `${t.toggleActive} opacity-100` : "opacity-60"}`}
        onClick={() => setTheme("pixel")}
      >
        像素风
      </button>
      <button
        type="button"
        className={`${t.toggleBtn} ${theme === "stationery" ? `${t.toggleActive} opacity-100` : "opacity-60"}`}
        onClick={() => setTheme("stationery")}
      >
        猫咪风
      </button>
    </div>
  );
}
