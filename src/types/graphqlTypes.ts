import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type FilesPagination = {
  __typename?: 'FilesPagination';
  data?: Maybe<Array<Maybe<File>>>;
  page?: Maybe<Scalars['Int']['output']>;
  perPage?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  loginUser?: Maybe<Tokens>;
  logoutUser?: Maybe<Message>;
  updateUser?: Maybe<User>;
  upload?: Maybe<Message>;
};

export type MutationCreateUserArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  discSpace?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
  userSpace?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationLogoutUserArgs = {
  token: Scalars['String']['input'];
};

export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  discSpace?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  userSpace?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationUploadArgs = {
  upload: Scalars['Upload']['input'];
  user: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getFilesPagination?: Maybe<FilesPagination>;
  getOneUserById?: Maybe<User>;
  getUsersPagination: UserPagination;
};

export type QueryGetFilesPaginationArgs = {
  date_gte?: InputMaybe<Scalars['Date']['input']>;
  date_lte?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryGetOneUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetUsersPaginationArgs = {
  discSpace_gte?: InputMaybe<Scalars['Int']['input']>;
  discSpace_lte?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  userSpace_gte?: InputMaybe<Scalars['Int']['input']>;
  userSpace_lte?: InputMaybe<Scalars['Int']['input']>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  userData?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  discSpace?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  is_deleted: Scalars['Boolean']['output'];
  password: Scalars['String']['output'];
  userSpace?: Maybe<Scalars['Int']['output']>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  dataUsers?: Maybe<Array<User>>;
  page?: Maybe<Scalars['Int']['output']>;
  perPage?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type File = {
  __typename?: 'file';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  path?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: Scalars['ID']['output'];
};

export type Message = {
  __typename?: 'message';
  message: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FilesPagination: ResolverTypeWrapper<FilesPagination>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tokens: ResolverTypeWrapper<Tokens>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserPagination: ResolverTypeWrapper<UserPagination>;
  file: ResolverTypeWrapper<File>;
  message: ResolverTypeWrapper<Message>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  FilesPagination: FilesPagination;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tokens: Tokens;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserPagination: UserPagination;
  file: File;
  message: Message;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FilesPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilesPagination'] = ResolversParentTypes['FilesPagination']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['file']>>>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>;
  logoutUser?: Resolver<Maybe<ResolversTypes['message']>, ParentType, ContextType, RequireFields<MutationLogoutUserArgs, 'token'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  upload?: Resolver<Maybe<ResolversTypes['message']>, ParentType, ContextType, RequireFields<MutationUploadArgs, 'upload' | 'user'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getFilesPagination?: Resolver<Maybe<ResolversTypes['FilesPagination']>, ParentType, ContextType, Partial<QueryGetFilesPaginationArgs>>;
  getOneUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetOneUserByIdArgs, 'id'>>;
  getUsersPagination?: Resolver<ResolversTypes['UserPagination'], ParentType, ContextType, Partial<QueryGetUsersPaginationArgs>>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userData?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discSpace?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userSpace?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPagination'] = ResolversParentTypes['UserPagination']> = {
  dataUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['file'] = ResolversParentTypes['file']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['message'] = ResolversParentTypes['message']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  FilesPagination?: FilesPaginationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserPagination?: UserPaginationResolvers<ContextType>;
  file?: FileResolvers<ContextType>;
  message?: MessageResolvers<ContextType>;
};
