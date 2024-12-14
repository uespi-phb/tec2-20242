import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/config/*',
  ],
  coverageDirectory: './coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/test/(.+)': '<rootDir>/test/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testEnvironment: 'jest-environment-node',
  transform: {
    '\\.ts$': 'ts-jest',
  },
}

export default config
