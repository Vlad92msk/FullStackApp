import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'
import { getNestCookie } from '~server/utils/getNestCookie'
import { CookieEnum } from '~server/lib/connect/auth/types/cookie'

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
    const getCookie = GqlExecutionContext.create(context).getContext().req.headers.cookie
    if (!getCookie) return null
    return getNestCookie(CookieEnum.TOKEN, getCookie)
  }
);


export const languageVariants = ['ru', 'en']
export const DEFAULT_LANGUAGE = 'ru'

export const ProjectLanguage = createParamDecorator(
  (data: any, context: ExecutionContext): string => {
    const userlanguage = GqlExecutionContext.create(context).getContext().req.headers.userlanguage
    if (userlanguage !== 'undefined' && languageVariants.includes(userlanguage)) return userlanguage

    return DEFAULT_LANGUAGE
  }
);
