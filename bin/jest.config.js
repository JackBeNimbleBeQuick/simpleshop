module.exports = {
  "roots": [
    "<rootDir>/tests",
    "<rootDir>/ts"
  ],
  "collectCoverage": true,
  // "coverageReporters": ["json", "html"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleDirectories": [
    "node_modules",
    "ts"
  ],
  "testRegex":"((ts|tests?)\/).+(test|spec)\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
