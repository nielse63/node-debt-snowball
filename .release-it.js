module.exports = {
  hooks: {
    'before:init': ['npm run lint', 'npm test', 'npm run build'],
  },
  github: {
    release: true,
  },
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    commitMessage: 'chore: release v${version}',
  },
};
