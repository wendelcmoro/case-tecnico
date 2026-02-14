module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // 'react/no-unescaped-entities': 'off',
    // '@next/next/no-page-custom-font': 'off',
    // '@typescript-eslint/no-unused-vars': ['off'],
    // '@typescript-eslint/no-explicit-any': ['off'],
    // 'no-unused-vars': 'off',
    // indent: 'off',
    'react/prop-types': 0,
    indent: ['error', 2],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
  },
};
