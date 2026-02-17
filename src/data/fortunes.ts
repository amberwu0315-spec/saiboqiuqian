import type { DrawResult, MmmFortune, TraditionalFortune, Track } from "../types";

export const traditionalFortunes: TraditionalFortune[] = [
  {
    id: 1,
    level: "上签",
    text: ["这条路是通的。", "慢一点也没关系。"],
    explain: "方向没有问题。",
    judge: "可行。"
  },
  {
    id: 2,
    level: "上签",
    text: ["事情正在往好的方向走。", "你不需要再多用力。"],
    explain: "顺着现在的状态即可。",
    judge: "可继续。"
  },
  {
    id: 3,
    level: "上签",
    text: ["局面已经打开。", "不必反复确认。"],
    explain: "信号是清楚的。",
    judge: "可前行。"
  },
  {
    id: 4,
    level: "上签",
    text: ["你现在站的位置是对的。", "下一步不会太难。"],
    explain: "基础已经具备。",
    judge: "可试。"
  },
  {
    id: 5,
    level: "上签",
    text: ["节奏合适。", "不用刻意加快。"],
    explain: "保持当前速度即可。",
    judge: "顺行。"
  },
  {
    id: 6,
    level: "上签",
    text: ["事情没有卡住。", "只是看起来慢一点。"],
    explain: "进展是存在的。",
    judge: "继续。"
  },
  {
    id: 7,
    level: "中签",
    text: ["现在不是不行。", "只是还差一点条件。"],
    explain: "需要再等等。",
    judge: "宜缓。"
  },
  {
    id: 8,
    level: "中签",
    text: ["你想得有点多。", "反而不好判断。"],
    explain: "先减少干扰。",
    judge: "稳住。"
  },
  {
    id: 9,
    level: "中签",
    text: ["方向还不算清楚。", "但也没走错。"],
    explain: "先观察。",
    judge: "暂缓。"
  },
  {
    id: 10,
    level: "中签",
    text: ["事情在变化中。", "现在下结论太早。"],
    explain: "让情况多走一步。",
    judge: "等等看。"
  },
  {
    id: 11,
    level: "中签",
    text: ["你已经在路上了。", "只是还没走稳。"],
    explain: "先站稳脚下。",
    judge: "慢行。"
  },
  {
    id: 12,
    level: "中签",
    text: ["这一步不算错。", "但不是终点。"],
    explain: "后面还有调整空间。",
    judge: "续观。"
  },
  {
    id: 13,
    level: "中签",
    text: ["现在推进会有点吃力。", "但不是完全不行。"],
    explain: "需要调整方式。",
    judge: "缓行。"
  },
  {
    id: 14,
    level: "中签",
    text: ["局势还在摇摆。", "不急着站队。"],
    explain: "保持弹性。",
    judge: "观望。"
  },
  {
    id: 15,
    level: "中签",
    text: ["你心里其实没那么确定。", "这点值得重视。"],
    explain: "听一听犹豫。",
    judge: "放慢。"
  },
  {
    id: 16,
    level: "中签",
    text: ["事情本身没问题。", "只是时机未到。"],
    explain: "等条件成熟。",
    judge: "暂缓。"
  },
  {
    id: 17,
    level: "中签",
    text: ["现在做不会出大错。", "但也难有突破。"],
    explain: "不要期待太高。",
    judge: "平行。"
  },
  {
    id: 18,
    level: "下签",
    text: ["你现在有点着急。", "越快反而越累。"],
    explain: "强行推进不合适。",
    judge: "先停一下。"
  }
];

export const mmmFortunes: MmmFortune[] = [
  {
    name: "拉伸之始签",
    text: "你现在还在试水阶段。",
    note: "不用急着定型。",
    disclaimer: "本签不要求结果。"
  },
  {
    name: "未开始之签",
    text: "你想了很多，但还没动。",
    note: "这本身也算一种状态。",
    disclaimer: "允许停在这里。"
  },
  {
    name: "刚刚开始之签",
    text: "你已经迈出第一步了。",
    note: "别急着判断对不对。",
    disclaimer: "过程比结论重要。"
  },
  {
    name: "半路之签",
    text: "你走到一半，有点不确定。",
    note: "这是很常见的感觉。",
    disclaimer: "不需要立刻解决。"
  },
  {
    name: "卡住之签",
    text: "你不是不想动，是不知道怎么动。",
    note: "可以先放着。",
    disclaimer: "卡住不是失败。"
  },
  {
    name: "偏离之签",
    text: "事情已经和最初想的不一样了。",
    note: "这不一定是坏事。",
    disclaimer: "允许偏离。"
  },
  {
    name: "犹豫之签",
    text: "你在几个选项之间来回。",
    note: "不选也是一种选择。",
    disclaimer: "无需立刻决定。"
  },
  {
    name: "低效之签",
    text: "你觉得自己没什么产出。",
    note: "但你并没有停。",
    disclaimer: "状态不等于价值。"
  },
  {
    name: "反复修改之签",
    text: "你改了很多次。",
    note: "可能还没准备好结束。",
    disclaimer: "未完成是允许的。"
  },
  {
    name: "想放弃之签",
    text: "你开始怀疑要不要继续。",
    note: "这不是第一次，也不会是最后一次。",
    disclaimer: "怀疑是过程的一部分。"
  },
  {
    name: "继续尝试之签",
    text: "你还是想再试一次。",
    note: "哪怕理由不充分。",
    disclaimer: "好奇心有效。"
  },
  {
    name: "只是玩玩之签",
    text: "你并不想把这件事变严肃。",
    note: "这样也很好。",
    disclaimer: "不需要升级意义。"
  },
  {
    name: "暂停之签",
    text: "你想先停一下。",
    note: "不是放弃。",
    disclaimer: "暂停是合法状态。"
  },
  {
    name: "重新开始之签",
    text: "你想换一种方式再来。",
    note: "不必完全推翻。",
    disclaimer: "重来不等于失败。"
  },
  {
    name: "没想清楚之签",
    text: "你现在说不清自己在干嘛。",
    note: "这并不妨碍继续。",
    disclaimer: "模糊是允许的。"
  },
  {
    name: "慢慢来之签",
    text: "你开始接受节奏变慢。",
    note: "事情反而顺了一点。",
    disclaimer: "慢不等于停。"
  },
  {
    name: "不想解释之签",
    text: "你不想向别人说明。",
    note: "这很正常。",
    disclaimer: "不是所有事都要被理解。"
  },
  {
    name: "还在路上之签",
    text: "你还没到任何结论。",
    note: "但你没有偏离。",
    disclaimer: "在路上就够了。"
  }
];

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

  return {
    track: "mmm",
    fortune: randomFrom(mmmFortunes)
  };
}
