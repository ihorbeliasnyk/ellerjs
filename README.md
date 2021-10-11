# ellerjs

## Overview

A JavaScript implementation of Eller's maze generation algoritm. This algorithm creates mazes, having path between any two cells

### Rendered example

![maze (2).png](<https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0eb3241c-e8e3-4a06-8b7e-5b4f77a54629/maze_(2).png>)

## Installation

```bash
npm i ellerjs
```

## Usage

```js
const eller = require('ellerjs');
const maze = eller(15, 15);
```

Maze is two-dimensional array representing rows and cells. Cell structure:

```tsx
interface Cell {
  top: boolean; // true if cell has a wall in this direction, false if not
  bottom: boolean;
  left: boolean;
  right: boolean;
}
```
