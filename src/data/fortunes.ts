import type { DrawResult, MmmFortune, TraditionalFortune, Track, YesNoFortune } from "../types";

// Content rules:
// - Traditional uses the curated library below.
// - MMM / YesNo use the curated libraries below.
// - Each line stands alone.
// - No life promises, no long-term certainty.
// - Copy should make the reader pause briefly.
// - Yes / No gives direction words only and does not constrain draw frequency.

type TraditionalLibraryEntry = {
  type: "traditional";
  topLine: string;
  themeWord: string;
  tags: {
    positive: readonly string[];
    negative: readonly string[];
  };
  detailText: string;
};

const TRADITIONAL_LIBRARY: readonly TraditionalLibraryEntry[] = [
  {
    type: "traditional",
    topLine: "顺其自然，各得其所。",
    themeWord: "顺势",
    tags: { positive: ["静观", "保留"], negative: ["强推", "争辩"] },
    detailText: "事情在你看不见的地方推进。今天不必用力证明什么，留一点余地，反而更稳。"
  },
  {
    type: "traditional",
    topLine: "缓一步，心便宽一寸。",
    themeWord: "缓",
    tags: { positive: ["放慢", "整理"], negative: ["赶进度", "硬撑"] },
    detailText: "你不是慢，只是需要回到自己的节奏。先把呼吸放平，事情会更清晰。"
  },
  {
    type: "traditional",
    topLine: "不急求解，先安其心。",
    themeWord: "安",
    tags: { positive: ["安顿", "休息"], negative: ["逼问", "自责"] },
    detailText: "答案不是被逼出来的。先让心落地，再看下一步，你会更有力气。"
  },
  {
    type: "traditional",
    topLine: "事未成定，莫先自扰。",
    themeWord: "定",
    tags: { positive: ["观望", "耐心"], negative: ["预演坏事", "反复想"] },
    detailText: "你担心的多半还没发生。把注意力收回当下，先过好这一段路。"
  },
  {
    type: "traditional",
    topLine: "留白处，自有转圜。",
    themeWord: "留白",
    tags: { positive: ["暂停", "不解释"], negative: ["填满", "硬讲清"] },
    detailText: "有些空不是缺，是空间。你不必把每一格都填满，留白反而让你活得更顺。"
  },
  {
    type: "traditional",
    topLine: "心若不乱，路自分明。",
    themeWord: "澄",
    tags: { positive: ["清理", "专注"], negative: ["同时抓", "瞎忙"] },
    detailText: "你不是做不到，是被太多事拉扯。先减一件，再做一件，路会浮出来。"
  },
  {
    type: "traditional",
    topLine: "有守有放，方得从容。",
    themeWord: "取舍",
    tags: { positive: ["放下", "保留"], negative: ["全都要", "硬扛"] },
    detailText: "你不需要把所有责任都抱住。把一部分放回原处，你会更像自己。"
  },
  {
    type: "traditional",
    topLine: "不争一时，方见久长。",
    themeWord: "久",
    tags: { positive: ["耐心", "慢做"], negative: ["抢赢", "比较"] },
    detailText: "你现在的步伐也许不耀眼，但能走得久更重要。别急着证明，先把路走稳。"
  },
  {
    type: "traditional",
    topLine: "言少则清，念少则安。",
    themeWord: "简",
    tags: { positive: ["少说", "少想"], negative: ["解释过度", "脑补"] },
    detailText: "你不必把每个细节都交代清楚。收一收表达的力气，也是在保护自己。"
  },
  {
    type: "traditional",
    topLine: "先护己身，再论远途。",
    themeWord: "护",
    tags: { positive: ["边界", "休整"], negative: ["透支", "逞强"] },
    detailText: "你已经付出很多了。先把自己照看好，后面的路才走得稳、走得长。"
  },
  {
    type: "traditional",
    topLine: "风起时，先稳住脚。",
    themeWord: "稳",
    tags: { positive: ["稳住", "按部就班"], negative: ["乱改", "冲动"] },
    detailText: "外界变化并不等于你要立刻改变。先稳住核心，再做调整，才不容易伤到自己。"
  },
  {
    type: "traditional",
    topLine: "心有归处，便不慌张。",
    themeWord: "归",
    tags: { positive: ["回家", "回到身体"], negative: ["漂着", "硬撑社交"] },
    detailText: "你需要的不是更多答案，而是一个能安放自己的地方。先回到熟悉处，心会松开。"
  },
  {
    type: "traditional",
    topLine: "得失如潮，来去自有时。",
    themeWord: "潮",
    tags: { positive: ["接受", "等待"], negative: ["抓紧", "恐慌"] },
    detailText: "你不必把每次起伏都当成结论。潮起潮落很正常，先让情绪退一退。"
  },
  {
    type: "traditional",
    topLine: "心宽一分，路就多一分。",
    themeWord: "宽",
    tags: { positive: ["松一点", "不较真"], negative: ["死磕", "责备"] },
    detailText: "你卡住的地方，未必需要更用力。试着放宽一寸，你会看见更多可能。"
  },
  {
    type: "traditional",
    topLine: "不必尽善，先求可行。",
    themeWord: "可行",
    tags: { positive: ["先做", "迭代"], negative: ["完美", "拖延"] },
    detailText: "你不是不够好，只是标准太高。先让事情动起来，细节可以后面再修。"
  },
  {
    type: "traditional",
    topLine: "心若有界，事便有序。",
    themeWord: "界",
    tags: { positive: ["立界", "拒绝"], negative: ["全接", "讨好"] },
    detailText: "你不需要把所有期待都接住。界限不是冷漠，是让你有余力继续温柔。"
  },
  {
    type: "traditional",
    topLine: "看清局势，再动其身。",
    themeWord: "观",
    tags: { positive: ["观察", "记录"], negative: ["盲动", "急转"] },
    detailText: "你现在需要的是看，而不是冲。多看两天、多收一点信息，你会更确定。"
  },
  {
    type: "traditional",
    topLine: "言未出口，先问本心。",
    themeWord: "慎言",
    tags: { positive: ["缓说", "写下来"], negative: ["当场爆发", "硬怼"] },
    detailText: "你有情绪很正常。把话先放一放，给自己一口气，再决定要不要说。"
  },
  {
    type: "traditional",
    topLine: "凡事留三分，皆有回旋。",
    themeWord: "余地",
    tags: { positive: ["留后路", "不绝对"], negative: ["封死", "赌气"] },
    detailText: "你不必把关系或决定推到极端。留一点余地，不是退让，是更成熟的掌控。"
  },
  {
    type: "traditional",
    topLine: "事多不乱，先理一条。",
    themeWord: "梳理",
    tags: { positive: ["拆解", "排优先"], negative: ["一锅端", "自乱"] },
    detailText: "你被压住，是因为同时背太多。先抓一条线，把它理顺，其他就不再吵闹。"
  },
  {
    type: "traditional",
    topLine: "不怕迟，只怕耗尽。",
    themeWord: "续航",
    tags: { positive: ["补能量", "休息"], negative: ["透支", "熬"] },
    detailText: "你并不落后，你只是快没电了。先充电，再前进，才不会在半路崩塌。"
  },
  {
    type: "traditional",
    topLine: "行到水穷处，先坐一坐。",
    themeWord: "歇",
    tags: { positive: ["停下", "发呆"], negative: ["硬冲", "自逼"] },
    detailText: "走到这里已经不容易。你可以先坐一会儿，不需要立刻找到出口。"
  },
  {
    type: "traditional",
    topLine: "心若知足，便少许多累。",
    themeWord: "知足",
    tags: { positive: ["收回比较", "感受"], negative: ["攀比", "焦虑"] },
    detailText: "你累的一部分来自比较。把目光收回到自己身上，你会发现你已经走了很远。"
  },
  {
    type: "traditional",
    topLine: "不必争明白，先把日子过。",
    themeWord: "过",
    tags: { positive: ["过完今天", "吃饭睡觉"], negative: ["逼结论", "追问"] },
    detailText: "有些事现在讲不清。先把今天过好，身心回稳了，答案自然会靠近。"
  },
  {
    type: "traditional",
    topLine: "心软非错，须有分寸。",
    themeWord: "分寸",
    tags: { positive: ["温柔有界", "自保"], negative: ["委屈", "迎合"] },
    detailText: "你善良不是问题，没分寸才会受伤。把边界立起来，你的温柔才更值钱。"
  },
  {
    type: "traditional",
    topLine: "欲速则乱，慢即是快。",
    themeWord: "慢",
    tags: { positive: ["稳做", "复盘"], negative: ["催自己", "乱改"] },
    detailText: "你越急，越容易失手。慢一点把关键点做对，后面反而省下更多时间。"
  },
  {
    type: "traditional",
    topLine: "一念放下，万事轻些。",
    themeWord: "放下",
    tags: { positive: ["松手", "不追"], negative: ["执拗", "纠缠"] },
    detailText: "你抓得太紧了，才会这么累。放下一点，不是失败，是给自己喘气的空间。"
  },
  {
    type: "traditional",
    topLine: "不求尽得，但求无愧。",
    themeWord: "无愧",
    tags: { positive: ["尽力", "放过自己"], negative: ["苛责", "否定"] },
    detailText: "你已经在尽力了。别用结果否定过程，今天能做到这一步，就值得被肯定。"
  },
  {
    type: "traditional",
    topLine: "心若向内，外界便轻。",
    themeWord: "向内",
    tags: { positive: ["回到自己", "自省"], negative: ["被评价牵走", "讨好"] },
    detailText: "外界声音很吵，但你可以选择不全接。回到自己的感受里，心就会更稳。"
  },
  {
    type: "traditional",
    topLine: "不必逞强，柔亦有力。",
    themeWord: "柔",
    tags: { positive: ["求助", "坦诚"], negative: ["硬扛", "装没事"] },
    detailText: "你不需要靠逞强证明价值。承认自己会累、会怕，本身也是一种力量。"
  },
  {
    type: "traditional",
    topLine: "事若难行，先改其法。",
    themeWord: "换法",
    tags: { positive: ["换路径", "试小步"], negative: ["死磕", "硬推"] },
    detailText: "你卡住不代表你不行，可能只是方法不适配。换一种更轻的方式，事情会动起来。"
  },
  {
    type: "traditional",
    topLine: "不争口舌，先护心气。",
    themeWord: "护气",
    tags: { positive: ["少争", "离开现场"], negative: ["吵赢", "内耗"] },
    detailText: "你赢了道理也未必好受。把心气护住，比争一时输赢更重要。"
  },
  {
    type: "traditional",
    topLine: "所求不必多，所守须清楚。",
    themeWord: "守",
    tags: { positive: ["明确底线", "聚焦"], negative: ["贪多", "分心"] },
    detailText: "你真正想要的可能很简单。把重点守住，别被次要的拉走，你会更安心。"
  },
  {
    type: "traditional",
    topLine: "心定则静，静而能察。",
    themeWord: "察",
    tags: { positive: ["静下来", "看细节"], negative: ["急断", "粗糙"] },
    detailText: "你需要一点安静来听见真实。先静一静，再去看，你会发现关键点一直在那。"
  },
  {
    type: "traditional",
    topLine: "今日不求多，求一件成。",
    themeWord: "一件",
    tags: { positive: ["完成一个", "收尾"], negative: ["开太多", "焦虑"] },
    detailText: "你不是效率低，是任务太散。今天只做成一件事，就足够让你重新站稳。"
  },
  {
    type: "traditional",
    topLine: "缘起缘落，皆有其理。",
    themeWord: "缘",
    tags: { positive: ["释怀", "不追问"], negative: ["追因果", "自责"] },
    detailText: "有些失去不一定是谁的错。允许它发生，也允许自己难过，然后慢慢往前。"
  },
  {
    type: "traditional",
    topLine: "不必强明，先求心明。",
    themeWord: "明",
    tags: { positive: ["厘清感受", "写下"], negative: ["逼答案", "硬想"] },
    detailText: "你要的不是一个漂亮结论，而是内心的清楚。先把感受写出来，你会更明白自己。"
  }
] as const;

