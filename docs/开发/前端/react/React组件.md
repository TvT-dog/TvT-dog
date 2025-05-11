---
title: react组件
---
## 环境搭建
1. **安装 Node.js 和 npm**
2. **安装 Vite构建环境**
```shell
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

```
my-app/                        # 项目根目录
├── index.html                 # 应用的主 HTML 文件，入口页面（相当于 public/index.html 在 CRA 中）
├── package.json               # 项目配置文件，包含依赖、脚本命令等信息
├── vite.config.js             # Vite 的核心配置文件，用于插件管理、别名配置、开发服务器设置等
├── .gitignore                 # Git 版本控制忽略文件列表（如 node_modules 不会被提交）
├── tsconfig.json              # TypeScript 配置文件（仅在使用 TypeScript 模板时生成）
├── tsconfig.node.json         # Node.js 环境下使用的 TypeScript 配置（支持 Vite 内部配置）
├── public/                    # 静态资源目录，里面的文件不会被构建工具处理，原样复制到输出目录
│   └── vite.svg               # 示例静态资源图片（放在 public 下，可通过 /vite.svg 访问）
└── src/                       # 开发源代码目录，所有的 React 组件和资源都放在这里
    ├── main.jsx               # React 应用的入口文件，类似 CRA 中的 index.js，挂载根组件
    ├── App.jsx                # 根组件，是 React 应用的顶层组件，通常作为其他组件的容器
    ├── App.css                # App.jsx 组件对应的样式文件（可局部或全局使用）
    └── assets/                # 构建过程中会优化处理的资源（如图片），例如压缩、按需打包
        └── react.svg          # 示例图片资源，会在构建时被优化并处理
```

## 组件
官方文档对React 组件的定义是一段可以使用标签进行扩展 的 JavaScript 函数。我们其实可以扩展理解一下，React 组件本质上是一个 JavaScript 函数，但它可以通过 JSX（一种类似 HTML 标签的语法）来描述用户界面的结构，从而实现 UI 的扩展和组合 。
### 组件入门
#### 代码结构
```js
export default function Welcome(props) {
  return <h1>你好，{props.name}</h1>;
}
```

1. 它们的名字总是以大写字母开头。
2. 它们返回 JSX 标签。
3. 使用export default来导出最终的页面。
#### UI描述
因为我们要描述前端，但前文我们提到React本质是 JavaScript 函数。所以使用了**JSX（JavaScript XML）** 来描述 UI 结构。JSX 让你可以像写 HTML 一样编写 React 元素，然后在 JavaScript 中直接使用这些标签。
```js
function App() {
  return (
    <div>
      <Welcome name="小明" />
      <p>欢迎学习 React！</p>
    </div>
  );
}
```

虽然看起来像 HTML，但 JSX 实际上是 JavaScript 的一种扩展语法，最终会被 Babel 等工具编译成普通的 JavaScript 函数调用（如 React.createElement(...)）
```js
<h1>你好</h1>

React.createElement('h1', null, '你好');
```
#### 嵌套、复用和组合
这里其实就解释了为什么要设计为JavaScript 函数。函数可以很方便的被我们再次进行使用和封装。
你可以将多个小功能的组件组合成一个大的组件。比如一个网页的导航栏可以由多个按钮、链接等组件组成。
```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```
### 组件的导入导出
在 React 中，组件的**导入与导出** 是实现组件复用、组织项目结构的重要机制。通过将组件拆分到不同的文件中并进行导出和导入，可以提高代码的可维护性和可读性
#### 默认导出
适用于一个文件只导出一个组件的情况。使用 `export default` 来导出组件。

所有组件都定义在 **根组件** `App.js` 文件中
```js
App.js

function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```
我们可以改为
```js
App.js

import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js
Gallery.js

function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```
#### 具名导出
适用于一个文件中定义多个组件，需要分别导出的情况。使用 `export` 关键字直接在组件前声明。
比如你只想展示一个 `Profile` 组，而不展示整个图集。你也可以导出 `Profile` 组件。但 `Gallery.js` 中已包含 **默认** 导出，此时，你不能定义 **两个** 默认导出。但你可以将其在新文件中进行默认导出，或者将 `Profile` 进行 **具名** 导出。**同一文件中，有且仅有一个默认导出，但可以有多个具名导出！**

```js
App.js

