module.exports = {
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module"
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        "standard",
        "plugin:vue/recommended"
    ],
    rules: {
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "operator-linebreak": [2, "before", {
            overrides: {
                "&&": "before",
                "||": "before",
                "^": "before",
                "=": "after"
            }
        }],
        semi: [2, "always"], // 行末分号
        indent: [2, 4], // 缩进
        "no-unused-vars": 2,
        "no-undef": 2,
        quotes: [2, "single"],
        "no-alert": 2,
        "array-bracket-newline": [2,
            {
                "multiline": true,
                "minItems": 8
            }
        ],

        // vue 配置
        "vue/html-indent": [2, 4],
        "vue/max-attributes-per-line": [2, {
            singleline: 5,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
        }],
        "vue/html-self-closing": [2, {
                html: {
                    void: "always",
                    normal: "never",
                    component: "never"
                }
            },
            ""
        ]
    }
};