type RandomLibraryEntry = {
  type: "random";
  topLine: string;
  themeWord: string;
  tags: {
    positive: readonly string[];
    negative: readonly string[];
  };
  detailText: string;
};

const RANDOM_LIBRARY: readonly RandomLibraryEntry[] = [
  {
    type: "random",
    topLine: "今天不用很厉害。",
    themeWord: "够了",
    tags: { positive: ["偷懒", "放松"], negative: ["证明", "硬撑"] },
    detailText: "你已经做了不少。现在不想再努力一下也没关系，先把自己放回安全的位置。"
  },
  {
    type: "random",
    topLine: "先活着，再说别的。",
    themeWord: "先过",
    tags: { positive: ["吃饭", "睡觉"], negative: ["自责", "逼迫"] },
    detailText: "你不是不行，你只是太累了。先把基本的照顾做好，其他事晚点再谈也行。"
  },
  {
    type: "random",
    topLine: "你可以先不回应。",
    themeWord: "静音",
    tags: { positive: ["不回", "缓一缓"], negative: ["立刻解释", "迎合"] },
    detailText: "不是所有消息都需要马上回。你先把自己稳住，等你愿意的时候再开口。"
  },
  {
    type: "random",
    topLine: "别急着把情绪修好。",
    themeWord: "允许",
    tags: { positive: ["难过", "承认"], negative: ["压下去", "装没事"] },
    detailText: "情绪不是 bug，不需要立刻修复。你可以难受一会儿，这很正常，也很人类。"
  },
  {
    type: "random",
    topLine: "现在的你，需要慢一点。",
    themeWord: "慢点",
    tags: { positive: ["放慢", "呼吸"], negative: ["赶", "催"] },
    detailText: "你不是落后，你只是被拖得太紧。慢一点，让身体跟上来，你会更踏实。"
  },
  {
    type: "random",
    topLine: "不想社交也没关系。",
    themeWord: "收回",
    tags: { positive: ["独处", "躲一下"], negative: ["硬聊", "勉强"] },
    detailText: "你不需要一直在线。收回一点精力给自己，等充满电再出去也不迟。"
  },
  {
    type: "random",
    topLine: "你没有义务一直温柔。",
    themeWord: "边界",
    tags: { positive: ["拒绝", "保护自己"], negative: ["讨好", "委屈"] },
    detailText: "温柔不是免费服务。你可以说不，可以停下，可以先护住自己，这并不自私。"
  },
  {
    type: "random",
    topLine: "别把今天当成结论。",
    themeWord: "今天",
    tags: { positive: ["先过", "不总结"], negative: ["下结论", "否定"] },
    detailText: "今天的状态不代表你一直如此。别急着给自己盖章，先把这一段熬过去就好。"
  },
  {
    type: "random",
    topLine: "你可以先不做决定。",
    themeWord: "缓判",
    tags: { positive: ["再等等", "观察"], negative: ["逼自己", "立刻定"] },
    detailText: "不是每个选择都要马上落地。给自己一点时间，你会更确定自己要什么。"
  },
  {
    type: "random",
    topLine: "你已经很努力在撑了。",
    themeWord: "看见",
    tags: { positive: ["被理解", "放松"], negative: ["自我否定", "硬扛"] },
    detailText: "我知道你不是不想好好过，你是在努力扛住。先承认这很难，你就不会那么孤单。"
  },
  {
    type: "random",
    topLine: "没关系，先乱一阵子。",
    themeWord: "乱",
    tags: { positive: ["承认混乱", "慢整理"], negative: ["装有序", "焦虑"] },
    detailText: "混乱不是失败，是过渡期。你可以先乱一阵子，再一点点把生活捡回来。"
  },
  {
    type: "random",
    topLine: "别跟自己讲道理了。",
    themeWord: "抱抱",
    tags: { positive: ["安抚", "放下逻辑"], negative: ["说服自己", "硬扛"] },
    detailText: "你现在需要的不是道理，是被安抚。先让心软下来，思考会在之后回来的。"
  },
  {
    type: "random",
    topLine: "你不需要一直向上。",
    themeWord: "平",
    tags: { positive: ["平一点", "休息"], negative: ["冲刺", "自逼"] },
    detailText: "人生不是 KPI。你可以有低潮、有停顿，这并不丢人，只是正常起伏。"
  },
  {
    type: "random",
    topLine: "先把自己哄好再说。",
    themeWord: "哄哄",
    tags: { positive: ["吃点好的", "睡一觉"], negative: ["硬顶", "忍着"] },
    detailText: "你已经很委屈了。先照顾一下自己，哪怕只是喝口热的，也算在努力活着。"
  },
  {
    type: "random",
    topLine: "你可以不解释那么多。",
    themeWord: "省话",
    tags: { positive: ["少解释", "保持沉默"], negative: ["证明", "辩白"] },
    detailText: "不是所有人都值得你解释。把话省下来，留给真正理解你的人，也留给你自己。"
  },
  {
    type: "random",
    topLine: "今天先做到“没崩”就行。",
    themeWord: "没崩",
    tags: { positive: ["稳住", "放过"], negative: ["苛求", "逞强"] },
    detailText: "你不必天天高光。今天能稳住不崩盘，就已经很厉害了，真的。"
  },
  {
    type: "random",
    topLine: "你可以先不那么懂事。",
    themeWord: "任性",
    tags: { positive: ["做自己", "拒绝"], negative: ["懂事过头", "委屈"] },
    detailText: "你一直在照顾别人感受。今天也照顾一下你自己吧，不必总把自己放到最后。"
  },
  {
    type: "random",
    topLine: "别急着把空填满。",
    themeWord: "空",
    tags: { positive: ["留白", "发呆"], negative: ["刷屏", "填满"] },
    detailText: "空下来不是浪费，是恢复。你不需要把每一分钟都塞满，留白会让你更有力气。"
  },
  {
    type: "random",
    topLine: "你可以先把期待放低。",
    themeWord: "放低",
    tags: { positive: ["降低标准", "轻一点"], negative: ["高压", "苛责"] },
    detailText: "期待太高会把你压扁。把标准放低一点，你会更容易呼吸，也更容易继续。"
  },
  {
    type: "random",
    topLine: "你不是懒，你是累。",
    themeWord: "累了",
    tags: { positive: ["休息", "补能量"], negative: ["骂自己", "硬撑"] },
    detailText: "别用“懒”攻击自己。你只是被消耗太久了，先睡一觉再说，好吗。"
  },
  {
    type: "random",
    topLine: "先别追答案，先追舒服。",
    themeWord: "舒服",
    tags: { positive: ["找舒服", "放松"], negative: ["钻牛角尖", "逼问"] },
    detailText: "你一直在追一个确定的答案。先让自己舒服一点，很多事会在松下来时变清楚。"
  },
  {
    type: "random",
    topLine: "你可以先把心放回自己身上。",
    themeWord: "回收",
    tags: { positive: ["收回注意力", "自我照顾"], negative: ["被评价牵走", "讨好"] },
    detailText: "外界声音太多，会把你撕开。先把注意力收回来，你会重新听见自己的真实想法。"
  },
  {
    type: "random",
    topLine: "别急着变好，先别变差。",
    themeWord: "保底",
    tags: { positive: ["保底", "稳住作息"], negative: ["透支", "硬冲"] },
    detailText: "你现在不需要飞跃式成长。先把自己保住，别再继续消耗，这就是很重要的进展。"
  },
  {
    type: "random",
    topLine: "你可以先不跟任何人解释。",
    themeWord: "不说",
    tags: { positive: ["沉默", "自我保护"], negative: ["解释", "争辩"] },
    detailText: "解释很累，而且未必被理解。你先留住力气，等你准备好了再说也不迟。"
  },
  {
    type: "random",
    topLine: "你已经做到了很多人做不到的事。",
    themeWord: "肯定",
    tags: { positive: ["认可自己", "停一下"], negative: ["否定", "比较"] },
    detailText: "别把自己放进比较的绞肉机。你能走到现在已经很不容易，值得被认真肯定。"
  },
  {
    type: "random",
    topLine: "先别管结果，先管你自己。",
    themeWord: "先你",
    tags: { positive: ["照顾自己", "边界"], negative: ["只管结果", "硬扛"] },
    detailText: "你太习惯为结果负责了。今天先管你的感受，你稳定了，事情才会更顺。"
  },
  {
    type: "random",
    topLine: "你可以先从一件小事开始。",
    themeWord: "小步",
    tags: { positive: ["做一点", "开始"], negative: ["全盘推翻", "焦虑"] },
    detailText: "你不是不会做，是被大目标吓住了。先做一件小事，让自己重新动起来。"
  },
  {
    type: "random",
    topLine: "你现在需要的是“被抱住”。",
    themeWord: "抱住",
    tags: { positive: ["陪伴", "求助"], negative: ["硬撑", "装强"] },
    detailText: "你不必一个人扛着。找一个安全的人或安全的地方，让自己被抱住一会儿。"
  },
  {
    type: "random",
    topLine: "别急着把自己推回战场。",
    themeWord: "撤退",
    tags: { positive: ["休整", "退一步"], negative: ["硬上", "逞强"] },
    detailText: "你已经很勇敢了。撤退不是逃，是休整；先把自己修好，再回去也来得及。"
  },
  {
    type: "random",
    topLine: "你可以对自己偏心一点。",
    themeWord: "偏心",
    tags: { positive: ["对自己好", "满足"], negative: ["委屈", "忍耐"] },
    detailText: "你总在照顾别人。今天偏心一点，把资源给自己，这不是自私，这是必要。"
  },
  {
    type: "random",
    topLine: "不开心也算一种真实。",
    themeWord: "真实",
    tags: { positive: ["承认", "不强颜"], negative: ["装开心", "压抑"] },
    detailText: "你不必一直正向。允许不开心存在，反而会让它更快过去，你也会更轻。"
  },
  {
    type: "random",
    topLine: "你可以先不努力，先活着。",
    themeWord: "先活",
    tags: { positive: ["休息", "放过"], negative: ["逼自己", "自责"] },
    detailText: "努力不是唯一价值。你先把自己留住，先好好呼吸，其他都可以慢慢再来。"
  },
  {
    type: "random",
    topLine: "你不需要立刻振作。",
    themeWord: "不急",
    tags: { positive: ["躺一会儿", "缓"], negative: ["立刻振作", "硬撑"] },
    detailText: "振作不是按钮按一下就行。你可以先软下来，等力气回来了再站起来。"
  },
  {
    type: "random",
    topLine: "别把不确定当成错。",
    themeWord: "不定",
    tags: { positive: ["容纳不定", "等待"], negative: ["逼确定", "焦躁"] },
    detailText: "不确定是正常阶段，不是你做错了。允许它存在，你就不会被它吓着。"
  },
  {
    type: "random",
    topLine: "你可以先把手机放远一点。",
    themeWord: "降噪",
    tags: { positive: ["离线", "安静"], negative: ["刷屏", "信息过载"] },
    detailText: "信息太多会放大焦虑。把噪音关小一点，给自己一点安静，你会更稳。"
  },
  {
    type: "random",
    topLine: "你已经尽力了，真的。",
    themeWord: "尽力",
    tags: { positive: ["认可", "休息"], negative: ["苛责", "否定"] },
    detailText: "别再用“还不够”折磨自己。你已经尽力了，先把心放下来，你会更有余力。"
  },
  {
    type: "random",
    topLine: "先别硬撑，把委屈放出来。",
    themeWord: "放出",
    tags: { positive: ["哭一哭", "说出来"], negative: ["憋着", "装好"] },
    detailText: "委屈憋久了会变成更大的疲惫。让它出来一点，你会更轻，也更真实。"
  }
] as const;

