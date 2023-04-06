module.exports = {
  hooks: {
    'before:init': ['npm run lint', 'npm test'],
  },
  github: {
    release: true,
  },
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    commitMessage: 'chore: release v${version}',
  },
};
