const eller = require('../index.js');

test('throws error if called without or with invalid arguments', () => {
  expect(() => {
    eller();
  }).toThrow()

  expect(() => {
    eller(12);
  }).toThrow()

  expect(() => {
    eller(10, -1);
  }).toThrow()

  expect(() => {
    eller('ten', 'eleven');
  }).toThrow()

  expect(() => {
    eller(0.2, 0.03);
  }).toThrow()
});

test('creates maze with correct width and height', () => {
  const height = 10;
  const width = 20;
  const maze = eller(width, height);

  expect(maze.length).toBe(height);
  expect(maze[0].length).toBe(width);
});

test('maze has borders', () => {
  const maze = eller(5, 5);
  
  const firstLine = maze[0];
  const lastLine = maze[maze.length - 1];
  const leftBorderCells = maze.map(line => {
    return line[0]
  })
  const rightBorderCells = maze.map(line => {
    return line[line.length - 1]
  })

  expect(firstLine.every(cell => cell.top)).toBe(true);
  expect(lastLine.every(cell => cell.bottom)).toBe(true);
  expect(leftBorderCells.every(cell => cell.left)).toBe(true);
  expect(rightBorderCells.every(cell => cell.right)).toBe(true);
})

test('maze has no closed sets', () => {
  const maze = eller(24, 26);

  maze.forEach((line, i) => {
    // don't check last line
    if (i === maze.length - 1) {
      return 
    }

    const sets = new Set(line.map((cell) => cell._set));

    for (let set of sets) {
      const cells = line.filter((cell) => cell._set === set);
      expect(cells.some(cell => !cell.bottom)).toBe(true);
    }
  })
})



