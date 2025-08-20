import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierConfig, 


  { ignores: ['node_modules/**', 'dist/**', 'playwright-report/**'] },

 
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      plugins: {
        prettier: prettierPlugin,
      },
    },
  },

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      'brace-style': ['error', '1tbs'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'prettier/prettier': 'error', 

      'lines-between-class-members': 'off',
    },
  },

  {
    files: ['tests/**/*.{ts,tsx}'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
);
