declare namespace Express {
  interface User {
    id: string;
    name: string | undefined;
    email: string | undefined;
    username: string | undefined;
    roles: string[];
  }

  interface Request {
    user?: User;
  }
}
