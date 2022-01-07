import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  /** Войти */
  authSignIn: User;
  /** Найти умения */
  findAllSkills: Array<Skill>;
  /** Найти все роли */
  rolesFindAll: Array<Role>;
  /** Найти роль */
  rolesFindOne: Role;
  /** Найти всех юзеров */
  usersFindAll: Array<User>;
  /** Найти всех юзеров по условию */
  usersFindAllByParam: Array<User>;
  /** Найти 1 юзера по условию */
  usersFindOneByParam: User;
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

export type FindAllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSkillsQuery = { __typename?: 'Query', findAllSkills: Array<{ __typename?: 'Skill', name: string, specialty: string, position: number, id: number }> };

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