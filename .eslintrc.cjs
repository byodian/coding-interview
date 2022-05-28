/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  'env': {
    'vue/setup-compiler-macros': true
  },
  'rules': {
    'vue/max-attributes-per-line': [2, {
      'singleline': 7,
      'multiline': {
        'max': 1
      }
    }],
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'comma-dangle': [2, 'never'],
        'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never'],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'no-console': 'warn',
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'template-curly-spacing': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
   'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'curly': [2, 'multi-line'],
    'object-property-newline': ['error', { 
      'allowAllPropertiesOnSameLine': true 
    }]
  }
}
