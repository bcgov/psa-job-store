import { Query, Resolver } from '@nestjs/graphql';
import { Roles } from './modules/auth/decorators/roles.decorator';

@Resolver()
export class AppResolver {
  @Roles('flavor')
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
