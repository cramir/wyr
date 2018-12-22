module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "linebreak-style": ["error", (require("os").EOL === "\r\n" ? "windows" : "unix")],
        "jsx-a11y/no-onchange": 0,
        "react/jsx-one-expression-per-line": [1, { "allow": "single-child" }]
    }
};