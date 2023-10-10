import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
});
