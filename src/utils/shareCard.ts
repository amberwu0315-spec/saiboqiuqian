import { getTrackVisual } from "../constants/tracks";
import { getMmmCopyTypeByFortuneId } from "../constants/mmmCopyTypes";
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
const LUNAR_DAY_LABELS = [
  "",
  "初一",
  "初二",
  "初三",
  "初四",
  "初五",
  "初六",
  "初七",
  "初八",
  "初九",
  "初十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八",
  "十九",
  "二十",
  "廿一",
  "廿二",
  "廿三",
  "廿四",
  "廿五",
  "廿六",
  "廿七",
  "廿八",
  "廿九",
  "三十"
] as const;
const CHINESE_NUM_MAP: Record<string, number> = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9
};
const LUNAR_MONTH_NAME_MAP: Record<number, string> = {
  1: "大年",
  2: "二月",
  3: "三月",
  4: "四月",
  5: "五月",
  6: "六月",
  7: "七月",
  8: "八月",
  9: "九月",
  10: "十月",
  11: "冬月",
  12: "腊月"
};

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

function parseChineseNumberToken(token: string): number | null {
  if (!token) {
    return null;
  }
  if (/^\d+$/.test(token)) {
    return Number(token);
  }
  if (token === "十") {
    return 10;
  }
  if (token === "二十") {
    return 20;
  }
  if (token === "三十" || token === "卅") {
    return 30;
  }
  if (token.startsWith("初")) {
    return CHINESE_NUM_MAP[token.slice(1)] ?? null;
  }
  if (token.startsWith("十")) {
    const tail = token.slice(1);
    const tailNum = CHINESE_NUM_MAP[tail];
    return tailNum === undefined ? null : 10 + tailNum;
  }
  if (token.startsWith("廿")) {
    const tail = token.slice(1);
    if (!tail) {
      return 20;
    }
    const tailNum = CHINESE_NUM_MAP[tail];
    return tailNum === undefined ? null : 20 + tailNum;
  }
  if (token.startsWith("卅")) {
    const tail = token.slice(1);
    if (!tail) {
      return 30;
    }
    const tailNum = CHINESE_NUM_MAP[tail];
    return tailNum === undefined ? null : 30 + tailNum;
  }
  if (token.endsWith("十")) {
    const head = token.slice(0, -1);
    const headNum = CHINESE_NUM_MAP[head];
    return headNum === undefined ? null : headNum * 10;
  }
  return CHINESE_NUM_MAP[token] ?? null;
}

function parseLunarMonth(raw: string): { month: number | null; leap: boolean } {
  const leap = raw.includes("闰");
  const monthToken = raw.replace(/闰/g, "").replace(/月/g, "").trim();
  const tokenToMonth: Record<string, number> = {
    正: 1,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
    冬: 11,
    十一: 11,
    腊: 12,
    十二: 12
  };
  const mapped = tokenToMonth[monthToken];
  if (mapped !== undefined) {
    return { month: mapped, leap };
  }
  return { month: parseChineseNumberToken(monthToken), leap };
}

function parseLunarDay(raw: string): number | null {
  return parseChineseNumberToken(raw.trim());
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
    const monthRaw = parts.find((p) => p.type === "month")?.value ?? "";
    const dayRaw = parts.find((p) => p.type === "day")?.value ?? "";
    if (!monthRaw && !dayRaw) {
      return "农历日期";
    }
    const { month, leap } = parseLunarMonth(monthRaw);
    const day = parseLunarDay(dayRaw);
    if (!month || !day || day < 1 || day > 30) {
      return `${monthRaw}${dayRaw}`;
    }
    const monthText = LUNAR_MONTH_NAME_MAP[month] ?? `${monthRaw}`;
    const dayText = LUNAR_DAY_LABELS[day] ?? `${dayRaw}`;
    return `${leap ? "闰" : ""}${monthText}${dayText}`;
  } catch {
    return "农历日期";
  }
}

