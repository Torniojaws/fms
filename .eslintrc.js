module.exports = {
    "extends": ["esnext", "esnext/style-guide", "node", "node/style-guide"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "semi": [2, "always"],
        "mocha/no-exclusive-tests": "error",
        "indent": ["error", 2]
    },
    "plugins": [
        "mocha"
    ],
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
    }
};
