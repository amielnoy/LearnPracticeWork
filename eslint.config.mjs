import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

/**
 * The workspace lint rules.
 *
 * Prettier was the only thing standing over this code, and Prettier has an
 * opinion about where the line breaks go and none at all about whether a
 * function is dead. What lives here is the second kind: unused values, hook
 * dependency arrays, floating promises — the class of defect that accumulated
 * in `ProviderContext` as ~30 lines kept alive by a `void` statement and an
 * `eslint-disable` comment addressed to a linter that was not installed.
 *
 * Deliberately narrow. A rule set nobody can get to zero is a rule set that
 * gets ignored, so this is the set the repository passes today, and it is meant
 * to be tightened from here rather than declared and suppressed.
 */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.venv/**',
      // Dropped-in reference material, not source. `format` does not cover it
      // either — the globs in package.json are the same list.
      'attached_assets/**',
      '**/generated/**',
      'allure-report/**',
      'allure-report-single/**',
      'allure-results/**',
      'blob-report/**',
      'playwright-report/**',
      'test-results/**',
      'tests/playwright/.cache/**',
      'tests/playwright-report/**',
      'tests/test-results/**',
      'artifacts/*/components/ui/**',
      'artifacts/*/src/components/ui/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,mts}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Underscore is the escape hatch, so "unused" always has a way to be said
      // on purpose — which `void applyKeyMode;` was a way of saying by accident.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  {
    files: ['artifacts/*/src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      // The rule the disable comment in ProviderContext was addressed to.
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
);
