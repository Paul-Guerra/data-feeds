module.exports = {
  "extends": "airbnb",
  "plugins": [],
  "parserOptions": {
   "ecmaVersion": 2017,
   "sourceType": "module",
   "ecmaFeatures": {
     "experimentalObjectRestSpread": true
   }
 },
 "env": {
   "browser": true
 },
// See ESLint Rules: http://eslint.org/docs/rules/
"rules": {
  "prefer-const": "off",
  "semi": ["error", "always"],
  "comma-dangle": ["off", "always-multiline"],
  "arrow-body-style": ["error", "as-needed"],
  "no-unused-vars": "warn",
  "no-redeclare": "error",
  "no-console": "warn",
  "no-mixed-operators": ["error", {"allowSamePrecedence": true}],
  "react/forbid-prop-types": ["error", { "forbid": ["any"] }],
  "import/no-extraneous-dependencies": [ "error", {
    "devDependencies": true,
    "optionalDependencies": false,
    "peerDependencies": false
  }],
  "jsx-a11y/anchor-is-valid": [ "error", {
    "components": [ "Link" ],
    "specialLink": [ "to",  ],
    "aspects": [ "noHref", "invalidHref", "preferButton" ]
  }]
}
};
