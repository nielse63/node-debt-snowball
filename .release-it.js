module.exports = {
  hooks: {
    'before:init': ['npm run lint', 'npm test', 'npm run build'],
    'after:bump': ['npm run docs', 'git add docs'],
  },
  github: {
    release: true,
  },
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    commitMessage: 'chore: release v${version}',
  },
};
