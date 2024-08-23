export interface SearchData {
  OR: { [key: string]: { contains: string; mode: 'insensitive' } }[];
}
