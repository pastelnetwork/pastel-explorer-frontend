module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tools/cssModuleMock.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/fileMock.js',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@theme/(.*)': '<rootDir>/src/theme/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@redux/(.*)': '<rootDir>/src/redux/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@layouts/(.*)': '<rootDir>/src/layouts/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@context/(.*)': '<rootDir>/src/context/$1',
    '@apis/(.*)': '<rootDir>/src/apis/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: "jsdom",
  setupFiles: [`<rootDir>/jest-setup.js`],
}
