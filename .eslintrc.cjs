/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  env: { es6: true },
  plugins: ['prettier', 'unused-imports', 'simple-import-sort'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    'vue/setup-compiler-macros': true
  },
  rules: {
    'no-undef': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] }
    ],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        tabWidth: 2,
        printWidth: 80,
        useTabs: false,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        htmlWhitespaceSensitivity: 'css',
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ]
  }
}
