module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    "vue/multi-word-component-names": 0,
    "vue/no-v-html": 0,
    "@typescript-eslint/no-explicit-any": 0,
  }
};