module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,}"], 
    testPathIgnorePatterns: ['dist'],
    silent: true,
    reporters:[
        './dist/TestUtils/customReporter.js'
    ],
    coverageProvider: 'v8',
    coverageReporters:['json-summary'],
  };
  