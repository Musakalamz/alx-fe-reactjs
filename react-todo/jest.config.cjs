module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/__tests__/',
    '/src/tests/',
    '/src/components/TodoList.test.js',
  ],
}
