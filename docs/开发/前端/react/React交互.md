---
title: react交互
---
## 响应事件
### 事件处理函数
#### 绑定事件处理函数
使用 React 可以在 JSX 中添加 **事件处理函数**。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。

```js
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}

```

定义 `handleClick` 函数然后 [将其作为 prop 传入](https://zh-hans.react.dev/learn/passing-props-to-a-component) `<button>`。其中 `handleClick` 是一个 **事件处理函数** 。事件处理函数有如下特点:
- 通常在你的组件 **内部** 定义。
- 名称以 `handle` 开头，后跟事件名称。
#### 传递事件处理函数
通常，我们会在父组件中定义子组件的事件处理函数。Button 组件接收一个名为 `onClick` 的 prop。它直接将这个 `prop` 以 onClick=`{onClick}` 方式传递给浏览器内置的`<button>`。当点击按钮时，React 会调用传入的函数。
```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`正在播放 ${movieName}！`);
  }

  return (
    <Button onClick={handlePlayClick}>
      播放 "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('正在上传！')}>
      上传图片
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="魔女宅急便" />
      <UploadButton />
    </div>
  );
}
```
#### 创建自定义事件处理函数
内置组件（`<button>` 和 `<div>`）仅支持 [浏览器事件名称](https://zh-hans.react.dev/reference/react-dom/components/common#common-props)，例如 `onClick`。但是，当你构建自己的组件时，你可以按你个人喜好命名事件处理函数的 prop。
```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onSmash={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```
### 事件传播
事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播。

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
  );
}
```

但注意在 React 中所有事件都会传播，除了 `onScroll`，它仅适用于你附加到的 JSX 标签。
### 事件阻止
#### 阻止传播
有时候，我们要阻止事件的传播。我们可以使用`e.stopPropagation()` 
```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```
1. React 调用了传递给 `<button>` 的 `onClick` 处理函数。
2. 定义在 `Button` 中的处理函数执行了如下操作：
    - 调用 `e.stopPropagation()`，阻止事件进一步冒泡。
    - 调用 `onClick` 函数，它是从 `Toolbar` 组件传递过来的 prop。
3. 在 `Toolbar` 组件中定义的函数，显示按钮对应的 alert。
4. 由于传播被阻止，父级 `<div>` 的 `onClick` 处理函数不会执行。
#### 阻止默认行为
某些浏览器事件具有与事件相关联的默认行为。例如，点击 `<form>` 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面，可以调用事件对象中的 `e.preventDefault()` 来阻止这种情况发生。
```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```
###  State
响应事件中肯定就存在动态数据，在react中我们使用`useState()`函数来进行设置。
```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}

```