type DecisionLibraryEntry = {
  type: "decision";
  topLine: string;
  themeWord: string;
  tags: {
    positive: readonly string[];
    negative: readonly string[];
  };
  detailText: string;
  decision: "yes" | "no" | "wait";
};

const DECISION_LIBRARY: readonly DecisionLibraryEntry[] = [
  {
    type: "decision",
    topLine: "现在行动，不算冲动。",
    themeWord: "去做",
    tags: { positive: ["推进", "尝试"], negative: ["反复假设", "拖延"] },
    detailText: "你已经想得够久了。先走一步看看反馈，比继续在脑内打转更能让你安心。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "可以选它，但别孤注一掷。",
    themeWord: "可行",
    tags: { positive: ["小步试", "留余地"], negative: ["全押", "赌气"] },
    detailText: "你可以做这个选择，但用“小步验证”的方式更稳。给自己留后路，你会更踏实。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "你想要的，值得试一次。",
    themeWord: "试试",
    tags: { positive: ["尝试", "表达"], negative: ["压着", "自我否定"] },
    detailText: "你并不是心血来潮，而是憋很久了。试一次不等于必须成功，只是给自己一个交代。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "别再等一个完美时机。",
    themeWord: "现在",
    tags: { positive: ["开始", "推进"], negative: ["等完美", "拖"] },
    detailText: "完美时机很少出现。你可以从不完美开始，边走边修，才会真正靠近你想要的。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "你有能力接住结果。",
    themeWord: "能接",
    tags: { positive: ["承担", "行动"], negative: ["自我怀疑", "退缩"] },
    detailText: "你担心是正常的，但你也有修复和调整的能力。做了再看，比一直怕更折磨。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "这一步不大，却很关键。",
    themeWord: "关键",
    tags: { positive: ["迈出", "确认"], negative: ["卡住", "反复想"] },
    detailText: "你不需要一次到位。先迈出这一步，让事情开始流动，你会更清楚下一步怎么走。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "选择它，会更接近你自己。",
    themeWord: "贴近",
    tags: { positive: ["按内心", "不讨好"], negative: ["迎合", "委屈"] },
    detailText: "你已经为别人考虑太久了。这个选择更贴近你的真实需要，选它不会错在“对不起自己”。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "可以答应，但要说清边界。",
    themeWord: "可答",
    tags: { positive: ["立界", "沟通"], negative: ["全接", "硬扛"] },
    detailText: "你可以同意，但别把自己搭进去。把边界说清楚，能让你既温柔又不受伤。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "去做吧，别再内耗了。",
    themeWord: "别耗",
    tags: { positive: ["行动", "收敛杂念"], negative: ["内耗", "拖"] },
    detailText: "你耗在“想”里太久了。做一次就会知道更多信息，内耗也会立刻变少。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "这次直觉很靠谱。",
    themeWord: "直觉",
    tags: { positive: ["相信自己", "去做"], negative: ["过度分析", "自疑"] },
    detailText: "你已经反复衡量了。直觉出现不是偶然，信它一次，不代表盲目，而是成熟的信任。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "可以争取，但别苦撑。",
    themeWord: "争取",
    tags: { positive: ["表达", "谈清楚"], negative: ["苦撑", "硬扛"] },
    detailText: "你可以争取你想要的，但不要用牺牲自己来换。谈清楚条件，你会更有底气。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "你准备好了，就差一步。",
    themeWord: "迈步",
    tags: { positive: ["确认", "行动"], negative: ["犹豫", "拖"] },
    detailText: "你已经把该想的都想了。剩下的只能靠行动验证，迈出去，你会松一口气。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "可以开始，但先从小处。",
    themeWord: "小启",
    tags: { positive: ["小步", "试错"], negative: ["一口吃完", "焦虑"] },
    detailText: "你可以开始，但别给自己太大压力。从小处动起来，你会越做越稳。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "就按你想的那样来。",
    themeWord: "照做",
    tags: { positive: ["执行", "信任"], negative: ["摇摆", "自疑"] },
    detailText: "你已经有答案了，只是需要被允许。照你想的做，后续再调整也来得及。",
    decision: "yes"
  },
  {
    type: "decision",
    topLine: "先别选它，你会更累。",
    themeWord: "别扛",
    tags: { positive: ["保留体力", "撤一步"], negative: ["透支", "硬上"] },
    detailText: "这条路会消耗你很多，而你现在的电量不够。拒绝不是退缩，是给自己留命。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "这不是最佳时机。",
    themeWord: "未到",
    tags: { positive: ["观望", "准备"], negative: ["抢跑", "冲动"] },
    detailText: "你并不差，只是时机不合适。现在硬上容易受伤，先准备一下会更稳。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "别用委屈换一个答案。",
    themeWord: "不换",
    tags: { positive: ["自尊", "边界"], negative: ["讨好", "低姿态"] },
    detailText: "如果你必须委屈自己才能得到回应，那代价太大。先把自己护住，你更值得。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "你其实并不想要它。",
    themeWord: "不想",
    tags: { positive: ["诚实", "停下"], negative: ["勉强", "硬答应"] },
    detailText: "你犹豫不是因为难选，而是你不想。承认这一点会更轻松，也更靠近自己。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "别继续加码了。",
    themeWord: "止损",
    tags: { positive: ["收手", "保留"], negative: ["加码", "硬撑"] },
    detailText: "你已经投入很多，但继续投入不一定更好。停下来不是失败，是更成熟的选择。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "这件事会拉低你。",
    themeWord: "拖累",
    tags: { positive: ["远离", "拒绝"], negative: ["被牵着走", "消耗"] },
    detailText: "你会在这里不断消耗自己。离开或拒绝并不残忍，是把你从泥里拉出来。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "别为了证明去做。",
    themeWord: "别证",
    tags: { positive: ["放下证明", "回到自己"], negative: ["争气", "硬上"] },
    detailText: "如果动机是“证明我行”，你会很痛苦。别把自己送上审判席，换个选择更自在。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "这次先不回应更好。",
    themeWord: "先不",
    tags: { positive: ["沉默", "缓一下"], negative: ["立刻回", "解释过度"] },
    detailText: "你不需要马上给态度。先让自己缓一缓，等情绪落下去再决定说什么。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "别把自己放到尴尬里。",
    themeWord: "别去",
    tags: { positive: ["自保", "避开"], negative: ["硬凑", "勉强"] },
    detailText: "你现在去做，只会让你更不舒服。避开不是胆小，是懂得照顾自己的感受。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "你现在需要的是休整。",
    themeWord: "先歇",
    tags: { positive: ["休息", "补能量"], negative: ["硬冲", "透支"] },
    detailText: "你不是不行，是太累。先歇一歇再做选择，才不会在疲惫里做出让你后悔的决定。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "别答应，你会后悔。",
    themeWord: "别应",
    tags: { positive: ["拒绝", "边界"], negative: ["答应", "硬扛"] },
    detailText: "你心里其实已经不舒服了。别用“好人”绑架自己，拒绝一次，你会更轻。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "这不是你的责任。",
    themeWord: "放回",
    tags: { positive: ["归位", "卸下"], negative: ["背锅", "内耗"] },
    detailText: "你在替别人扛不该扛的东西。把责任放回原处，你会重新呼吸。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "这条路不适合现在的你。",
    themeWord: "不合",
    tags: { positive: ["换路", "调整"], negative: ["死磕", "硬走"] },
    detailText: "不适合不代表你差，只是阶段不匹配。换条路会更省力，也更容易走远。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "先别继续推进。",
    themeWord: "暂停",
    tags: { positive: ["停一下", "复盘"], negative: ["硬推", "加压"] },
    detailText: "你现在推进只会增加摩擦。先停一下复盘，你会更清楚哪里需要调整。",
    decision: "no"
  },
  {
    type: "decision",
    topLine: "先等等，信息还不够。",
    themeWord: "再等等",
    tags: { positive: ["收集信息", "观察"], negative: ["仓促", "赌"] },
    detailText: "你不是犹豫，是缺少关键信息。先补齐一点，再决定会更安心也更稳。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先缓一缓，情绪太吵。",
    themeWord: "降噪",
    tags: { positive: ["缓一缓", "冷静"], negative: ["带情绪决定", "冲动"] },
    detailText: "情绪很大时做决定容易偏。先让自己安静下来，等心不那么吵了再选。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "今天先不定，明天再看。",
    themeWord: "明天",
    tags: { positive: ["睡一觉", "再判断"], negative: ["逼自己", "立刻定"] },
    detailText: "你现在太累了。睡一觉后你的感受会更清晰，很多纠结也会自然变小。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先做小试，再做大选。",
    themeWord: "小试",
    tags: { positive: ["试验", "小步"], negative: ["一口气决定", "全押"] },
    detailText: "不用一下子选到底。先做个小试验拿到反馈，你就会更知道自己要什么。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先把底线说清再选。",
    themeWord: "先说",
    tags: { positive: ["谈清楚", "立界"], negative: ["含糊", "默许"] },
    detailText: "你纠结的点在边界不清。先把底线讲明白，再决定要不要继续，会更舒服。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先别急，先对齐期待。",
    themeWord: "对齐",
    tags: { positive: ["确认", "沟通"], negative: ["猜", "脑补"] },
    detailText: "你现在是在猜对方、猜未来。先把期待对齐，你会少很多内耗，也更好选。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先把手头事收尾再选。",
    themeWord: "收尾",
    tags: { positive: ["收尾", "清空"], negative: ["边做边选", "分心"] },
    detailText: "你现在负载太高，选择会变得更难。先收尾一部分，让脑子空一点再决定。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先问自己：你怕什么？",
    themeWord: "看怕",
    tags: { positive: ["写下来", "看清"], negative: ["逃避", "硬选"] },
    detailText: "你纠结的核心可能是恐惧而不是选项。先把“怕什么”写清，你会更知道怎么选。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先不答复，留一点空间。",
    themeWord: "留空",
    tags: { positive: ["缓", "不立刻回"], negative: ["马上答", "解释过多"] },
    detailText: "你不需要立刻表态。留一点空间给自己，也给对方，你会更从容。",
    decision: "wait"
  },
  {
    type: "decision",
    topLine: "先把最坏情况想明白。",
    themeWord: "预案",
    tags: { positive: ["做预案", "稳住"], negative: ["慌", "乱选"] },
    detailText: "你不是不能选，是怕后果。先想好最坏情况怎么接住，你就会更敢做决定。",
    decision: "wait"
  }
] as const;

