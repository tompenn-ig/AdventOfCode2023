import {importPuzzleInput, parseIntoLines} from "../utils.ts";

type Colour = 'red' | 'blue' | 'green'

const isValidColour = (str: string): str is Colour => str === 'red' || str === 'green' || str === 'blue'

const getGameId = (line: string): number => {
    return Number(line.split(':')[0].replace('Game', ''))
}
type Subset = Record<Colour, number>
const getSubsets = (line: string): Subset[] => {
    const [, part2] = line.split(': ')
    const subsetsStr = part2.split('; ')
    return subsetsStr.map((str) => {
        const setsStr = str.split(', ')
        return setsStr.reduce((set, str) => {
            const [value, colour] = str.split(' ')
            if (isValidColour(colour)) set[colour] = Number(value);
            else console.log(colour, 'is invalid')
            return set
        }, {} as Record<'red' | 'blue' | 'green', number>)
    })
}

interface Game {
    gameId: number
    subsets: Subset[]
}

const parseGame = (line: string): Game => {
    const gameId = getGameId(line)
    return {gameId, subsets: getSubsets(line)}
}

const checkValidGame = (line: string): number => {
    const cubes = {red: 12, green: 13, blue: 14};
    const {gameId, subsets} = parseGame(line);
    const valid = subsets.every((subset) => {
        const keys = Object.keys(cubes) as Array<keyof typeof cubes>
        return keys.every((key) => {
            const val = subset[key] ?? 0
            const limit = cubes[key];
            return Boolean(val <= limit)
        });
    })
    return valid ? gameId : 0;
}

const getGamePower = (line: string): number => {
    const {gameId, subsets} = parseGame(line);
    const cubes = {red: 0, green: 0, blue: 0};

    const minCubes = subsets.reduce((min, subsets) => {
        const minKeys = Object.keys(min) as Array<keyof typeof min>
        minKeys.forEach((key) => {
            if(subsets[key] > min[key]) min[key] = subsets[key];
        })
        return min;
    }, cubes)

    return minCubes.red * minCubes.green * minCubes.blue;
}

const puzzles = {
    part1: async () => {
        const file = await importPuzzleInput(2, 1);
        const lines = parseIntoLines(file);
        const answer = lines.reduce((total, line) => {
            return total + checkValidGame(line);
        }, 0)
        console.log('Day 2 part 1: ', answer);
    },
    part2: async () => {
        const file = await importPuzzleInput(2, 2);
        const lines = parseIntoLines(file);
        const answer = lines.reduce((total, line) => {
            return total + getGamePower(line);
        }, 0)
        console.log('Day 2 part 2: ', answer);
    },
};

export const day2 = async () => {
    await puzzles.part1();
    await puzzles.part2();
};