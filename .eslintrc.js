module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["react", "react-native", "jsx-a11y", "prettier"],
  parser: "babel-eslint",
  rules: {
    // Error
    "no-console": [2, { allow: ["warn", "error", "log", "info"] }],
    "no-unused-expressions": [2, { allowTernary: true }],

    // Warning
    "max-len": [1, 100],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/forbid-prop-types": 1,
    "react/prop-types": 1,
    "no-unused-vars": 1,
    "no-use-before-define": 1,
    "react/no-unused-prop-types": 1,
    "no-return-assign": [1, "except-parens"],
    "comma-dangle": [
      1,
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore"
      }
    ],
    "lines-between-class-members": [
      1,
      "always",
      { exceptAfterSingleLine: true }
    ],

    // Disabled
    "no-underscore-dangle": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/order": [0],
    "no-prototype-builtins": 0,
    "react/sort-comp": [0],
    "react/destructuring-assignment": [0],
    "class-methods-use-this": [0],
    "react/jsx-props-no-spreading": [0],
    "comma-dangle": [0],
    camelcase: [0],
    "react/jsx-pascal-case": [0],
    radix: [0]
  },
  globals: { fetch: false, __DEV__: true },
  env: {
    "shared-node-browser": true,
    jest: true,
    browser: true
  }
};
