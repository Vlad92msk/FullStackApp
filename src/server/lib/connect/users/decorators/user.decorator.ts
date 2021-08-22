import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'

export const User = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context).getContext().req;

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);

export const Token = createParamDecorator(
  (data: any, context: ExecutionContext): string => {
    return GqlExecutionContext.create(context).getContext().req.headers.cookie?.split('=')[1]
  }
);
