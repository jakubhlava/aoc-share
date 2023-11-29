module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "vue-eslint-parser",
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    "plugins": [
        "vue",
        "prettier",
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off"
    }
}
