module.exports = {
 
  
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../coverage/libs/express","globals": {"ts-jest":{"tsconfig": "<rootDir>/tsconfig.spec.json"}},"displayName": "express","preset": "../../jest.preset.ts"
};