const TRAD_UP_IDS = new Set([1, 2, 3, 5, 7, 8, 19, 21, 22, 29, 35, 36]);
const TRAD_DOWN_IDS = new Set([11, 13, 18, 23, 24, 32, 37]);

function getTraditionalLevel(id: number): TraditionalFortune["level"] {
  if (TRAD_UP_IDS.has(id)) {
    return "上签";
  }
  if (TRAD_DOWN_IDS.has(id)) {
    return "下签";
  }
  return "中签";
}

export const traditionalFortunes: TraditionalFortune[] = TRADITIONAL_LIBRARY.map((entry, index) => {
  const id = index + 1;
  return {
    type: "traditional",
    id,
    level: getTraditionalLevel(id),
    text: entry.topLine,
    topLine: entry.topLine,
    themeWord: entry.themeWord,
    tags: {
      positive: [...entry.tags.positive],
      negative: [...entry.tags.negative]
    },
    detailText: entry.detailText
  };
});

export const mmmFortunes: MmmFortune[] = RANDOM_LIBRARY.map((entry, index) => ({
  type: "random",
  id: index + 1,
  text: entry.topLine,
  topLine: entry.topLine,
  themeWord: entry.themeWord,
  tags: {
    positive: [...entry.tags.positive],
    negative: [...entry.tags.negative]
  },
  detailText: entry.detailText
}));

export const yesNoFortunes: YesNoFortune[] = DECISION_LIBRARY.map((entry) => ({
  type: "decision",
  decision: entry.decision,
  text: entry.topLine,
  topLine: entry.topLine,
  themeWord: entry.themeWord,
  tags: {
    positive: [...entry.tags.positive],
    negative: [...entry.tags.negative]
  },
  detailText: entry.detailText
}));

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
