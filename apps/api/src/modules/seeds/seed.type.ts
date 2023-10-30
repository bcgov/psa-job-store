export type SeedType<T> = {
  upsert: T[];
  remove: Pick<T & { id: string | number }, 'id'>[];
};
