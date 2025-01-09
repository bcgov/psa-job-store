module.exports = {
  '*.{js,jsx,ts,tsx}': (files) => {
    const filteredFiles = files.filter((file) => !file.includes('jest.polyfill.js'));
    if (filteredFiles.length === 0) return [];
    return [`eslint --fix ${filteredFiles.join(' ')}`, `prettier --write ${filteredFiles.join(' ')}`];
  },
  '*.code-workspace': ['prettier --parser json --write'],
  '*.json': ['prettier --write'],
  'package.json': ['sort-package-json'],
};
