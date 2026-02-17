export type Track = "trad" | "mmm";

export interface TraditionalFortune {
  id: number;
  level: "上签" | "中签" | "下签";
  text: [string, string];
  explain: string;
  judge: string;
}

export interface MmmFortune {
  name: string;
  text: string;
  note: string;
  disclaimer: string;
}

export type DrawResult =
  | {
      track: "trad";
      fortune: TraditionalFortune;
    }
  | {
      track: "mmm";
      fortune: MmmFortune;
    };
