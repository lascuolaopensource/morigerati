/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/'],
}
