declare namespace Express {
  interface User {
    id: string;
    name: string | undefined;
    given_name: string | undefined;
    family_name: string | undefined;
    email: string | undefined;
    username: string | undefined;
    roles: string[];
    metadata: Record<string, any> | undefined;
  }

  interface Request {
    user?: User;
  }
}
