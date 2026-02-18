export type Track = "trad" | "mmm" | "yesno";
export type MmmCopyTypeId = "letItBe" | "stuck" | "noExplain" | "stillCarrying" | "pause";
export type DecisionValue = "yes" | "no" | "wait";

export interface FortuneTags {
  positive: string[];
  negative: string[];
}

interface FortuneCardFields {
  topLine: string;
  themeWord: string;
  tags: FortuneTags;
  detailText: string;
}

export interface TraditionalFortune extends FortuneCardFields {
  id: number;
  type: "traditional";
  level: "上签" | "中签" | "下签";
  text: string;
}

export interface MmmFortune extends FortuneCardFields {
  id: number;
  type: "random";
  text: string;
}

export interface YesNoFortune extends FortuneCardFields {
  type: "decision";
  decision: DecisionValue;
  text: string;
}

export type DrawResult =
  | {
      track: "trad";
      fortune: TraditionalFortune;
    }
  | {
      track: "mmm";
      fortune: MmmFortune;
    }
  | {
      track: "yesno";
      fortune: YesNoFortune;
    };
