const randomBoolean = () => Math.random() >= 0.5;
const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const lowestUnusedNumber = (sequence, startingFrom) => {
  const arr = sequence.slice(0);
  arr.sort((a, b) => a - b);

  return arr.reduce((lowest, num, i) => {
    const seqIndex = i + startingFrom;
    return num !== seqIndex && seqIndex < lowest ? seqIndex : lowest;
  }, arr.length + startingFrom);
};

const addSets = (line) => {
  const existingSets = new Set(line.map((cell) => cell._set));
  existingSets.delete(0);

  line.forEach((cell) => {
    if (cell._set !== 0) return;
    const newSet = lowestUnusedNumber([...existingSets], 1);
    cell._set = newSet;
    existingSets.add(newSet);
  });
};

const addRightWalls = (line) => {
  line.forEach((cell, i) => {
    const isLastCell = i === line.length - 1;

    if (isLastCell) {
      cell.right = true;
      return;
    }

    const nextCell = line[i + 1];

    if (cell._set === nextCell._set) {
      cell.right = true;
      return;
    }

    const blockRight = randomBoolean();
    cell.right = blockRight;
    nextCell.left = blockRight;

    if (!blockRight) {
      nextCell._set = cell._set;
    }
  });

  line[0].left = true;
};

const addBottomWalls = (line) => {
  const sets = new Set(line.map((cell) => cell._set));

  for (let set of sets) {
    const cells = line.filter((cell) => cell._set === set);

    cells.forEach((cell) => {
      const blockBottom = randomBoolean();
      cell.bottom = blockBottom;
    });

    const setHasBottomExit = cells.some((cell) => !cell.bottom);

    if (!setHasBottomExit) {
      const unblockCellBottomIndex = randomInteger(0, cells.length - 1);
      cells[unblockCellBottomIndex].bottom = false;
    }
  }
};

const createFirstLine = (width) => {
  const line = [];

  for (let x = 0; x < width; x++) {
    const cell = {
      top: true,
      bottom: false,
      left: x === 0,
      right: x === width - 1,
      _set: x + 1,
    };

    line.push(cell);
  }

  return line;
};

const createNextLine = (line) => {
  return line.map((cell) => {
    const newCell = {_set: cell._set};
    if (cell.bottom) {
      newCell._set = 0;
    }
    
    newCell.top = cell.bottom;
    newCell.right = false;
    newCell.left = false;
    newCell.bottom = false;

    return newCell
  });
}

const populateLastLine = (line) => {
  line.forEach((cell, i) => {
    cell.bottom = true;
    const isLastCell = i === line.length - 1;
    if (isLastCell) return;

    const nextCell = line[i + 1];

    if (cell._set === nextCell._set) return;

    cell.right = false;
    nextCell.left = false;
  });
};

const eller = (width, height) => {
  if (typeof width !== 'number' || width <= 1) {
    throw new Error('Width should be a integer higher than 1');
  }
  if (typeof height !== 'number' || height <= 1) {
    throw new Error('Height should be a integer higher than 1');
  }

  const firstLine = createFirstLine(width);
  addRightWalls(firstLine);
  addBottomWalls(firstLine);
  const maze = [firstLine];

  for (let y = 1; y < height; y++) {
    const line = createNextLine(maze[y - 1]);
    addSets(line);
    addRightWalls(line);

    const isLastLine = y === height - 1;
    if (!isLastLine) {
      addBottomWalls(line);
    } else {
      populateLastLine(line);
    }

    maze.push(line);
  }

  return maze;
};

module.exports = eller;