const SHARE_SOURCE_LINE = "新的一年共勉啦~";

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
      source: SHARE_SOURCE_LINE,
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
      source: SHARE_SOURCE_LINE,
      accent: visual.accent,
      surfaceTint: visual.softSurface
    };
  }

  return {
    track: result.track,
    modeLabel: visual.modeLabel,
    title: getMmmCopyTypeByFortuneId(result.fortune.id)?.label ?? visual.name,
    lines: [result.fortune.text],
    lunarDate: formatLunarDate(drawAt),
    solarDate: formatSolarDate(drawAt),
    timestamp: formatTimestamp(drawAt),
    source: SHARE_SOURCE_LINE,
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
  const centerX = CARD_WIDTH / 2;
  const modePillWidth = 226;

  const wrappedLines = payload.lines.flatMap((line) => wrapText(line, 19));
  const textStartY = 520;
  const lineGap = 72;
  const lineSpans = wrappedLines
    .map((line, index) => {
      const y = textStartY + index * lineGap;
      return `<text x="${centerX}" y="${y}" text-anchor="middle" font-size="41" fill="#4c4439" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
        line
      )}</text>`;
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
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="8" fill="#fffaf4" fill-opacity="0.94" stroke="#d8ccbf" stroke-opacity="0.62" stroke-width="2"/>
  <rect x="${centerX - modePillWidth / 2}" y="148" width="${modePillWidth}" height="48" rx="8" fill="#fffdf9" stroke="#d8ccbf" stroke-opacity="0.62"/>
  <text x="${centerX}" y="180" text-anchor="middle" font-size="26" fill="#6c5f50" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
    payload.modeLabel
  )}</text>
  <text x="${centerX}" y="302" text-anchor="middle" font-size="64" font-weight="600" fill="${escapeXml(payload.accent)}" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
    payload.title
  )}</text>
  <text x="${centerX}" y="374" text-anchor="middle" font-size="26" fill="#6f6252" fill-opacity="0.88" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
    payload.lunarDate
  )} · ${escapeXml(payload.solarDate)}</text>
  ${lineSpans}
  <line x1="${padding}" y1="${CARD_HEIGHT - 340}" x2="${CARD_WIDTH - padding}" y2="${CARD_HEIGHT - 340}" stroke="#d8ccbf" stroke-opacity="0.88" />
  <text x="${centerX}" y="${CARD_HEIGHT - 270}" text-anchor="middle" font-size="24" fill="#6f6252" fill-opacity="0.84" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">抽签时间：${escapeXml(
    payload.timestamp
  )}</text>
  <text x="${centerX}" y="${CARD_HEIGHT - 220}" text-anchor="middle" font-size="24" fill="#6f6252" fill-opacity="0.84" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif">${escapeXml(
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
  const centerX = CARD_WIDTH / 2;
  const modePillWidth = 256;

  const wrappedLines = payload.lines.flatMap((line) => wrapText(line, 19));
  const textStartY = 520;
  const lineGap = 70;
  const lineSpans = wrappedLines
    .map((line, index) => {
      const y = textStartY + index * lineGap;
      return `<text x="${centerX}" y="${y}" text-anchor="middle" font-size="38" fill="#f4f4f5" font-family="Consolas, 'Courier New', monospace">${escapeXml(
        line
      )}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" shape-rendering="crispEdges">
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="#09090b" />
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" fill="#09090b" stroke="#a3e635" stroke-width="4"/>
  <rect x="${cardX + 20}" y="${cardY + 20}" width="${cardW - 40}" height="${cardH - 40}" fill="#111827" stroke="#3f3f46" stroke-width="2"/>
  <rect x="${centerX - modePillWidth / 2}" y="136" width="${modePillWidth}" height="52" fill="#0a0a0a" stroke="#a3e635" stroke-width="3"/>
  <text x="${centerX}" y="171" text-anchor="middle" font-size="28" fill="#bef264" font-family="Consolas, 'Courier New', monospace">${escapeXml(payload.modeLabel)}</text>
  <text x="${centerX}" y="302" text-anchor="middle" font-size="62" font-weight="700" fill="#d9f99d" font-family="Consolas, 'Courier New', monospace">${escapeXml(
    payload.title
  )}</text>
  <text x="${centerX}" y="370" text-anchor="middle" font-size="24" fill="#a1a1aa" font-family="Consolas, 'Courier New', monospace">${escapeXml(
    payload.lunarDate
  )} · ${escapeXml(payload.solarDate)}</text>
  ${lineSpans}
  <line x1="${padding}" y1="${CARD_HEIGHT - 340}" x2="${CARD_WIDTH - padding}" y2="${CARD_HEIGHT - 340}" stroke="#3f3f46" />
  <text x="${centerX}" y="${CARD_HEIGHT - 270}" text-anchor="middle" font-size="24" fill="#a1a1aa" font-family="Consolas, 'Courier New', monospace">抽签时间：${escapeXml(
    payload.timestamp
  )}</text>
  <text x="${centerX}" y="${CARD_HEIGHT - 220}" text-anchor="middle" font-size="24" fill="#a1a1aa" font-family="Consolas, 'Courier New', monospace">${escapeXml(
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

type DrawFrame = { x: number; y: number; width: number; height: number };

function roundedRectPath(ctx: CanvasRenderingContext2D, frame: DrawFrame, radius: number): void {
  const r = Math.min(radius, frame.width / 2, frame.height / 2);
  const right = frame.x + frame.width;
  const bottom = frame.y + frame.height;
  ctx.beginPath();
  ctx.moveTo(frame.x + r, frame.y);
  ctx.lineTo(right - r, frame.y);
  ctx.quadraticCurveTo(right, frame.y, right, frame.y + r);
  ctx.lineTo(right, bottom - r);
  ctx.quadraticCurveTo(right, bottom, right - r, bottom);
  ctx.lineTo(frame.x + r, bottom);
  ctx.quadraticCurveTo(frame.x, bottom, frame.x, bottom - r);
  ctx.lineTo(frame.x, frame.y + r);
  ctx.quadraticCurveTo(frame.x, frame.y, frame.x + r, frame.y);
  ctx.closePath();
}

function drawImageCover(ctx: CanvasRenderingContext2D, image: CanvasImageSource, frame: DrawFrame): void {
  const source = image as { width: number; height: number };
  const scale = Math.max(frame.width / source.width, frame.height / source.height);
  const drawW = source.width * scale;
  const drawH = source.height * scale;
  const drawX = frame.x + (frame.width - drawW) / 2;
  const drawY = frame.y + (frame.height - drawH) / 2;
  ctx.drawImage(image, drawX, drawY, drawW, drawH);
}

function drawImageContain(ctx: CanvasRenderingContext2D, image: CanvasImageSource, frame: DrawFrame): void {
  const source = image as { width: number; height: number };
  const scale = Math.min(frame.width / source.width, frame.height / source.height);
  const drawW = source.width * scale;
  const drawH = source.height * scale;
  const drawX = frame.x + (frame.width - drawW) / 2;
  const drawY = frame.y + (frame.height - drawH) / 2;
  ctx.drawImage(image, drawX, drawY, drawW, drawH);
}

function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  frame: DrawFrame,
  radius: number,
  fillStyle: string | CanvasGradient | CanvasPattern
): void {
  ctx.save();
  roundedRectPath(ctx, frame, radius);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  frame: DrawFrame,
  radius: number,
  strokeStyle: string,
  lineWidth: number
): void {
  ctx.save();
  roundedRectPath(ctx, frame, radius);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();
}

function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) {
    return null;
  }
  return [Number.parseInt(match[1], 16), Number.parseInt(match[2], 16), Number.parseInt(match[3], 16)];
}

function mixRgb(base: [number, number, number], target: [number, number, number], weight: number): [number, number, number] {
  const w = Math.max(0, Math.min(1, weight));
  return [
    Math.round(base[0] + (target[0] - base[0]) * w),
    Math.round(base[1] + (target[1] - base[1]) * w),
    Math.round(base[2] + (target[2] - base[2]) * w)
  ];
}

function rgbToRgba(rgb: [number, number, number], alpha: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`图片加载失败: ${src}`));
    image.src = src;
  });
}

async function loadFirstAvailableImage(sources: readonly string[]): Promise<HTMLImageElement | null> {
  for (const source of sources) {
    try {
      return await loadImage(source);
    } catch {
      // Try next source.
    }
  }
  return null;
}

async function elementToPngBlob(element: HTMLElement, payload: ShareCardPayload): Promise<Blob> {
  const { default: html2canvas } = await import("html2canvas");
  const captureAttr = "data-share-capture-root";
  element.setAttribute(captureAttr, "true");
  let snapshot: HTMLCanvasElement;
  try {
    snapshot = await html2canvas(element, {
      backgroundColor: null,
      scale: Math.max(2, window.devicePixelRatio || 1),
      useCORS: true,
      logging: false,
      onclone: (doc) => {
        const clonedRoot = doc.querySelector(`[${captureAttr}="true"]`) as HTMLElement | null;
        if (!clonedRoot) {
          return;
        }
        clonedRoot.style.background = "transparent";
        clonedRoot.style.overflow = "hidden";
        const clonedCard = clonedRoot.firstElementChild as HTMLElement | null;
        if (clonedCard) {
          clonedCard.style.background = "transparent";
          clonedCard.style.backgroundImage = "none";
          clonedCard.style.boxShadow = "none";
          clonedCard.style.transform = "scale(1.1)";
          clonedCard.style.transformOrigin = "top center";
          clonedCard.style.borderColor = "rgba(255,255,255,0.48)";

          const sectionElements = Array.from(clonedCard.children) as HTMLElement[];
          const modeEl = sectionElements[0];
          const titleEl = sectionElements[1];
          const dateEl = sectionElements[2];
          const linesEl = sectionElements[3];
          const footerEl = sectionElements[4];

          if (modeEl) {
            modeEl.style.color = "rgba(255,255,255,0.82)";
            modeEl.style.fontSize = "15px";
            modeEl.style.letterSpacing = "0.03em";
            modeEl.style.marginTop = "0px";
          }

          if (titleEl) {
            titleEl.style.color = "rgba(255,255,255,0.98)";
            titleEl.style.fontSize = "48px";
            titleEl.style.fontWeight = "700";
            titleEl.style.lineHeight = "1.2";
            titleEl.style.marginTop = "16px";
          }

          if (dateEl) {
            dateEl.style.color = "rgba(255,255,255,0.76)";
            dateEl.style.fontSize = "14px";
            dateEl.style.marginTop = "10px";
          }

          if (linesEl) {
            linesEl.style.color = "rgba(255,255,255,0.94)";
            linesEl.style.fontSize = "23px";
            linesEl.style.lineHeight = "1.8";
            linesEl.style.marginTop = "28px";
          }

          if (footerEl) {
            footerEl.style.color = "rgba(255,255,255,0.72)";
            footerEl.style.fontSize = "13px";
            footerEl.style.marginTop = "32px";
            footerEl.style.paddingTop = "16px";
            footerEl.style.borderTopColor = "rgba(255,255,255,0.35)";
          }
        }
      }
    });
  } finally {
    element.removeAttribute(captureAttr);
  }

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("无法创建画布");
  }

  const visual = getTrackVisual(payload.track);
  const backgroundImage = await loadFirstAvailableImage(visual.readyImageSources);
  const fullFrame: DrawFrame = { x: 0, y: 0, width: CARD_WIDTH, height: CARD_HEIGHT };

  if (backgroundImage) {
    drawImageCover(ctx, backgroundImage, fullFrame);
  } else {
    const fallbackGradient = ctx.createLinearGradient(0, 0, 0, CARD_HEIGHT);
    fallbackGradient.addColorStop(0, "#f4e4d5");
    fallbackGradient.addColorStop(1, "#ead9c5");
    ctx.fillStyle = fallbackGradient;
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  }

  ctx.fillStyle = "rgba(255, 251, 245, 0.22)";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const dimOverlay = ctx.createLinearGradient(0, 0, 0, CARD_HEIGHT);
  dimOverlay.addColorStop(0, "rgba(22, 13, 6, 0.16)");
  dimOverlay.addColorStop(0.45, "rgba(22, 13, 6, 0.08)");
  dimOverlay.addColorStop(1, "rgba(22, 13, 6, 0.14)");
  ctx.fillStyle = dimOverlay;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const centerX = CARD_WIDTH / 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const headerText = "赛博求签（图一乐）";
  ctx.font = "700 58px PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif";
  const textWidth = ctx.measureText(headerText).width;
  const iconGap = 72;
  const textStartX = centerX - (textWidth + iconGap) / 2 + iconGap;
  const iconX = textStartX - iconGap;
  const titleY = 112;

  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255, 251, 245, 0.98)";
  ctx.shadowColor = "rgba(19, 11, 6, 0.42)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;
  ctx.font = "600 56px PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif";
  ctx.fillText("🐱", iconX, titleY);
  ctx.font = "700 58px PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif";
  ctx.fillText(headerText, textStartX, titleY);
  ctx.restore();

  const accentRgb = hexToRgb(payload.accent) ?? [227, 121, 112];
  const gradientTop = mixRgb(accentRgb, [255, 255, 255], 0.72);
  const gradientMid = mixRgb(accentRgb, [255, 255, 255], 0.56);
  const gradientBottom = mixRgb(accentRgb, [255, 255, 255], 0.34);

  const contentTop = 160;
  const contentBottom = CARD_HEIGHT - 132;
  const contentHeight = contentBottom - contentTop;
  const maxCardWidth = CARD_WIDTH - 64;
  const maxCardHeight = contentHeight;
  const frameRatio = 3 / 4;
  let cardWidth = maxCardWidth;
  let cardHeight = Math.round(cardWidth / frameRatio);
  if (cardHeight > maxCardHeight) {
    cardHeight = maxCardHeight;
    cardWidth = Math.round(cardHeight * frameRatio);
  }
  const cardFrame: DrawFrame = {
    x: Math.round((CARD_WIDTH - cardWidth) / 2),
    y: Math.round(contentTop + (contentHeight - cardHeight) / 2),
    width: cardWidth,
    height: cardHeight
  };

  const contentGradient = ctx.createLinearGradient(0, cardFrame.y, 0, cardFrame.y + cardFrame.height);
  contentGradient.addColorStop(0, rgbToRgba(gradientTop, 0.9));
  contentGradient.addColorStop(0.52, rgbToRgba(gradientMid, 0.9));
  contentGradient.addColorStop(1, rgbToRgba(gradientBottom, 0.9));
  fillRoundedRect(ctx, cardFrame, 12, contentGradient);

  ctx.save();
  roundedRectPath(ctx, cardFrame, 12);
  ctx.clip();
  drawImageCover(ctx, snapshot, cardFrame);
  ctx.restore();
  strokeRoundedRect(ctx, cardFrame, 12, rgbToRgba(mixRgb(accentRgb, [255, 255, 255], 0.5), 0.95), 3);

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 246, 236, 0.94)";
  ctx.font = "400 30px PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif";
  ctx.fillText("勉勉强强工作室 出品", centerX, CARD_HEIGHT - 66);

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
      pngBlob = await elementToPngBlob(sourceElement, payload);
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
