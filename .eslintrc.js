module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: 'next',
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
}
