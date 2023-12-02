import {importPuzzleInput, parseIntoLines} from '../utils';

const parseLine = (str: string): number => {
    const chars = str.split('');
    const numbers = chars.filter((char) => !isNaN(Number(char)));
    return Number(numbers[0] + numbers[numbers.length - 1]);
};

const isNumericalWord = (str: string): string => {
    const numberMap = {one: 'o1e', two: 't2o', three: 't3e', four: 'f4r', five: 'f5e', six: 's6x', seven: 's7n', eight: 'e8t', nine: 'n9e'};
    const keys = Object.keys(numberMap) as Array<keyof typeof numberMap>;
    return keys.reduce((line, key) => {
        return line.replace(key, numberMap[key]);
    }, str);
};

const parseNumericalInString = (str: string): string => {
    const chars = str.split('');
    return chars.reduce((line, char) => {
        return isNumericalWord(line + char);
    }, '');
};

const puzzles = {
    part1: async () => {
        const file = await importPuzzleInput(1, 1);
        const lines = parseIntoLines(file);
        const answer = lines.reduce((total, line) => {
            return parseLine(line) + total;
        }, 0);

        console.log('Day 1 part 1: ', answer);
    },
    part2: async () => {
        const file = await importPuzzleInput(1, 2);
        const lines = parseIntoLines(file);
        const answer = lines.reduce((total, line, currentIndex) => {
            const lineWithNums = parseNumericalInString(line);
            const lineValue = parseLine(lineWithNums);
            console.log(currentIndex + 1, lineWithNums, lineValue);
            return lineValue + total;
        }, 0);
        console.log('Day 1 part 2: ', answer);
    },
};

export const day1 = async () => {
     await puzzles.part1();
    await puzzles.part2();
};
