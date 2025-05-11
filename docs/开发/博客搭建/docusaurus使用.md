---
title: docusaurus使用
---
## MDX
### Importing components  导入组件
您还可以导入其他文件中定义的自己的组件或通过npm安装的第三方组件。
```
<!-- Docusaurus theme component -->
import TOCInline from '@theme/TOCInline';
<!-- External component -->
import Button from '@mui/material/Button';
<!-- Custom component -->
import BrowserWindow from '@site/src/components/BrowserWindow';
```
### Markdown
你可以将 Markdown 文件用作组件，并在其他位置导入它们，无论是在 Markdown 文件中还是在 React 页面中。每个 MDX 文件默认将其页面内容导出为 React 组件。在 “import” 语句中，您可以使用任何名称默认导入此组件，但它必须按照 React 的命名规则大写。
```js
import PartialExample from './_markdown-partial-example.mdx';

<PartialExample name="Sebastien" />
```
### Markdown 和 JSX 互作性
MDX 语法与 CommonMark 基本兼容，但要严格得多，因为你的 .mdx 文件可以使用 JSX 并被编译成真正的 React 组件（检查游乐场 ）。一些有效的 CommonMark 功能不适用于 MDX（ 更多信息 ），特别是：
缩进代码块：改用三个反引号
自动链接 （`<http：//localhost：3000>`）：使用常规链接语法代替 （ `[http://localhost:3000](http://localhost:3000)` ）
HTML 语法 （`<p style=“color： red;”>`）： 改用 JSX （`<p style={{color： 'red'}}>`）
未转义的 `{` 和 `<`：用 `\` 转义它们（`\{` 和 `\<`）


