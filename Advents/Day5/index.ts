import { importPuzzleInput, parseIntoLines } from '../utils.ts';

const dayNumber = 5;

const puzzles = {
  part1: async () => {
    const file = await importPuzzleInput(dayNumber, 1);
    const lines = parseIntoLines(file);
    //    console.log(`Day ${dayNumber} part 1: `, answer);
  },
  part2: async () => {
    const file = await importPuzzleInput(dayNumber, 2);
    const lines = parseIntoLines(file);
    // console.log(`Day ${dayNumber} part 2: `, answer);
  },
};

export const day4 = async () => {
  await puzzles.part1();
  await puzzles.part2();
};
