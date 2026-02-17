export type Track = "trad" | "mmm" | "yesno";
export type MmmCopyTypeId = "letItBe" | "stuck" | "noExplain" | "stillCarrying" | "pause";

export interface TraditionalFortune {
  id: number;
  level: "上签" | "中签" | "下签";
  text: string;
}

export interface MmmFortune {
  id: number;
  text: string;
}

export interface YesNoFortune {
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
