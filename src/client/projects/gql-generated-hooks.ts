import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Стаьи о космосе */
export type Article_Ru = {
  __typename?: 'Article_ru';
  /** Текст статьи */
  article: Scalars['String'];
  id: Scalars['Float'];
  /** Название статьи */
  title: Scalars['String'];
};

export type CreateRoleInput = {
  description: Scalars['String'];
  value: Scalars['String'];
};

/** Добавить навык */
export type CreateSkillInput = {
  /** Название умения */
  name: Scalars['String'];
  /** Позиция в сетке */
  position: Scalars['Float'];
  /** Специальность */
  specialty: Scalars['String'];
};

export type CreateUsersInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

/** Найти статью */
export type FindArticleInput = {
  /** Текст стаьи */
  article?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  /** Название стаьи */
  title?: InputMaybe<Scalars['String']>;
};

export type FindRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  value?: InputMaybe<Scalars['String']>;
};

export type FindUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

/** Интерфейс космо (ru) */
export type Interface_Cosmo_Ru = {
  __typename?: 'Interface_cosmo_ru';
  /** Статьи */
  articles: Scalars['String'];
  /** Первый космический */
  firstSpace: Scalars['String'];
  id: Scalars['Float'];
  /** Недавно добавлены */
  recentlyAdded: Scalars['String'];
  /** Сортировать */
  sort: Scalars['String'];
};

/** Интерфейс портфолио (ru) */
export type Interface_Ru = {
  __typename?: 'Interface_ru';
  /** Возраст */
  age: Scalars['String'];
  /** Введите емайл */
  enterEmail: Scalars['String'];
  /** Введите логин */
  enterLogin: Scalars['String'];
  /** Введите пароль */
  enterPassword: Scalars['String'];
  /** Стаж */
  experience: Scalars['String'];
  id: Scalars['Float'];
  /** Сообщение */
  message: Scalars['String'];
  /** Имя */
  name: Scalars['String'];
  /** Отчество */
  patronymic: Scalars['String'];
  /** Зарегистрироваться */
  register: Scalars['String'];
  /** Умения и навыки */
  skillsAndAbilities: Scalars['String'];
  /** Специальность */
  speciality: Scalars['String'];
  /** Фамилия */
  surname: Scalars['String'];
  /** Телефон */
  telephone: Scalars['String'];
  /** Войти */
  toComeIn: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Выйти */
  authSignOut: Scalars['Boolean'];
  /** Зарегистрироваться */
  authSignUp: User;
  /** Создать роль */
  rolesCreate: Role;
  /** Удалить роль */
  rolesDelete: Scalars['Boolean'];
  /** Добавить умение */
  skillsCreateSkill: Skill;
  /** Создать юзера */
  usersCreate: User;
  /** Удалить юзера */
  usersDelete: User;
  /** Обновить данные юзера */
  usersUpdate: User;
  /** Дать юзеру новую роль */
  usersUpdateGiveNewRole: Scalars['Boolean'];
};


export type MutationAuthSignUpArgs = {
  user: CreateUsersInput;
};


export type MutationRolesCreateArgs = {
  params: CreateRoleInput;
};


export type MutationRolesDeleteArgs = {
  params: FindRoleInput;
};


export type MutationSkillsCreateSkillArgs = {
  newSkill: CreateSkillInput;
};


export type MutationUsersCreateArgs = {
  user: CreateUsersInput;
};


export type MutationUsersDeleteArgs = {
  userParam: FindUserInput;
};


export type MutationUsersUpdateArgs = {
  param: UpdateUserInput;
  target: FindUserInput;
};


export type MutationUsersUpdateGiveNewRoleArgs = {
  param: UpdateUserRolesInput;
  target: FindUserInput;
};

export type Query = {
  __typename?: 'Query';
  /** Найти статьи */
  articlesFindAll: Array<Article_Ru>;
  /** Найти 1 статью по условию */
  articlesFindOne: Article_Ru;
  /** Войти */
  authSignIn: User;
  /** Найти умения */
  findAllSkills: Array<Skill>;
  /** Найти все роли */
  rolesFindAll: Array<Role>;
  /** Найти роль */
  rolesFindOne: Role;
  /** Получить интерфейс космо */
  userInterfaceCosmoFindAll: Interface_Cosmo_Ru;
  /** Получить интерфейс портфолио */
  userInterfacePortfolioFindAll: Interface_Ru;
  /** Найти всех юзеров */
  usersFindAll: Array<User>;
  /** Найти всех юзеров по условию */
  usersFindAllByParam: Array<User>;
  /** Найти 1 юзера по условию */
  usersFindOneByParam: User;
};


