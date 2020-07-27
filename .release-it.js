module.exports = {
  hooks: {
    'before:init': ['npm run lint', 'npm test'],
  },
  git: {
    commitMessage: 'chore: release',
  },
};
