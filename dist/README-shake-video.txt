将抽签媒体放在此目录下：

- 静态图（ready 阶段）：public/images/cat-ready.jpg（3:4）
- 视频（shaking 阶段）：public/videos/shake-draw.mp4（3:4）
- 视频兼容补充：public/videos/shake-draw.webm（可选）

说明：

- 代码当前会自动尝试：
  - 视频：/videos/shake-draw.webm -> /videos/shake-draw.mp4 -> /videos/shake-draw.mp4.mp4
  - 图片：/images/cat-ready.jpg -> /cat-ragdoll-seal-bicolor.jpg -> /videos/shake-draw.webm.png
- 如果视频缺失，会回退到图片。
- 如果图片也缺失，才会回退到现有签筒动画，不影响流程。