export type QueryArticlesFindAllArgs = {
  searchParam?: InputMaybe<FindArticleInput>;
};


export type QueryArticlesFindOneArgs = {
  searchParam: FindArticleInput;
};


export type QueryAuthSignInArgs = {
  signInInput: SignInInput;
};


export type QueryRolesFindOneArgs = {
  params: FindRoleInput;
};


export type QueryUsersFindAllByParamArgs = {
  params: FindUserInput;
};


export type QueryUsersFindOneByParamArgs = {
  params: FindUserInput;
};

export type Role = {
  __typename?: 'Role';
  /** Описание роли */
  description: Scalars['String'];
  /** id */
  id: Scalars['Float'];
  users: Array<User>;
  /** Название роли */
  value: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Float'];
  /** Название */
  name: Scalars['String'];
  /** Позиция на сетке */
  position: Scalars['Float'];
  /** Специальность (Frontend/Backend/Other) */
  specialty: Scalars['String'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  uRoles?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateUserRolesInput = {
  role: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** Почта */
  email: Scalars['String'];
  id: Scalars['Float'];
  /** Чей токен */
  name: Scalars['String'];
  /** Пароль */
  password: Scalars['String'];
  roles: Array<Role>;
  /** Статус */
  status: Scalars['String'];
  uRoles: Array<Scalars['String']>;
};

export type ArticlesFindAllQueryVariables = Exact<{
  searchParam?: InputMaybe<FindArticleInput>;
}>;


export type ArticlesFindAllQuery = { __typename?: 'Query', articlesFindAll: Array<{ __typename?: 'Article_ru', article: string, id: number, title: string }> };

export type ArticlesFindOneQueryVariables = Exact<{
  searchParam: FindArticleInput;
}>;


export type ArticlesFindOneQuery = { __typename?: 'Query', articlesFindOne: { __typename?: 'Article_ru', article: string, id: number, title: string } };

export type CosmoInterfaceFragment = { __typename?: 'Interface_cosmo_ru', id: number, articles: string, firstSpace: string, recentlyAdded: string, sort: string };

export type CosmoInterfaceQueryVariables = Exact<{ [key: string]: never; }>;


export type CosmoInterfaceQuery = { __typename?: 'Query', userInterfaceCosmoFindAll: { __typename?: 'Interface_cosmo_ru', id: number, articles: string, firstSpace: string, recentlyAdded: string, sort: string } };

export type AuthSignInQueryVariables = Exact<{
  authSignInUser: SignInInput;
}>;


export type AuthSignInQuery = { __typename?: 'Query', authSignIn: { __typename?: 'User', email: string, name: string, uRoles: Array<string> } };

export type AuthSignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthSignOutMutation = { __typename?: 'Mutation', authSignOut: boolean };

export type AuthSignUpMutationVariables = Exact<{
  authSignUpUser: CreateUsersInput;
}>;


export type AuthSignUpMutation = { __typename?: 'Mutation', authSignUp: { __typename?: 'User', email: string } };

export type PortfolioInterfaceFragment = { __typename?: 'Interface_ru', id: number, age: string, enterEmail: string, enterLogin: string, enterPassword: string, toComeIn: string, telephone: string, surname: string, speciality: string, skillsAndAbilities: string, register: string, patronymic: string, name: string, message: string, experience: string };

export type FindInterfaceQueryVariables = Exact<{ [key: string]: never; }>;


export type FindInterfaceQuery = { __typename?: 'Query', userInterfacePortfolioFindAll: { __typename?: 'Interface_ru', id: number, age: string, enterEmail: string, enterLogin: string, enterPassword: string, toComeIn: string, telephone: string, surname: string, speciality: string, skillsAndAbilities: string, register: string, patronymic: string, name: string, message: string, experience: string } };

export type FindAllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSkillsQuery = { __typename?: 'Query', findAllSkills: Array<{ __typename?: 'Skill', name: string, specialty: string, position: number, id: number }> };

export const CosmoInterfaceFragmentDoc = gql`
    fragment cosmoInterface on Interface_cosmo_ru {
  id
  articles
  firstSpace
  recentlyAdded
  sort
}
    `;
export const PortfolioInterfaceFragmentDoc = gql`
    fragment portfolioInterface on Interface_ru {
  id
  age
  enterEmail
  enterLogin
  enterPassword
  enterEmail
  toComeIn
  telephone
  surname
  speciality
  skillsAndAbilities
  register
  patronymic
  name
  message
  experience
}
    `;
export const ArticlesFindAllDocument = gql`
    query ArticlesFindAll($searchParam: FindArticleInput) {
  articlesFindAll(searchParam: $searchParam) {
    article
    id
    title
  }
}
    `;

/**
 * __useArticlesFindAllQuery__
 *
 * To run a query within a React component, call `useArticlesFindAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesFindAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesFindAllQuery({
 *   variables: {
 *      searchParam: // value for 'searchParam'
 *   },
 * });
 */
export function useArticlesFindAllQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesFindAllQuery, ArticlesFindAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesFindAllQuery, ArticlesFindAllQueryVariables>(ArticlesFindAllDocument, options);
      }
export function useArticlesFindAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesFindAllQuery, ArticlesFindAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesFindAllQuery, ArticlesFindAllQueryVariables>(ArticlesFindAllDocument, options);
        }
