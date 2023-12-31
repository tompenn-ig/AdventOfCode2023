export const importPuzzleInput = async (day: number, part: number): Promise<string> => {
  const file = Bun.file(`./Advents/Day${day}/part${part}/puzzle-input.txt`);
  return file.text();
};

export const parseIntoLines = (input: string): string[] => {
  return input.split('\n');
};

export const writeToFile = async (output: string, day: number, part: number): Promise<void> => {
  await Bun.write(`./Advents/Day${day}/part${part}/answer.txt`, output);
};
