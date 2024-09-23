export class GetUsersForSettingsArgs {
  where?: {
    AND: Record<string, unknown>[];
  };
  orderBy?:
    | { name: { sort: 'asc' | 'desc' } }
    | { email: { sort: 'asc' | 'desc' } }
    | ({ name: { sort: 'asc' | 'desc' } } | { email: { sort: 'asc' | 'desc' } })[];
  skip?: number;
  take?: number;
}
