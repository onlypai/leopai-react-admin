import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    //eslintignore文件改为ignores
    ignores: [
      'dist',
      'node_modules',
      'public',
      '**/*.svg',
      '**/*.md',
      '**/*.ejs',
      '**/*.html',
      ' **/*.png',
      '**/*.sh',
      '.vscode',
      '.husky',
      '.local',
      'Dockerfile',
      'pnpm-lock.yaml',
      'tsconfig.node.json',
      'tsconfig.app.json',
      '/src/mock',
    ],
  },
  {
    extends: [
      // "eslint:recommended"：ESLint 推荐的规则
      // "eslint:all"：ESLint 附带的所有规则
      js.configs.recommended, //recommended和all规则配置位于@eslint/js包中，无需手动引入
      ...tsEslint.configs.recommended, //tslint配置位于typescript-eslint包中，无需手动引入
      react.configs.flat.recommended,
      eslintPluginPrettierRecommended,
    ],
    files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'], //只包含src文件夹下的文件
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'], //指向 tsconfig.json
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.json'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'warn',
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  },
);
