import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/TvT-dog/",
  dest: 'docs',
  lang: "zh-CN",
  title: "Ho1d_F0rward的知识库",
  description: "如题所示一个知识库",
  public:"${sourceDir}/images",
  theme,
  
  head: [
    ['meta', { name: 'referer', content: 'no-referer' }]
],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