export type ArticlesFindAllQueryHookResult = ReturnType<typeof useArticlesFindAllQuery>;
export type ArticlesFindAllLazyQueryHookResult = ReturnType<typeof useArticlesFindAllLazyQuery>;
export type ArticlesFindAllQueryResult = Apollo.QueryResult<ArticlesFindAllQuery, ArticlesFindAllQueryVariables>;
export const ArticlesFindOneDocument = gql`
    query ArticlesFindOne($searchParam: FindArticleInput!) {
  articlesFindOne(searchParam: $searchParam) {
    article
    id
    title
  }
}
    `;

/**
 * __useArticlesFindOneQuery__
 *
 * To run a query within a React component, call `useArticlesFindOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesFindOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesFindOneQuery({
 *   variables: {
 *      searchParam: // value for 'searchParam'
 *   },
 * });
 */
export function useArticlesFindOneQuery(baseOptions: Apollo.QueryHookOptions<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>(ArticlesFindOneDocument, options);
      }
export function useArticlesFindOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>(ArticlesFindOneDocument, options);
        }
export type ArticlesFindOneQueryHookResult = ReturnType<typeof useArticlesFindOneQuery>;
export type ArticlesFindOneLazyQueryHookResult = ReturnType<typeof useArticlesFindOneLazyQuery>;
export type ArticlesFindOneQueryResult = Apollo.QueryResult<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>;
export const CosmoInterfaceDocument = gql`
    query CosmoInterface {
  userInterfaceCosmoFindAll {
    ...cosmoInterface
  }
}
    ${CosmoInterfaceFragmentDoc}`;

/**
 * __useCosmoInterfaceQuery__
 *
 * To run a query within a React component, call `useCosmoInterfaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCosmoInterfaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCosmoInterfaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useCosmoInterfaceQuery(baseOptions?: Apollo.QueryHookOptions<CosmoInterfaceQuery, CosmoInterfaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CosmoInterfaceQuery, CosmoInterfaceQueryVariables>(CosmoInterfaceDocument, options);
      }
export function useCosmoInterfaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CosmoInterfaceQuery, CosmoInterfaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CosmoInterfaceQuery, CosmoInterfaceQueryVariables>(CosmoInterfaceDocument, options);
        }
export type CosmoInterfaceQueryHookResult = ReturnType<typeof useCosmoInterfaceQuery>;
export type CosmoInterfaceLazyQueryHookResult = ReturnType<typeof useCosmoInterfaceLazyQuery>;
export type CosmoInterfaceQueryResult = Apollo.QueryResult<CosmoInterfaceQuery, CosmoInterfaceQueryVariables>;
export const AuthSignInDocument = gql`
    query AuthSignIn($authSignInUser: SignInInput!) {
  authSignIn(signInInput: $authSignInUser) {
    email
    name
    uRoles
  }
}
    `;

/**
 * __useAuthSignInQuery__
 *
 * To run a query within a React component, call `useAuthSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthSignInQuery({
 *   variables: {
 *      authSignInUser: // value for 'authSignInUser'
 *   },
 * });
 */
export function useAuthSignInQuery(baseOptions: Apollo.QueryHookOptions<AuthSignInQuery, AuthSignInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthSignInQuery, AuthSignInQueryVariables>(AuthSignInDocument, options);
      }
export function useAuthSignInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthSignInQuery, AuthSignInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthSignInQuery, AuthSignInQueryVariables>(AuthSignInDocument, options);
        }
