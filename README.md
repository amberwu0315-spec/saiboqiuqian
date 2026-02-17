# 勉勉强强工作室 · 赛博求签

React + Vite + TypeScript + Tailwind 版本，交互为“求签仪式模式”：

- 状态机：`chooseMode -> ready -> shaking -> result`
- `ready` 阶段支持两种触发：点击抽签 / 摇一摇
- `shaking` 固定 2.5~3.5 秒，含文案轮播与出签动画
- 支持主题切换：`pixel`（像素）/ `stationery`（文具）
- 切换主题不会重置当前步骤与抽签结果
- 抽签后可生成“签纸卡片”（含签文、农历/公历日期、时间戳、来源标识），可下载分享

## 运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## Tailwind 动画

- `tailwind.config.js` 中提供：
- `animate-tubePixel` / `animate-sticksPixel`
- `animate-tubeSoft` / `animate-sticksSoft`
- `animate-popUp`（出签）
