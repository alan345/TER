import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['Int'];
  /** Articles display on main page will be sorted by created date */
  createdAt: Scalars['Date'];
  title: Scalars['String'];
  content: Scalars['String'];
  source: ArticleSource;
  readingUsers: Array<User>;
  categories: Array<Category>;
  isHidden: Scalars['Boolean'];
  isSavedLater: Scalars['Boolean'];
  hasRead: Scalars['Boolean'];
};

export type ArticleSource = {
  __typename?: 'ArticleSource';
  id: Scalars['Int'];
  name: Scalars['String'];
  authorId: Scalars['Int'];
  sourceUrl: Scalars['String'];
  articles: Array<Maybe<Article>>;
  follower: Array<Maybe<User>>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export enum Category {
  Sport = 'SPORT',
  Technology = 'TECHNOLOGY',
  Programming = 'PROGRAMMING',
  Politics = 'POLITICS',
  Religion = 'RELIGION',
  GlobalWarming = 'GLOBAL_WARMING',
  Philosophy = 'PHILOSOPHY'
}

export enum Currency {
  Rur = 'RUR',
  Usd = 'USD',
  Eur = 'EUR'
}


export type Feed = {
  __typename?: 'Feed';
  id: Scalars['Int'];
  name: Scalars['String'];
  author: User;
  authorId: Scalars['Int'];
  sources: Array<ArticleSource>;
};

export type FeedCreateInput = {
  name: Scalars['String'];
  authorId: Scalars['Int'];
  sources: Array<Scalars['Int']>;
};

export type FeedUpdateInput = {
  name?: Maybe<Scalars['String']>;
  sources?: Maybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signupUser: AuthPayload;
  /** In case user decides to change name, password or email */
  updateUser: User;
  /** Authorization made by JWT */
  loginUser: AuthPayload;
  forgetPassword: Scalars['Boolean'];
  resetPassword: AuthPayload;
  /** In case if user decide to delete his account */
  deleteUser: User;
  createFeed: Feed;
  editFeed: Feed;
  /**
   * User from page with articleSource adds ArticleSource to one of his feeds
   * The result of this mutation will be either success which is TRUE or fail - FALSE
   */
  addArticleSourceToFeed: Scalars['Boolean'];
  /**
   * User removes article from feed
   * The result of this mutation will be either success which is TRUE or fail - FALSE
   */
  removeArticleSourceFromFeed: Scalars['Boolean'];
};


export type MutationSignupUserArgs = {
  userCreateData: UserCreateInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  userId: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationCreateFeedArgs = {
  data: FeedCreateInput;
};


export type MutationEditFeedArgs = {
  data?: Maybe<FeedUpdateInput>;
  feedId: Scalars['Int'];
};


export type MutationAddArticleSourceToFeedArgs = {
  articleSourceId?: Maybe<Scalars['Int']>;
  feedId: Scalars['Int'];
};


export type MutationRemoveArticleSourceFromFeedArgs = {
  articleSourceId?: Maybe<Scalars['Int']>;
  feedId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  /** This request for page with list of user's feeds */
  userFeeds: Array<Feed>;
  /** This request for main page where user can see all Articles from all feeds he created */
  userArticles: Array<Article>;
  /** This request for page when user goes to specific feed from page with list of feeds */
  feedArticles: Array<Article>;
  articleSource: ArticleSource;
};


export type QueryUserArgs = {
  userId: Scalars['Int'];
};


export type QueryUserFeedsArgs = {
  authorId: Scalars['Int'];
};


export type QueryUserArticlesArgs = {
  userId: Scalars['Int'];
};


export type QueryFeedArticlesArgs = {
  feedId: Scalars['Int'];
};


export type QueryArticleSourceArgs = {
  aritcleSourceId: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Subscription = {
  __typename?: 'Subscription';
  id: Scalars['Int'];
  type: SubscriptionType;
  /** For MVP there will be only monthly price */
  price: Scalars['Int'];
  currency: Currency;
  user: User;
  createdAt: Scalars['Date'];
  expirationDate: Scalars['Date'];
  /**
   * Current subscrition for user is the most recently created one
   * However isCurrent field provided for comfortablity
   * User should have only one subscrition with isCurrent === true
   */
  isCurrent: Scalars['Boolean'];
};

export enum SubscriptionType {
  Free = 'FREE',
  Standard = 'STANDARD',
  Pro = 'PRO'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  role: Role;
  lastLogin: Scalars['Date'];
  feeds: Array<Feed>;
  subscriptions: Array<Subscription>;
  createdArticleSources: Array<ArticleSource>;
  followingArticleSources: Array<ArticleSource>;
  articles: Array<Article>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export type UserUpdateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

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

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

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
  Article: ResolverTypeWrapper<Article>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ArticleSource: ResolverTypeWrapper<ArticleSource>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Category: Category;
  Currency: Currency;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Feed: ResolverTypeWrapper<Feed>;
  FeedCreateInput: FeedCreateInput;
  FeedUpdateInput: FeedUpdateInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionType: SubscriptionType;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  UserCreateInput: UserCreateInput;
  UserRole: UserRole;
  UserUpdateInput: UserUpdateInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: Article;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  ArticleSource: ArticleSource;
  AuthPayload: AuthPayload;
  Date: Scalars['Date'];
  Feed: Feed;
  FeedCreateInput: FeedCreateInput;
  FeedUpdateInput: FeedUpdateInput;
  Mutation: {};
  Query: {};
  Subscription: {};
  User: User;
  ID: Scalars['ID'];
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['ArticleSource'], ParentType, ContextType>;
  readingUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  isHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSavedLater?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleSource'] = ResolversParentTypes['ArticleSource']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  articles?: Resolver<Array<Maybe<ResolversTypes['Article']>>, ParentType, ContextType>;
  follower?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sources?: Resolver<Array<ResolversTypes['ArticleSource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signupUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupUserArgs, 'userCreateData'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data' | 'userId'>>;
  loginUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>;
  forgetPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationForgetPasswordArgs, 'email'>>;
  resetPassword?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'resetPasswordToken'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userId'>>;
  createFeed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, RequireFields<MutationCreateFeedArgs, 'data'>>;
  editFeed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, RequireFields<MutationEditFeedArgs, 'feedId'>>;
  addArticleSourceToFeed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddArticleSourceToFeedArgs, 'feedId'>>;
  removeArticleSourceFromFeed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveArticleSourceFromFeedArgs, 'feedId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  userFeeds?: Resolver<Array<ResolversTypes['Feed']>, ParentType, ContextType, RequireFields<QueryUserFeedsArgs, 'authorId'>>;
  userArticles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryUserArticlesArgs, 'userId'>>;
  feedArticles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryFeedArticlesArgs, 'feedId'>>;
  articleSource?: Resolver<ResolversTypes['ArticleSource'], ParentType, ContextType, RequireFields<QueryArticleSourceArgs, 'aritcleSourceId'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  id?: SubscriptionResolver<ResolversTypes['Int'], "id", ParentType, ContextType>;
  type?: SubscriptionResolver<ResolversTypes['SubscriptionType'], "type", ParentType, ContextType>;
  price?: SubscriptionResolver<ResolversTypes['Int'], "price", ParentType, ContextType>;
  currency?: SubscriptionResolver<ResolversTypes['Currency'], "currency", ParentType, ContextType>;
  user?: SubscriptionResolver<ResolversTypes['User'], "user", ParentType, ContextType>;
  createdAt?: SubscriptionResolver<ResolversTypes['Date'], "createdAt", ParentType, ContextType>;
  expirationDate?: SubscriptionResolver<ResolversTypes['Date'], "expirationDate", ParentType, ContextType>;
  isCurrent?: SubscriptionResolver<ResolversTypes['Boolean'], "isCurrent", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  lastLogin?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  feeds?: Resolver<Array<ResolversTypes['Feed']>, ParentType, ContextType>;
  subscriptions?: Resolver<Array<ResolversTypes['Subscription']>, ParentType, ContextType>;
  createdArticleSources?: Resolver<Array<ResolversTypes['ArticleSource']>, ParentType, ContextType>;
  followingArticleSources?: Resolver<Array<ResolversTypes['ArticleSource']>, ParentType, ContextType>;
  articles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>;
  ArticleSource?: ArticleSourceResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Feed?: FeedResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

