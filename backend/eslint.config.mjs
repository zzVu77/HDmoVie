import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'all',
          jsxSingleQuote: true,
          arrowParens: 'always',
          semi: false,
          useTabs: false,
          tabWidth: 2,
        },
      ],
      'no-console': 'error',
    },
    ignores: ['**/node_modules/', '**/dist/'],
  },
])
