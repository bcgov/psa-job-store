import { User } from './user.dto';

export class GetUsersResponse {
  users: Pick<User, 'id' | 'name' | 'email' | 'roles' | 'metadata'>[];
}
