import type { DrawResult, MmmFortune, TraditionalFortune, Track, YesNoFortune } from "../types";

// Content rules:
// - 38 fortunes per track.
// - Each line stands alone.
// - No life promises, no long-term certainty.
// - Copy should make the reader pause briefly.
// - Yes / No gives direction words only and does not constrain draw frequency.

const TRADITIONAL_LINES = [
  "可以一试，但别指望一步到位。",
  "现在动不会错，但要留后手。",
  "方向没问题，方式可以再想想。",
  "不算坏时机，只是没那么顺。",
  "这一步走得通，后面要自己扛。",
  "稍慢一点，对你更有利。",
  "现在开始，不早也不晚。",
  "有风险，但不是你扛不起的那种。",
  "可以推进，但别铺得太开。",
  "别急着证明，先站稳。",
  "现在不是冲的时候。",
  "看起来顺，其实要多留意细节。",
  "勉强可行，但不值得硬撑。",
  "再等等，会更清楚。",
  "走旧路更稳，新路要谨慎。",
  "做了不会后悔，不做也说得过去。",
  "不会出大错，但难有惊喜。",
  "现在做，回报来得慢。",
  "有人支持你，但不是全程。",
  "条件未齐，先补短板。",
  "时机在你这边，但环境一般。",
  "可以开始，但别高调。",
  "不适合孤注一掷。",
  "现在停下，比硬走更明智。",
  "外力不足，更多靠自己。",
  "成败各半，取决于执行。",
  "不用拖，但也不用抢。",
  "能做，但别抱太高期待。",
  "适合小步试探。",
  "再想一天，不会耽误事。",
  "你有优势，但别人也不弱。",
  "现在推进，会消耗不少精力。",
  "不必马上给答案。",
  "条件允许，心理未必准备好。",
  "可以往前，但要设边界。",
  "有机会，但要付出代价。",
  "这一步走完，可能要独自承担。",
  "不做也不算错。"
] as const;

const MMM_LINES = [
  "你现在这样，并不奇怪。",
  "慢一点，也是一种选择。",
  "有点犹豫，很正常。",
  "你不是没想清楚，只是还没准备好。",
  "不想动，也没关系。",
  "今天提不起劲，不代表一直都会。",
  "卡住的时候，不用急着解决。",
  "你已经做了不少事。",
  "现在的疲惫是有原因的。",
  "不确定感，会来会走。",
  "你不需要马上表态。",
  "有点逃避，也算一种自保。",
  "你不欠任何人一个答案。",
  "想停一下，并不失败。",
  "有些事，本来就不好决定。",
  "现在这样，也还能继续生活。",
  "你不需要一直有方向。",
  "今天不想想，也行。",
  "犹豫不代表你不认真。",
  "你已经在承担了。",
  "没有热情的日子，也算数。",
  "不确定的时候，人会想很多。",
  "你不是落后，只是在自己的节奏里。",
  "现在不想解释，也可以。",
  "想得慢一点，不是坏事。",
  "你没有错过什么。",
  "有些选择，本来就模糊。",
  "你已经很努力地在面对。",
  "不知道怎么办，也是一种状态。",
  "今天不用逼自己想清楚。",
  "你不需要马上振作。",
  "停下来看看，并不浪费时间。",
  "你不是一个人在想这些。",
  "有点混乱，很人类。",
  "你可以允许自己没那么确定。",
  "现在这样，还过得去。",
  "不想往前，也不一定是退后。",
  "你可以先这样待着。"
] as const;

const YES_NO_LINES = [
  "是",
  "不是",
  "可以",
  "不要",
  "再等等",
  "现在不行",
  "可以试试",
  "不太建议",
  "行",
  "不行",
  "往前",
  "先停",
  "接受",
  "放下",
  "是时候了",
  "还没到",
  "可以开始",
  "暂时不要",
  "继续",
  "换个方向",
  "是的",
  "不是现在",
  "勉强可以",
  "不值得",
  "向前一步",
  "别急",
  "可以考虑",
  "算了",
  "试一小步",
  "不用",
  "现在",
  "稍后",
  "点头",
  "摇头",
  "行得通",
  "走不远",
  "可以停下",
  "到此为止"
] as const;

const TRAD_UP_IDS = new Set([1, 2, 3, 5, 7, 8, 19, 21, 22, 29, 35, 36]);
const TRAD_DOWN_IDS = new Set([11, 13, 18, 23, 24, 32, 37, 38]);

function getTraditionalLevel(id: number): TraditionalFortune["level"] {
  if (TRAD_UP_IDS.has(id)) {
    return "上签";
  }
  if (TRAD_DOWN_IDS.has(id)) {
    return "下签";
  }
  return "中签";
}

export const traditionalFortunes: TraditionalFortune[] = TRADITIONAL_LINES.map((text, index) => {
  const id = index + 1;
  return {
    id,
    level: getTraditionalLevel(id),
    text
  };
});

export const mmmFortunes: MmmFortune[] = MMM_LINES.map((text, index) => ({
  id: index + 1,
  text
}));

export const yesNoFortunes: YesNoFortune[] = YES_NO_LINES.map((text) => ({ text }));

function randomFrom<T>(list: T[]): T {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function drawFortune(track: Track): DrawResult {
  if (track === "trad") {
    return {
      track: "trad",
      fortune: randomFrom(traditionalFortunes)
    };
  }

  if (track === "yesno") {
    return {
      track: "yesno",
      fortune: randomFrom(yesNoFortunes)
    };
  }

  return {
    track: "mmm",
    fortune: randomFrom(mmmFortunes)
  };
}
