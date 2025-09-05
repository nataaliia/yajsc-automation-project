import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';

const rootDir = new URL('.', import.meta.url).pathname;

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierConfig,

  {
    ignores: ['node_modules/**', 'dist/**', 'playwright-report/**'],
  },

  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: rootDir,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      playwright,
    },
  },

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      'brace-style': ['error', '1tbs'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'prettier/prettier': 'error',
      'lines-between-class-members': 'off',
    },
  },

  {
    files: ['tests/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}'],
  },
);
