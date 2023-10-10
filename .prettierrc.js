module.exports = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  endOfLine: 'auto', // by default this is "lf", causes errors on widnows if files are with crlf
  plugins: ['prettier-plugin-packagejson'],
};
