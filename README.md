# ellerjs
![tests](https://github.com/ihorbeliasnyk/ellerjs/actions/workflows/run_tests.yml/badge.svg) ![npm](https://img.shields.io/npm/v/ellerjs)

A JavaScript implementation of Eller's maze generation algoritm. this algorithm creates mazes that have a path between any two cells.

### Rendered example

![maze.png](<https://i.imgur.com/wfdSA8K.png>)

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
