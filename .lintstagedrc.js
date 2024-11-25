module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.code-workspace': ['prettier --parser json --write'],
  '*.json': ['prettier --write'],
  'package.json': ['sort-package-json'],
};
