module.exports = {
  hooks: {
    'before:init': ['npm run lint', 'npm test'],
    'after:bump': 'npm run build',
  },
  git: {
    commitMessage: 'chore: release',
  },
};
