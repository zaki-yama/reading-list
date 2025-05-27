const config = require("@cybozu/eslint-config/flat/presets/react-typescript-prettier");

module.exports = [
  ...config,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
  {
    ignores: ["next-env.d.ts"],
  },
];
