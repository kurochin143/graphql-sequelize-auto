export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  NullableString: string | null;
  NullableInt: number | null;
  NullableFloat: number | null;
  NullableBoolean: boolean | null;
  NullableDate: Date | null;
  Date: Date;
  UnknownTypeStringified: string | null;
  Json: object;
  NullableJson: object | null;
  BigInt: number;
  NullableBigInt: number | null;
};

export type Query = {
  __typename?: 'Query';
  getUsers: GetUsersOutput;
  getPermissions: GetPermissionsOutput;
  getRoles: GetRolesOutput;
  getRolePermissions: GetRolePermissionsOutput;
  myCustomQuery: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  input?: InputMaybe<GetUsersInput>;
};


export type QueryGetPermissionsArgs = {
  input?: InputMaybe<GetPermissionsInput>;
};


export type QueryGetRolesArgs = {
  input?: InputMaybe<GetRolesInput>;
};


export type QueryGetRolePermissionsArgs = {
  input?: InputMaybe<GetRolePermissionsInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsers: AddUsersOutput;
  editUsers: Scalars['Int'];
  removeUsers: Scalars['Int'];
  addRoles: AddRolesOutput;
  editRoles: Scalars['Int'];
  removeRoles: Scalars['Int'];
};


export type MutationAddUsersArgs = {
  input: AddUsersInput;
};


export type MutationEditUsersArgs = {
  input: EditUsersInput;
};


export type MutationRemoveUsersArgs = {
  input: RemoveUsersInput;
};


export type MutationAddRolesArgs = {
  input: AddRolesInput;
};


export type MutationEditRolesArgs = {
  input: EditRolesInput;
};


export type MutationRemoveRolesArgs = {
  input: RemoveRolesInput;
};

export enum FilterOperators {
  Equal = 'EQUAL',
  NotEqual = 'NOT_EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  Like = 'LIKE',
  ILike = 'I_LIKE'
}

export type StringFilter = {
  val: Scalars['String'];
  op: FilterOperators;
};

export type NullableStringFilter = {
  val?: InputMaybe<Scalars['NullableString']>;
  op: FilterOperators;
};

export type IntFilter = {
  val: Scalars['Int'];
  op: FilterOperators;
};

export type NullableIntFilter = {
  val?: InputMaybe<Scalars['NullableInt']>;
  op: FilterOperators;
};

export type FloatFilter = {
  val: Scalars['Float'];
  op: FilterOperators;
};

export type NullableFloatFilter = {
  val?: InputMaybe<Scalars['NullableFloat']>;
  op: FilterOperators;
};

export type BooleanFilter = {
  val: Scalars['Boolean'];
  op: FilterOperators;
};

export type NullableBooleanFilter = {
  val?: InputMaybe<Scalars['NullableBoolean']>;
  op: FilterOperators;
};

export type DateFilter = {
  val: Scalars['Date'];
  op: FilterOperators;
};

export type NullableDateFilter = {
  val?: InputMaybe<Scalars['NullableDate']>;
  op: FilterOperators;
};

export type JsonFilter = {
  name: Scalars['String'];
  val: Scalars['String'];
  op: FilterOperators;
};

export type BigIntFilter = {
  val: Scalars['BigInt'];
  op: FilterOperators;
};

export type NullableBigIntFilter = {
  val?: InputMaybe<Scalars['NullableBigInt']>;
  op: FilterOperators;
};