export type AuthSignInQueryHookResult = ReturnType<typeof useAuthSignInQuery>;
export type AuthSignInLazyQueryHookResult = ReturnType<typeof useAuthSignInLazyQuery>;
export type AuthSignInQueryResult = Apollo.QueryResult<AuthSignInQuery, AuthSignInQueryVariables>;
export const AuthSignOutDocument = gql`
    mutation AuthSignOut {
  authSignOut
}
    `;
export type AuthSignOutMutationFn = Apollo.MutationFunction<AuthSignOutMutation, AuthSignOutMutationVariables>;

/**
 * __useAuthSignOutMutation__
 *
 * To run a mutation, you first call `useAuthSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignOutMutation, { data, loading, error }] = useAuthSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthSignOutMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignOutMutation, AuthSignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignOutMutation, AuthSignOutMutationVariables>(AuthSignOutDocument, options);
      }
export type AuthSignOutMutationHookResult = ReturnType<typeof useAuthSignOutMutation>;
export type AuthSignOutMutationResult = Apollo.MutationResult<AuthSignOutMutation>;
export type AuthSignOutMutationOptions = Apollo.BaseMutationOptions<AuthSignOutMutation, AuthSignOutMutationVariables>;
export const AuthSignUpDocument = gql`
    mutation AuthSignUp($authSignUpUser: CreateUsersInput!) {
  authSignUp(user: $authSignUpUser) {
    email
  }
}
    `;
export type AuthSignUpMutationFn = Apollo.MutationFunction<AuthSignUpMutation, AuthSignUpMutationVariables>;

/**
 * __useAuthSignUpMutation__
 *
 * To run a mutation, you first call `useAuthSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignUpMutation, { data, loading, error }] = useAuthSignUpMutation({
 *   variables: {
 *      authSignUpUser: // value for 'authSignUpUser'
 *   },
 * });
 */
export function useAuthSignUpMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignUpMutation, AuthSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignUpMutation, AuthSignUpMutationVariables>(AuthSignUpDocument, options);
      }
export type AuthSignUpMutationHookResult = ReturnType<typeof useAuthSignUpMutation>;
export type AuthSignUpMutationResult = Apollo.MutationResult<AuthSignUpMutation>;
export type AuthSignUpMutationOptions = Apollo.BaseMutationOptions<AuthSignUpMutation, AuthSignUpMutationVariables>;
export const FindInterfaceDocument = gql`
    query FindInterface {
  userInterfacePortfolioFindAll {
    ...portfolioInterface
  }
}
    ${PortfolioInterfaceFragmentDoc}`;

/**
 * __useFindInterfaceQuery__
 *
 * To run a query within a React component, call `useFindInterfaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindInterfaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindInterfaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindInterfaceQuery(baseOptions?: Apollo.QueryHookOptions<FindInterfaceQuery, FindInterfaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindInterfaceQuery, FindInterfaceQueryVariables>(FindInterfaceDocument, options);
      }
export function useFindInterfaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindInterfaceQuery, FindInterfaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindInterfaceQuery, FindInterfaceQueryVariables>(FindInterfaceDocument, options);
        }
export type FindInterfaceQueryHookResult = ReturnType<typeof useFindInterfaceQuery>;
export type FindInterfaceLazyQueryHookResult = ReturnType<typeof useFindInterfaceLazyQuery>;
export type FindInterfaceQueryResult = Apollo.QueryResult<FindInterfaceQuery, FindInterfaceQueryVariables>;
export const FindAllSkillsDocument = gql`
    query FindAllSkills {
  findAllSkills {
    name
    specialty
    position
    id
  }
}
    `;

/**
 * __useFindAllSkillsQuery__
 *
 * To run a query within a React component, call `useFindAllSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllSkillsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllSkillsQuery, FindAllSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllSkillsQuery, FindAllSkillsQueryVariables>(FindAllSkillsDocument, options);
      }
export function useFindAllSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllSkillsQuery, FindAllSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllSkillsQuery, FindAllSkillsQueryVariables>(FindAllSkillsDocument, options);
        }
export type FindAllSkillsQueryHookResult = ReturnType<typeof useFindAllSkillsQuery>;
export type FindAllSkillsLazyQueryHookResult = ReturnType<typeof useFindAllSkillsLazyQuery>;
export type FindAllSkillsQueryResult = Apollo.QueryResult<FindAllSkillsQuery, FindAllSkillsQueryVariables>;