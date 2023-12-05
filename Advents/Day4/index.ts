import { importPuzzleInput, parseIntoLines } from '../utils.ts';

const dayNumber = 4;

interface Card {
  number: number;
  winningNumbers: number[];
  cardNumbers: number[];
}

const parseNumbers = (numbers: string): number[] => {
  return numbers
    .split(' ')
    .filter((num) => num !== '')
    .map((num) => Number(num.replaceAll(' ', '')));
};

const parsePuzzleInput = (line: string): Card => {
  const [cardNumberStr, numbers] = line.split(': ');
  const cardNumber = Number(cardNumberStr.replace('Card', '').replaceAll(' ', ''));
  const [winningNumbersStr, cardNumbersStr] = numbers.split(' | ');
  const winningNumbers = parseNumbers(winningNumbersStr);
  const cardNumbers = parseNumbers(cardNumbersStr);
  return {
    number: cardNumber,
    winningNumbers,
    cardNumbers,
  };
};

const getMatches = (card: Card): number => {
  return card.cardNumbers.reduce((acc, num) => {
    if (card.winningNumbers.includes(num)) return acc + 1;
    return acc;
  }, 0);
};

const getScore = (matches: number) => {
  return matches <= 2 ? matches : Math.pow(2, matches - 1);
};

const execPart2 = (cards: Card[], allCards: Card[]): number => {
  const cardsTotal = cards.length;
  const newInstances = cards
    .map((card) => {
      const matches = getMatches(card);
      if (card.number === 4) console.log(card.number, matches);
      const newCards: Card[] = [];
      for (let i = card.number + 1; i <= card.number + matches; i++) {
        const c = allCards.find((c) => c.number === i);
        if (c) newCards.push(c);
      }
      return newCards.length > 0 ? execPart2(newCards, allCards) : 0;
    })
    .reduce((acc, num) => acc + num, 0);
  return newInstances + cardsTotal;
};

const puzzles = {
  part1: async () => {
    const file = await importPuzzleInput(dayNumber, 1);
    const lines = parseIntoLines(file);

    const cards = lines.map(parsePuzzleInput);
    const answer = cards.reduce((acc, card) => {
      const matches = getMatches(card);
      const score = getScore(matches);
      return acc + score;
    }, 0);
    console.log(`Day ${dayNumber} part 1: `, answer);
  },
  part2: async () => {
    const file = await importPuzzleInput(dayNumber, 2);
    const lines = parseIntoLines(file);
    const cards = lines.map(parsePuzzleInput);
    const answer = execPart2(cards, cards);
    console.log(`Day ${dayNumber} part 2: `, answer);
  },
};

export const day4 = async () => {
  await puzzles.part1();
  await puzzles.part2();
};
