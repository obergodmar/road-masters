module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-rational-order"],
  plugins: ["stylelint-scss"],
  rules: {
    indentation: 2,
    "rule-empty-line-before": null,
    "at-rule-empty-line-before": null,
    "declaration-empty-line-before": null,
    "no-descending-specificity": null,
    "number-leading-zero": "never",
    "string-quotes": "double",
    "scss/selector-no-redundant-nesting-selector": true,
  },
}
