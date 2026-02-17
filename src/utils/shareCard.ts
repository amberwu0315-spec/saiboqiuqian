import { getTrackVisual } from "../constants/tracks";
import type { DrawResult, Track } from "../types";
import type { ThemeKey } from "../theme";

export type ShareCardPayload = {
  track: Track;
  modeLabel: string;
  title: string;
  lines: string[];
  lunarDate: string;
  solarDate: string;
  timestamp: string;
  source: string;
  accent: string;
  surfaceTint: string;
};

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1920;
const STUDIO_SOURCE = "勉勉强强工作室";

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxChars: number): string[] {
  const chars = Array.from(text);
  const chunks: string[] = [];
  for (let i = 0; i < chars.length; i += maxChars) {
    chunks.push(chars.slice(i, i + maxChars).join(""));
  }
  return chunks.length > 0 ? chunks : [text];
}

export function formatSolarDate(date: Date): string {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return `${y}-${m}-${d}`;
}

export function formatTimestamp(date: Date): string {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

export function formatLunarDate(date: Date): string {
  try {
    const parts = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
      month: "long",
      day: "numeric"
    }).formatToParts(date);
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    if (!month && !day) {
      return "农历日期";
    }
    return `${month}${day}`;
  } catch {
    return "农历日期";
  }
}

export function buildShareCardPayload(result: DrawResult, drawAt: Date): ShareCardPayload {
  const visual = getTrackVisual(result.track);

  if (result.track === "trad") {
    return {
      track: result.track,
      modeLabel: visual.modeLabel,
      title: `第 ${result.fortune.id} 签 · ${result.fortune.level}`,
      lines: [result.fortune.text],
      lunarDate: formatLunarDate(drawAt),
      solarDate: formatSolarDate(drawAt),
      timestamp: formatTimestamp(drawAt),
      source: STUDIO_SOURCE,
      accent: visual.accent,
      surfaceTint: visual.softSurface
    };
  }

  if (result.track === "yesno") {
    return {
      track: result.track,
      modeLabel: visual.modeLabel,
      title: result.fortune.text,
      lines: [],
      lunarDate: formatLunarDate(drawAt),
      solarDate: formatSolarDate(drawAt),
      timestamp: formatTimestamp(drawAt),
      source: STUDIO_SOURCE,
      accent: visual.accent,
      surfaceTint: visual.softSurface
    };
  }

  return {
    track: result.track,
    modeLabel: visual.modeLabel,
    title: visual.name,
    lines: [result.fortune.text],
    lunarDate: formatLunarDate(drawAt),
    solarDate: formatSolarDate(drawAt),
    timestamp: formatTimestamp(drawAt),
    source: STUDIO_SOURCE,
    accent: visual.accent,
    surfaceTint: visual.softSurface
  };
}

