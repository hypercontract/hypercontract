module.exports = {
  name: "profile",
  preset: "../../jest.config.js",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../coverage/libs/profile","globals": {"ts-jest":{"tsConfig":"<rootDir>/tsconfig.spec.json"}}
};
