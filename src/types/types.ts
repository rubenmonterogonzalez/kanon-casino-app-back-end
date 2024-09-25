export type Symbol = "cherry" | "lemon" | "apple" | "banana";

export type Rewards = {
  [key in Symbol]: {
    2?: number;  // Optional because lemon only has a 3-match reward
    3: number;
  };
};

export type SpinResult = [Symbol, Symbol, Symbol]; // Three reels, each with one of the symbols

// Extend the Express Request type to include a user object
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export type User = {
  id: number | string;
  username: string;
  email: string;
  password: string;
  coins: number;
};
