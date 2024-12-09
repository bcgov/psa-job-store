import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlCurrentUser = createParamDecorator((_, context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);
  const { req } = gqlContext.getContext();

  return req.user;
});
