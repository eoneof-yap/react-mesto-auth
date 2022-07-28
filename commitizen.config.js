// https://habr.com/ru/company/yandex/blog/431432/

module.exports = {
  // Add descriptions
  types: [
    { value: 'feat', name: 'feat:       A new feature' },
    { value: 'fix', name: 'fix:        A bug fix' },
    { value: 'docs', name: 'docs:       Documentation only changes' },
    {
      value: 'refactor',
      name: 'refactor:   A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'chore',
      name: "chore:      Other changes that don't modify src or test files",
    },
    {
      value: 'style',
      name: 'style:      Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'build',
      name: 'build:      Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    },
    {
      value: 'perf',
      name: 'perf:       Adding missing tests or correcting existing tests',
    },
    { value: 'revert', name: 'revert:     Reverts a previous commit' },
    { value: 'test', name: 'test:       Add tests' },
  ],

  // Scope that has been changed
  scopes: [
    { name: 'index' },
    { name: 'App' },
    { name: 'Main' },
    { name: 'Popup' },
    { name: 'Card' },
    { name: 'Api' },
    { name: 'Constants' },
    { name: 'Utils' },
    { name: 'config' },
  ],

  /*
  scopeOverrides: {
    fix: [
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */

  // Changing default questions
  messages: {
    type: 'Describe changes',
    scope: "\nSpecify  the SCOPE you've changed (optional):",
    // Ask if `allowCustomScopes` is `true`
    customScope: 'Specify your custom SCOPE:',
    subject: 'Write a SHORT description in the VERB:\n',
    body: 'Write a DESCRIPTION (optional). Use "|" for a new line:\n',
    breaking: 'BREAKING CHANGES lis (optional):\n',
    footer:
      'A place for meta data (tickets, links, and everything else). For example: SECRETMRKT-700, SECRETMRKT-800:\n',
    confirmCommit: 'Are you satisfied with your commit?',
  },

  allowCustomScopes: true,

  allowBreakingChanges: false,

  footerPrefix: 'METADATA:',

  subjectLimit: 72,
};
