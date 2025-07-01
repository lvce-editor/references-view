import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',

      // disabled
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
]
