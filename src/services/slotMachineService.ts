import { Rewards, SpinResult, Symbol } from "types";

const reels: Symbol[][] = [
  ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
  ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
  ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"],
];

const rewards: Rewards = {
  cherry: { 2: 40, 3: 50 },
  apple: { 2: 10, 3: 20 },
  banana: { 2: 5, 3: 15 },
  lemon: { 3: 3 },
};

export const spinReels = (): SpinResult => {
  return [
    reels[0][Math.floor(Math.random() * reels[0].length)],
    reels[1][Math.floor(Math.random() * reels[1].length)],
    reels[2][Math.floor(Math.random() * reels[2].length)],
  ];
};

export const calculateWinnings = (spinResult: SpinResult): number => {
  let winAmount = 0;

  const checkWin = (symbol: Symbol): number => {
    if (spinResult[0] === symbol && spinResult[1] === symbol && spinResult[2] === symbol) {
      return rewards[symbol][3] || 0;
    } else if (spinResult[0] === symbol && spinResult[1] === symbol) {
      return rewards[symbol][2] || 0;
    }
    return 0;
  };

  winAmount += checkWin("cherry");
  winAmount += checkWin("apple");
  winAmount += checkWin("banana");
  winAmount += checkWin("lemon");

  return winAmount;
};