function buildStationeryCardSvg(payload: ShareCardPayload): string {
  const padding = 92;
  const cardX = 70;
  const cardY = 70;
  const cardW = CARD_WIDTH - 140;
  const cardH = CARD_HEIGHT - 140;

  const wrappedLines = payload.lines.flatMap((line) => wrapText(line, 19));
  const textStartY = 520;
  const lineGap = 72;
  const lineSpans = wrappedLines
    .map((line, index) => {
      const y = textStartY + index * lineGap;
      return `<text x="${padding}" y="${y}" font-size="41" fill="#4c4439" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(line)}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <defs>
    <linearGradient id="bgCat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#faf5ec" />
      <stop offset="100%" stop-color="#eee2d3" />
    </linearGradient>
  </defs>
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#bgCat)" />
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="${escapeXml(payload.surfaceTint)}" />
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="#fffaf3" fill-opacity="0.58"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="38" fill="#fffaf4" fill-opacity="0.94" stroke="#d8ccbf" stroke-opacity="0.62" stroke-width="2"/>
  <rect x="${padding}" y="148" width="226" height="48" rx="24" fill="#fffdf9" stroke="#d8ccbf" stroke-opacity="0.62"/>
  <text x="${padding + 24}" y="180" font-size="26" fill="#6c5f50" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
    payload.modeLabel
  )}</text>
  <text x="${padding}" y="302" font-size="64" font-weight="600" fill="${escapeXml(payload.accent)}" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
    payload.title
  )}</text>
  <text x="${padding}" y="374" font-size="26" fill="#6f6252" fill-opacity="0.88" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">日期：${escapeXml(
    payload.lunarDate
  )} · ${escapeXml(payload.solarDate)}</text>
  ${lineSpans}
  <line x1="${padding}" y1="${CARD_HEIGHT - 340}" x2="${CARD_WIDTH - padding}" y2="${CARD_HEIGHT - 340}" stroke="#d8ccbf" stroke-opacity="0.88" />
  <text x="${padding}" y="${CARD_HEIGHT - 270}" font-size="24" fill="#6f6252" fill-opacity="0.84" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">抽签时间：${escapeXml(
    payload.timestamp
  )}</text>
  <text x="${padding}" y="${CARD_HEIGHT - 220}" font-size="24" fill="#6f6252" fill-opacity="0.84" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">来源：${escapeXml(
    payload.source
  )}</text>
</svg>`;
}

function buildPixelCardSvg(payload: ShareCardPayload): string {
  const padding = 92;
  const cardX = 70;
  const cardY = 70;
  const cardW = CARD_WIDTH - 140;
  const cardH = CARD_HEIGHT - 140;

  const wrappedLines = payload.lines.flatMap((line) => wrapText(line, 19));
  const textStartY = 520;
  const lineGap = 70;
  const lineSpans = wrappedLines
    .map((line, index) => {
      const y = textStartY + index * lineGap;
      return `<text x="${padding}" y="${y}" font-size="38" fill="#f4f4f5" font-family="Consolas, 'Courier New', monospace">> ${escapeXml(line)}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" shape-rendering="crispEdges">
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="#09090b" />
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" fill="#09090b" stroke="#a3e635" stroke-width="4"/>
  <rect x="${cardX + 20}" y="${cardY + 20}" width="${cardW - 40}" height="${cardH - 40}" fill="#111827" stroke="#3f3f46" stroke-width="2"/>
  <rect x="${padding}" y="136" width="256" height="52" fill="#0a0a0a" stroke="#a3e635" stroke-width="3"/>
  <text x="${padding + 18}" y="171" font-size="28" fill="#bef264" font-family="Consolas, 'Courier New', monospace">${escapeXml(payload.modeLabel)}</text>
  <text x="${padding}" y="302" font-size="62" font-weight="700" fill="#d9f99d" font-family="Consolas, 'Courier New', monospace">${escapeXml(
    payload.title
  )}</text>
  <text x="${padding}" y="370" font-size="24" fill="#a1a1aa" font-family="Consolas, 'Courier New', monospace">日期：${escapeXml(
    payload.lunarDate
  )} · ${escapeXml(payload.solarDate)}</text>
  ${lineSpans}
  <line x1="${padding}" y1="${CARD_HEIGHT - 340}" x2="${CARD_WIDTH - padding}" y2="${CARD_HEIGHT - 340}" stroke="#3f3f46" />
  <text x="${padding}" y="${CARD_HEIGHT - 270}" font-size="24" fill="#a1a1aa" font-family="Consolas, 'Courier New', monospace">抽签时间：${escapeXml(
    payload.timestamp
  )}</text>
  <text x="${padding}" y="${CARD_HEIGHT - 220}" font-size="24" fill="#a1a1aa" font-family="Consolas, 'Courier New', monospace">来源：${escapeXml(
    payload.source
  )}</text>
</svg>`;
}

export function buildShareCardSvg(payload: ShareCardPayload, theme: ThemeKey): string {
  return theme === "pixel" ? buildPixelCardSvg(payload) : buildStationeryCardSvg(payload);
}

async function svgToPngBlob(svg: string): Promise<Blob> {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("SVG 图片加载失败"));
      img.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("无法创建画布");
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0, CARD_WIDTH, CARD_HEIGHT);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error("PNG 导出失败"));
        }
      }, "image/png");
    });

    return pngBlob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function elementToPngBlob(element: HTMLElement): Promise<Blob> {
  const { default: html2canvas } = await import("html2canvas");
  const snapshot = await html2canvas(element, {
    backgroundColor: null,
    scale: Math.max(2, window.devicePixelRatio || 1),
    useCORS: true,
    logging: false
  });

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("无法创建画布");
  }

  ctx.fillStyle = "#fdf8f2";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const padding = 64;
  const maxW = CARD_WIDTH - padding * 2;
  const maxH = CARD_HEIGHT - padding * 2;
  const scale = Math.min(maxW / snapshot.width, maxH / snapshot.height);
  const drawW = snapshot.width * scale;
  const drawH = snapshot.height * scale;
  const x = (CARD_WIDTH - drawW) / 2;
  const y = (CARD_HEIGHT - drawH) / 2;
  ctx.drawImage(snapshot, x, y, drawW, drawH);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("PNG 导出失败"));
      }
    }, "image/png");
  });
}

export async function downloadShareCardPng(payload: ShareCardPayload, theme: ThemeKey, sourceElement?: HTMLElement | null): Promise<void> {
  let pngBlob: Blob;

  if (sourceElement) {
    try {
      pngBlob = await elementToPngBlob(sourceElement);
    } catch {
      const svg = buildShareCardSvg(payload, theme);
      pngBlob = await svgToPngBlob(svg);
    }
  } else {
    const svg = buildShareCardSvg(payload, theme);
    pngBlob = await svgToPngBlob(svg);
  }

  const url = URL.createObjectURL(pngBlob);

  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = `签纸卡片-${payload.solarDate}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } finally {
    URL.revokeObjectURL(url);
  }
}
