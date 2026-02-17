import type { MmmCopyTypeId } from "../types";

export type MmmCopyType = {
  id: MmmCopyTypeId;
  label: string;
  description: string;
  fortuneIds: readonly number[];
};

// 随心签类型用于标记签文气质，不改变签文本身。
export const MMM_COPY_TYPES: readonly MmmCopyType[] = [
  {
    id: "letItBe",
    label: "就这样吧",
    description: "我现在不太想改变什么。",
    fortuneIds: [1, 5, 8, 9, 14, 16, 21, 26, 30, 35, 36, 38]
  },
  {
    id: "stuck",
    label: "有点卡住",
    description: "我知道在想什么，但不知道怎么办。",
    fortuneIds: [2, 3, 7, 10, 15, 19, 22, 27, 29, 34, 37]
  },
  {
    id: "noExplain",
    label: "不想解释",
    description: "我不想说清楚，也不想交代。",
    fortuneIds: [11, 12, 13, 18, 24, 31]
  },
  {
    id: "stillCarrying",
    label: "其实已经在扛",
    description: "我不是没做事，只是有点撑。",
    fortuneIds: [4, 6, 17, 20, 23, 28, 33]
  },
  {
    id: "pause",
    label: "先停一下",
    description: "我想慢一点，再看看。",
    fortuneIds: [25, 32, 37]
  }
] as const;

export function getMmmCopyType(typeId: MmmCopyTypeId | null | undefined): MmmCopyType | undefined {
  if (!typeId) {
    return undefined;
  }
  return MMM_COPY_TYPES.find((item) => item.id === typeId);
}

export function getMmmCopyTypeByFortuneId(fortuneId: number): MmmCopyType | undefined {
  // Reverse lookup so later categories can override overlaps (e.g. 37 -> "先停一下").
  for (let i = MMM_COPY_TYPES.length - 1; i >= 0; i -= 1) {
    const item = MMM_COPY_TYPES[i];
    if (item.fortuneIds.includes(fortuneId)) {
      return item;
    }
  }
  return undefined;
}
