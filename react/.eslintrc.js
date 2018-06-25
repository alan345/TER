module.exports = {
    "env": {
      "amd": true,
      "browser": true,
      "jest": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {
        // enable additional rules
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": "off",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        "padded-blocks": ["error", "never"],
        "semi": ["error", "never"]
    },
    "plugins": [
      "react"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "globals": {
      "localStorage": true,
      "process": true
    }

}