export type Pagination = {
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type JsonFieldSortBy = {
  sortByName: Scalars['String'];
  jsonFieldName: Scalars['String'];
  isDesc?: InputMaybe<Scalars['Boolean']>;
  index: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  userUserRoles: Array<UserRole>;
};

export type GetUsersOutput = {
  __typename?: 'GetUsersOutput';
  count: Scalars['Int'];
  rows: Array<User>;
};

export type GetUsersByUserUserRolesByRoleByRolePermissionsByPermissionFilterFields = {
  id?: InputMaybe<IntFilter>;
};

export type GetUsersByUserUserRolesByRoleByRolePermissionsFilterFields = {
  permission?: InputMaybe<GetUsersByUserUserRolesByRoleByRolePermissionsByPermissionFilterFields>;
};

export type GetUsersByUserUserRolesByRoleFilterFields = {
  rolePermissions?: InputMaybe<GetUsersByUserUserRolesByRoleByRolePermissionsFilterFields>;
};

export type GetUsersByUserUserRolesFilterFields = {
  role?: InputMaybe<GetUsersByUserUserRolesByRoleFilterFields>;
};

export type GetUsersFilterFields = {
  id?: InputMaybe<IntFilter>;
  username?: InputMaybe<StringFilter>;
  userUserRoles?: InputMaybe<GetUsersByUserUserRolesFilterFields>;
};

export type GetUsersFilter = {
  fields?: InputMaybe<GetUsersFilterFields>;
  and?: InputMaybe<Array<GetUsersFilter>>;
  or?: InputMaybe<Array<GetUsersFilter>>;
};

export enum GetUsersSortByNames {
  Id = 'id',
  Username = 'username'
}

export type GetUsersSortBy = {
  name: GetUsersSortByNames;
  isDesc?: InputMaybe<Scalars['Boolean']>;
};

export type GetUsersInput = {
  filter?: InputMaybe<GetUsersFilter>;
  sortBys?: InputMaybe<Array<GetUsersSortBy>>;
  pagination?: InputMaybe<Pagination>;
};

export type AddUserPrimaryFields = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AddUserWithUserUserRolesPrimaryFields = {
  roleId: Scalars['Int'];
};

export type AddUserWithUserUserRolesInput = {
  primaryFields: AddUserWithUserUserRolesPrimaryFields;
};

export type AddUserAssociatedFields = {
  userUserRoles?: InputMaybe<Array<AddUserWithUserUserRolesInput>>;
};

export type AddUserInput = {
  primaryFields: AddUserPrimaryFields;
  associatedFields?: InputMaybe<AddUserAssociatedFields>;
};

export type AddedUser = {
  __typename?: 'AddedUser';
  id: Scalars['Int'];
};

export type AddUsersOutput = {
  __typename?: 'AddUsersOutput';
  rows: Array<AddedUser>;
};

export type AddUsersInput = {
  inputs: Array<AddUserInput>;
};

export type EditUserPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditUserPrimaryFields = {
  firstName?: InputMaybe<Scalars['NullableString']>;
  lastName?: InputMaybe<Scalars['NullableString']>;
};

export type EditUserWithUserUserRolesPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditUserWithUserUserRolesPrimaryFields = {
  roleId: Scalars['Int'];
};

export type EditUserWithUserUserRolesInput = {
  primaryKeys?: InputMaybe<EditUserWithUserUserRolesPrimaryKeys>;
  primaryFields: EditUserWithUserUserRolesPrimaryFields;
};

export type EditUserAssociatedFields = {
  userUserRoles: Array<EditUserWithUserUserRolesInput>;
};

export type EditUserInput = {
  primaryKeys: EditUserPrimaryKeys;
  primaryFields?: InputMaybe<EditUserPrimaryFields>;
  associatedFields: EditUserAssociatedFields;
};

export type EditUsersInput = {
  inputs: Array<EditUserInput>;
};

export type RemoveUsersPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveUsersInput = {
  primaryKeysList: Array<RemoveUsersPrimaryKeys>;
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GetPermissionsOutput = {
  __typename?: 'GetPermissionsOutput';
  count: Scalars['Int'];
  rows: Array<Permission>;
};

export type GetPermissionsFilterFields = {
  name?: InputMaybe<StringFilter>;
};

export type GetPermissionsFilter = {
  fields?: InputMaybe<GetPermissionsFilterFields>;
  and?: InputMaybe<Array<GetPermissionsFilter>>;
  or?: InputMaybe<Array<GetPermissionsFilter>>;
};

export enum GetPermissionsSortByNames {
  Name = 'name'
}

export type GetPermissionsSortBy = {
  name: GetPermissionsSortByNames;
  isDesc?: InputMaybe<Scalars['Boolean']>;
};

export type GetPermissionsInput = {
  filter?: InputMaybe<GetPermissionsFilter>;
  sortBys?: InputMaybe<Array<GetPermissionsSortBy>>;
  pagination?: InputMaybe<Pagination>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
  rolePermissions: Array<RolePermission>;
};

export type GetRolesOutput = {
  __typename?: 'GetRolesOutput';
  count: Scalars['Int'];
  rows: Array<Role>;
};

export type GetRolesFilterFields = {
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type GetRolesFilter = {
  fields?: InputMaybe<GetRolesFilterFields>;
  and?: InputMaybe<Array<GetRolesFilter>>;
  or?: InputMaybe<Array<GetRolesFilter>>;
};

export enum GetRolesSortByNames {
  Id = 'id',
  Name = 'name'
}

export type GetRolesSortBy = {
  name: GetRolesSortByNames;
  isDesc?: InputMaybe<Scalars['Boolean']>;
};

export type GetRolesInput = {
  filter?: InputMaybe<GetRolesFilter>;
  sortBys?: InputMaybe<Array<GetRolesSortBy>>;
  pagination?: InputMaybe<Pagination>;
};

export type AddRolePrimaryFields = {
  name: Scalars['String'];
};

export type AddRoleWithRolePermissionsPrimaryFields = {
  permissionId: Scalars['Int'];
};

export type AddRoleWithRolePermissionsInput = {
  primaryFields: AddRoleWithRolePermissionsPrimaryFields;
};

export type AddRoleAssociatedFields = {
  rolePermissions: Array<AddRoleWithRolePermissionsInput>;
};

export type AddRoleInput = {
  primaryFields: AddRolePrimaryFields;
  associatedFields: AddRoleAssociatedFields;
};

export type AddedRole = {
  __typename?: 'AddedRole';
  id: Scalars['Int'];
};

export type AddRolesOutput = {
  __typename?: 'AddRolesOutput';
  rows: Array<AddedRole>;
};

export type AddRolesInput = {
  inputs: Array<AddRoleInput>;
};

export type EditRolePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditRolePrimaryFields = {
  name: Scalars['String'];
};

export type EditRoleWithRolePermissionsPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditRoleWithRolePermissionsPrimaryFields = {
  permissionId: Scalars['Int'];
};

export type EditRoleWithRolePermissionsInput = {
  primaryKeys?: InputMaybe<EditRoleWithRolePermissionsPrimaryKeys>;
  primaryFields: EditRoleWithRolePermissionsPrimaryFields;
};

export type EditRoleAssociatedFields = {
  rolePermissions: Array<EditRoleWithRolePermissionsInput>;
};

export type EditRoleInput = {
  primaryKeys: EditRolePrimaryKeys;
  primaryFields: EditRolePrimaryFields;
  associatedFields: EditRoleAssociatedFields;
};

export type EditRolesInput = {
  inputs: Array<EditRoleInput>;
};

export type RemoveRolesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveRolesInput = {
  primaryKeysList: Array<RemoveRolesPrimaryKeys>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['Int'];
  role: Role;
};

export type GetUserRolesOutput = {
  __typename?: 'GetUserRolesOutput';
  count: Scalars['Int'];
  rows: Array<UserRole>;
};

export type RolePermission = {
  __typename?: 'RolePermission';
  id: Scalars['Int'];
  role: Role;
  permission: Permission;
};

export type GetRolePermissionsOutput = {
  __typename?: 'GetRolePermissionsOutput';
  count: Scalars['Int'];
  rows: Array<RolePermission>;
};

export type GetRolePermissionsFilterFields = {
  roleId?: InputMaybe<IntFilter>;
};

export type GetRolePermissionsFilter = {
  fields?: InputMaybe<GetRolePermissionsFilterFields>;
  and?: InputMaybe<Array<GetRolePermissionsFilter>>;
  or?: InputMaybe<Array<GetRolePermissionsFilter>>;
};

export type GetRolePermissionsInput = {
  filter?: InputMaybe<GetRolePermissionsFilter>;
  pagination?: InputMaybe<Pagination>;
};
