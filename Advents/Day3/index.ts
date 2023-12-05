import { importPuzzleInput, parseIntoLines, writeToFile } from '../utils.ts';

const dayNumber = 3;

const isSymbol = (char: string) => {
  if (isNaN(Number(char)) && char !== '.') return char;
};

const isPartNumber = (schematic: string[][], row: number, col: number): Symbol | undefined => {
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // up left
    [-1, 1], // up right
    [1, -1], // down left
    [1, 1], // down right
  ];

  for (const [dy, dx] of directions) {
    const newRow = row + dy;
    const newCol = col + dx;
    const schemaRow: string[] = schematic[newRow] || [];
    const symbol: string | undefined = schemaRow[newCol];
    if (symbol && isSymbol(schematic[newRow][newCol]) !== undefined) {
      return { char: symbol, y: newRow, x: newCol };
    }
  }
  return undefined;
};

type Schematic = string[][];
type PartNumbers = number[];
type Symbol = { char: string; y: number; x: number };

const getEngineParts = (schematic: Schematic): Map<Symbol, PartNumbers> => {
  const engineParts: Map<Symbol, PartNumbers> = new Map();
  const symbols: Symbol[] = [];

  for (let y = 0; y < schematic.length; y++) {
    const row = schematic[y];
    let currentNumber: PartNumbers = [];
    let currentCoords: number[][] = [];
    let currentSymbol: Symbol | undefined;

    for (let x = 0; x < row.length; x++) {
      const col = row[x];
      const parsedNumber = Number(col);

      if (!isNaN(parsedNumber)) {
        currentNumber.push(parsedNumber);
        currentCoords.push([y, x]);
        if (!currentSymbol) currentSymbol = isPartNumber(schematic, y, x);
        if (x !== row.length - 1) continue;
      }

      if (currentSymbol) {
        let symbol = symbols.find((s) => s.x === currentSymbol?.x && s.y === currentSymbol?.y);
        if (!symbol) {
          symbol = currentSymbol;
          symbols.push(currentSymbol);
        }

        engineParts.set(symbol, [...(engineParts.get(symbol) || []), Number(currentNumber.join(''))]);
        currentCoords.forEach(([y, x]) => {
          schematic[y][x] = 'X';
        });
      }

      currentNumber = [];
      currentSymbol = undefined;
    }
  }

  return engineParts;
};

const puzzles = {
  part1: async () => {
    const file = await importPuzzleInput(dayNumber, 1);
    const lines = parseIntoLines(file);
    const schematic = lines.map((line) => line.split(''));
    const engineParts = getEngineParts(schematic);
    console.log(engineParts);
    const answer = Array.from(engineParts.values())
      .flat()
      .reduce((a, b) => a + b, 0);
    console.log(`Day ${dayNumber} part 1: `, answer);
  },
  part2: async () => {
    const file = await importPuzzleInput(dayNumber, 1);
    const lines = parseIntoLines(file);
    const schematic = lines.map((line) => line.split(''));
    const engineParts = getEngineParts(schematic);
    console.log(engineParts);

    const answer = Array.from(engineParts.entries()).reduce((total, [key, value]) => {
      if (key.char === '*') {
        if (value.length == 2) {
          total += value[0] * value[1];
        }
      }

      return total;
    }, 0);
    console.log(`Day ${dayNumber} part 2: `, answer);
  },
};

export const day3 = async () => {
  await puzzles.part1();
  await puzzles.part2();
};
