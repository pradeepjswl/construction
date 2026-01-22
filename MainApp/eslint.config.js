{
  "extends": "eslint:recommended",
    "ignorePatterns": ["dist", ".eslintignore"],
      "parserOptions": {
    "ecmaVersion": 2020,
      "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "18.3"
    }
  },
  "env": {
    "browser": true,
      "es2020": true
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "@typescript-eslint/parser",
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "rules": {
        "@typescript-eslint/no-explicit-any": "warn"
      }
    }
  ],
    "rules": {
    "react-refresh/only-export-components": [
      "warn",
      {
        "allowConstantExport": true
      }
    ]
  }
}