import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Gallery />
      <Profile />
    </div>
  );
}
```
可以看到导入是使用`{}`,并且导出使用export function关键字
```js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```
### JSX进阶
我们知道网页是构建在 HTML、CSS 和 JavaScript 之上的。多年以来，web 开发者都是将网页内容存放在 HTML 中，样式放在 CSS 中，而逻辑则放在 JavaScript 中 —— 通常是在不同的文件中！页面的内容通过标签语言描述并存放在 HTML 文件中，而逻辑则单独存放在 JavaScript 文件中。但随着 Web 的交互性越来越强，逻辑越来越决定页面中的内容。JavaScript 控制着 HTML 的内容！这也是为什么 在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。

同时我们要注意JSX and React 是相互独立的东西。但它们经常一起使用，但你可以单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。
#### HTML to JSX
假如我们目标是要转化下列的HTML
```html
<h1>海蒂·拉玛的待办事项</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>发明一种新式交通信号灯
    <li>排练一个电影场景
    <li>改进频谱技术
</ul>
```
我们如果直接复制,你会发现实际无法生效。
```js
export default function TodoList() {
  return (
    // 这不起作用！
    <h1>海蒂·拉玛的待办事项</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>发明一种新式交通信号灯
      <li>排练一个电影场景
      <li>改进频谱技术
    </ul>
  );
}
```
##### 单根元素
如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来，JSX只能返回一个根元素。 JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

```html
<div>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>

  </ul>
</div>
```
如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替：
```html
<>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    
  </ul>
</>
```
这个空标签被称作`Fragment`,React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。
##### 标签必须闭合
JSX 要求标签必须正确闭合,像 `<img>`这样的自闭合标签必须书写成 `<img />`.那么现在我们的代码就变成了
```html
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
      <li>发明一种新式交通信号灯</li>
      <li>排练一个电影场景</li>
      <li>改进频谱技术</li>
  </ul>
</>
```
##### 使用驼峰式命名法给大部分属性命名
JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 - 符号或者像 class 这样的保留字。

这就是为什么在 React 中，大部分 HTML 和 SVG 属性都用驼峰式命名法表示。例如，需要用 strokeWidth 代替 stroke-width。由于 class 是一个保留字，所以在 React 中需要用 className 来代替。这也是 DOM 属性中的命名:
```html
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```
##### 使用 JSX 转化器
将现有的 HTML 中的所有属性转化 JSX 的格式是很繁琐的。我们建议使用 转化器 将 HTML 和 SVG 标签转化为 JSX。这种转化器在实践中非常有用。[转化器](https://transform.tools/html-to-jsx)
####  JavaScript In JSX
##### 大括号：JSX中的JavaScript通道
JSX 是一种编写 JavaScript 的特殊方式。这为在大括号 `{ }` 中使用 JavaScript 带来了可能。大括号内的任何 JavaScript 表达式都能正常运行，包括像 `formatDate()` 这样的函数调用：
```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```
**使用场景：**
1. 用作 JSX 标签内的**文本**：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效。
2. 用作紧跟在 `=` 符号后的 **属性**：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。
##### 双大括号：JSX 中的 CSS 和 对象
`{{` 和 `}}`并不是什么特殊的语法：它只是包在 JSX 大括号内的 JavaScript 对象。除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 `{ name: "Hedy Lamarr", inventions: 5 }`。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：`person={{ name: "Hedy Lamarr", inventions: 5 }}`。
### 组件通信：props
Props 是你传递给 JSX 标签的信息。例如，className、src、alt、width 和 height 便是一些可以传递给img的 props。
```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```
#### 向子组件传递
首先，将一些 props 传递给 Avatar。例如，让我们传递两个 props：person（一个对象）和 size（一个数字）。
```js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}
```
如果你想在没有指定值的情况下给 prop 一个默认值，你可以通过在参数后面写 = 和默认值来进行解构：
```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

我们还可以直接传递组件给子组件,它允许开发者通过 `children` 属性将一段 JSX 内容（可以是其他组件、HTML 标签或任意有效的 JSX）嵌套到目标组件中。这种方式极大地增强了组件的灵活性和可复用性。

这里的children就代表的Avatar组件。
```js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Kddatsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

注意props 是 不可变的（一个计算机科学术语，意思是“不可改变”）。当一个组件需要改变它的 props（例如，响应用户交互或新数据）时，它不得不“请求”它的父组件传递 不同的 props —— 一个新对象！它的旧 props 将被丢弃，最终 JavaScript 引擎将回收它们占用的内存。**这是不推荐的**
### 纯函数概念
React 假设你编写的所有组件都是纯函数。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。

纯概念我们可能难以理解，我们可以看看下面的代码。
```js
let guest = 0;

function Cup() {
  // Bad：正在更改预先存在的变量！
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

```
这里即3个 `<Cup />`都guest会不一样，因为每次调用都会加一。即违背了我们之前说的纯函数概念。

我们可以改为以下方法调用：
```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}

```