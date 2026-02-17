将三种签类型的媒体放在此目录下：

- 传统签
  - 静态图（ready）：public/images/ready-trad.jpg（兼容：ready-trad.jpg.png）
  - 视频（shaking）：public/videos/shake-trad.mp4（兼容：shake-trad.mp4.mp4）
  - 视频备用：public/videos/shake-trad.webm

- 勉勉强强签
  - 静态图（ready）：public/images/ready-mmm.jpg（兼容：ready-mmm.jpg.png）
  - 视频（shaking）：public/videos/shake-mmm.mp4（兼容：shake-mmm.mp4.mp4）
  - 视频备用：public/videos/shake-mmm.webm

- Yes / No 签
  - 静态图（ready）：public/images/ready-yesno.jpg（兼容：ready-yesno.jpg.png）
  - 视频（shaking）：public/videos/shake-yesno.mp4（兼容：shake-yesno.mp4.mp4）
  - 视频备用：public/videos/shake-yesno.webm

回退规则：

- 视频会继续回退到：/videos/shake-draw.mp4 -> /videos/shake-draw.mp4.mp4 -> /videos/shake-draw.webm
- 图片会继续回退到：/images/cat-ready.jpg -> /cat-ragdoll-seal-bicolor.jpg -> /videos/shake-draw.webm.png
- 若图片也缺失，最后回退到签筒动画，流程不会中断。
