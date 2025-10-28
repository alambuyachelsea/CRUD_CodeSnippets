module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: [
    'jsdoc'
  ],
  extends: [
    'standard',
    'plugin:jsdoc/recommended'
  ],
  overrides: [
    {
      files: [
        '*.mjs',
        '*.cjs'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // jsdoc to extend the recommended ruleset
    'jsdoc/require-jsdoc': [1, {
      require: {
        ClassDeclaration: true,
        MethodDefinition: true
      }
    }],
    'jsdoc/require-description': 1,
    'jsdoc/require-description-complete-sentence': 1
  },
  ignorePatterns: [
    'dist/'
  ]
}
