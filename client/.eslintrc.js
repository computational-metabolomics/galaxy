module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:vue/strongly-recommended",
        //"airbnb-base", eventually
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    plugins: ["html"],
    rules: {
        // Standard rules
        "no-console": "off",
        "no-unused-vars": ["error", { args: "none" }],
        "prefer-const": "error",

        // Vue TODO (enable these)
        "vue/require-default-prop": "off",
        "vue/require-prop-types": "off",
        "vue/prop-name-casing": "off",

        // Prettier compromises/workarounds -- mostly #wontfix?
        "vue/html-indent": "off",
        "vue/max-attributes-per-line": "off",
        "vue/html-self-closing": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-closing-bracket-spacing": "off"
    },
    globals: {
        // chai tests
        assert: true,
        expect: true
    }
};
