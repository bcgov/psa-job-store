export const deserializeOrderBy = (value: string | null) => {
  if (value == null || value.length === 0) return undefined;

  const characters = value.split('');

  const direction: 'asc' | 'desc' = characters[0] === '-' ? 'desc' : 'asc';
  const path = (characters[0] === '-' ? characters.slice(1) : characters).join('').split('.');

  return generateOrderBy(path, direction);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateOrderBy = (path: string[], direction: 'asc' | 'desc'): any => {
  return path.length > 1 ? { [path[0]]: generateOrderBy(path.slice(1), direction) } : { [path[0]]: direction };
};
