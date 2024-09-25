export const env = {
  commonjs: true,
  es2021: true,
  node: true,
};

export const overrides = [
  {
    env: {
      node: true,
    },
    files: [".eslintrc.js"],
    parserOptions: {
      sourceType: "script",
    },
  },
];

export const parserOptions = {
  ecmaVersion: 2021,
};

export const rules = {
  indent: ["error", 2],
  "no-tabs": "off",
  "no-trailing-spaces": "error",
  quotes: ["error", "double"],
  semi: ["error", "always"],
  "no-unused-vars": "error",
};