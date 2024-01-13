import gql from 'graphql-tag';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  BigInt: number;
  Date: Date;
  Json: object;
  NullableBigInt: number | null;
  NullableBoolean: boolean | null;
  NullableDate: Date | null;
  NullableFloat: number | null;
  NullableInt: number | null;
  NullableJson: object | null;
  NullableString: string | null;
  UnknownTypeStringified: string | null;
};

export type AdUser = {
  __typename?: 'AdUser';
  displayName: Scalars['String'];
  givenName: Scalars['String'];
  mail: Scalars['String'];
  surname: Scalars['String'];
};

export type AddEntitiesInput = {
  inputs: Array<AddEntityInput>;
};

export type AddEntitiesOutput = {
  __typename?: 'AddEntitiesOutput';
  rows: Array<AddedEntity>;
};

export type AddEntityAddressAssociatedFields = {
  address: AddEntityAddressWithAddressInput;
};

export type AddEntityAddressInput = {
  associatedFields: AddEntityAddressAssociatedFields;
  primaryFields: AddEntityAddressPrimaryFields;
};

export type AddEntityAddressPrimaryFields = {
  entityId: Scalars['BigInt'];
  entityTypeAddressRoleId: Scalars['Int'];
  name?: InputMaybe<Scalars['NullableString']>;
  unit?: InputMaybe<Scalars['NullableString']>;
};

export type AddEntityAddressWithAddressInput = {
  primaryFields: AddEntityAddressWithAddressPrimaryFields;
};

export type AddEntityAddressWithAddressPrimaryFields = {
  awsPlaceId?: InputMaybe<Scalars['NullableString']>;
  city?: InputMaybe<Scalars['NullableString']>;
  label?: InputMaybe<Scalars['NullableString']>;
  number?: InputMaybe<Scalars['NullableString']>;
  state?: InputMaybe<Scalars['NullableString']>;
  street?: InputMaybe<Scalars['NullableString']>;
  unit?: InputMaybe<Scalars['NullableString']>;
  zipCode?: InputMaybe<Scalars['NullableString']>;
};

export type AddEntityAddressesInput = {
  inputs: Array<AddEntityAddressInput>;
};

export type AddEntityAddressesOutput = {
  __typename?: 'AddEntityAddressesOutput';
  rows: Array<AddedEntityAddress>;
};

export type AddEntityEntitiesInput = {
  inputs: Array<AddEntityEntityInput>;
};

export type AddEntityEntitiesOutput = {
  __typename?: 'AddEntityEntitiesOutput';
  rows: Array<AddedEntityEntity>;
};

export type AddEntityEntityAssociatedFields = {
  entity2: AddEntityEntityWithEntity2Input;
};

export type AddEntityEntityInput = {
  associatedFields: AddEntityEntityAssociatedFields;
  primaryFields: AddEntityEntityPrimaryFields;
};

export type AddEntityEntityPrimaryFields = {
  entity1Id: Scalars['BigInt'];
  entityTypeEntityTypeRoleId?: InputMaybe<Scalars['NullableInt']>;
  isRoleName2ForEntity2: Scalars['Boolean'];
};

export type AddEntityEntityWithEntity2Input = {
  primaryFields: AddEntityEntityWithEntity2PrimaryFields;
};

export type AddEntityEntityWithEntity2PrimaryFields = {
  typeId: Scalars['Int'];
  values?: InputMaybe<Scalars['Json']>;
};

export type AddEntityFileCustomFields = {
  fileName: Scalars['String'];
  fileStrBase64: Scalars['String'];
};

export type AddEntityFileInput = {
  customFields: AddEntityFileCustomFields;
  primaryFields: AddEntityFilePrimaryFields;
};

export type AddEntityFilePrimaryFields = {
  entityId: Scalars['BigInt'];
};

export type AddEntityFilesInput = {
  inputs: Array<AddEntityFileInput>;
};

export type AddEntityFilesOutput = {
  __typename?: 'AddEntityFilesOutput';
  rows: Array<AddedEntityFile>;
};

export type AddEntityInput = {
  primaryFields: AddEntityPrimaryFields;
};

export type AddEntityLogInput = {
  primaryFields: AddEntityLogPrimaryFields;
};

export type AddEntityLogPrimaryFields = {
  entityId: Scalars['BigInt'];
  message: Scalars['String'];
  typeId: Scalars['Int'];
};

export type AddEntityLogsInput = {
  inputs: Array<AddEntityLogInput>;
};

export type AddEntityLogsOutput = {
  __typename?: 'AddEntityLogsOutput';
  rows: Array<AddedEntityLog>;
};

export type AddEntityPrimaryFields = {
  typeId: Scalars['Int'];
  values?: InputMaybe<Scalars['Json']>;
};

export type AddEntityTypeAddressRoleInput = {
  primaryFields: AddEntityTypeAddressRolePrimaryFields;
};

export type AddEntityTypeAddressRolePrimaryFields = {
  entityTypeId: Scalars['Int'];
  name: Scalars['String'];
};

export type AddEntityTypeAddressRolesInput = {
  inputs: Array<AddEntityTypeAddressRoleInput>;
};

export type AddEntityTypeAddressRolesOutput = {
  __typename?: 'AddEntityTypeAddressRolesOutput';
  rows: Array<AddedEntityTypeAddressRole>;
};

export type AddEntityTypeEntityTypeInput = {
  primaryFields: AddEntityTypeEntityTypePrimaryFields;
};

export type AddEntityTypeEntityTypePrimaryFields = {
  entityType1Id: Scalars['Int'];
  entityType2Id: Scalars['Int'];
  isParentChild: Scalars['Boolean'];
};

export type AddEntityTypeEntityTypeRoleInput = {
  primaryFields: AddEntityTypeEntityTypeRolePrimaryFields;
};

export type AddEntityTypeEntityTypeRolePrimaryFields = {
  entityTypeEntityTypeId: Scalars['Int'];
  name1: Scalars['String'];
  name2: Scalars['String'];
};

export type AddEntityTypeEntityTypeRolesInput = {
  inputs: Array<AddEntityTypeEntityTypeRoleInput>;
};

export type AddEntityTypeEntityTypeRolesOutput = {
  __typename?: 'AddEntityTypeEntityTypeRolesOutput';
  rows: Array<AddedEntityTypeEntityTypeRole>;
};

export type AddEntityTypeEntityTypesInput = {
  inputs: Array<AddEntityTypeEntityTypeInput>;
};

export type AddEntityTypeEntityTypesOutput = {
  __typename?: 'AddEntityTypeEntityTypesOutput';
  rows: Array<AddedEntityTypeEntityType>;
};

export type AddEntityTypeFieldAssociatedFields = {
  entityTypeFieldSelects?: InputMaybe<Array<AddEntityTypeFieldWithEntityTypeFieldSelectsInput>>;
  entityTypeFieldWorkflowSteps?: InputMaybe<Array<AddEntityTypeFieldWithEntityTypeFieldWorkflowStepsInput>>;
};

export type AddEntityTypeFieldInput = {
  associatedFields?: InputMaybe<AddEntityTypeFieldAssociatedFields>;
  primaryFields: AddEntityTypeFieldPrimaryFields;
};

export type AddEntityTypeFieldPrimaryFields = {
  category?: InputMaybe<Scalars['NullableString']>;
  code: Scalars['String'];
  description?: InputMaybe<Scalars['NullableString']>;
  entityTypeId: Scalars['Int'];
  fieldTypeId: Scalars['String'];
  isFilterAndTableColumn: Scalars['Boolean'];
  isRequired: Scalars['Boolean'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsAssociatedFields = {
  select: AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectInput;
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsInput = {
  associatedFields: AddEntityTypeFieldWithEntityTypeFieldSelectsAssociatedFields;
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectAssociatedFields = {
  selectOptions: Array<AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsInput>;
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectInput = {
  associatedFields: AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectAssociatedFields;
  primaryFields: AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectPrimaryFields;
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectPrimaryFields = {
  name: Scalars['String'];
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsInput = {
  primaryFields: AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsPrimaryFields;
};

export type AddEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsPrimaryFields = {
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
  value: Scalars['String'];
};

export type AddEntityTypeFieldWithEntityTypeFieldWorkflowStepsInput = {
  primaryFields: AddEntityTypeFieldWithEntityTypeFieldWorkflowStepsPrimaryFields;
};

export type AddEntityTypeFieldWithEntityTypeFieldWorkflowStepsPrimaryFields = {
  entityTypeWorkflowStepId: Scalars['Int'];
};

export type AddEntityTypeFieldsInput = {
  inputs: Array<AddEntityTypeFieldInput>;
};

export type AddEntityTypeFieldsOutput = {
  __typename?: 'AddEntityTypeFieldsOutput';
  rows: Array<AddedEntityTypeField>;
};

export type AddEntityTypeInput = {
  primaryFields: AddEntityTypePrimaryFields;
};

export type AddEntityTypeLogTypeInput = {
  primaryFields: AddEntityTypeLogTypePrimaryFields;
};

export type AddEntityTypeLogTypePrimaryFields = {
  code: Scalars['String'];
  entityTypeId: Scalars['Int'];
  name: Scalars['String'];
};

export type AddEntityTypeLogTypesInput = {
  inputs: Array<AddEntityTypeLogTypeInput>;
};

export type AddEntityTypeLogTypesOutput = {
  __typename?: 'AddEntityTypeLogTypesOutput';
  rows: Array<AddedEntityTypeLogType>;
};

export type AddEntityTypePrimaryFields = {
  code: Scalars['String'];
  icon?: InputMaybe<Scalars['NullableString']>;
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type AddEntityTypeWorkflowStepInput = {
  primaryFields: AddEntityTypeWorkflowStepPrimaryFields;
};

export type AddEntityTypeWorkflowStepPrimaryFields = {
  description?: InputMaybe<Scalars['NullableString']>;
  entityTypeId: Scalars['Int'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type AddEntityTypeWorkflowStepsInput = {
  inputs: Array<AddEntityTypeWorkflowStepInput>;
};

export type AddEntityTypeWorkflowStepsOutput = {
  __typename?: 'AddEntityTypeWorkflowStepsOutput';
  rows: Array<AddedEntityTypeWorkflowStep>;
};

export type AddEntityTypesInput = {
  inputs: Array<AddEntityTypeInput>;
};

export type AddEntityTypesOutput = {
  __typename?: 'AddEntityTypesOutput';
  rows: Array<AddedEntityType>;
};

export type AddExistingEntityAddressInput = {
  primaryFields: AddExistingEntityAddressPrimaryFields;
};

export type AddExistingEntityAddressPrimaryFields = {
  addressId: Scalars['Int'];
  entityId: Scalars['BigInt'];
  entityTypeAddressRoleId: Scalars['Int'];
  name?: InputMaybe<Scalars['NullableString']>;
  unit?: InputMaybe<Scalars['NullableString']>;
};

export type AddExistingEntityAddressesInput = {
  inputs: Array<AddExistingEntityAddressInput>;
};

export type AddExistingEntityAddressesOutput = {
  __typename?: 'AddExistingEntityAddressesOutput';
  rows: Array<AddedExistingEntityAddress>;
};

export type AddExistingEntityEntitiesInput = {
  inputs: Array<AddExistingEntityEntityInput>;
};

export type AddExistingEntityEntitiesOutput = {
  __typename?: 'AddExistingEntityEntitiesOutput';
  rows: Array<AddedExistingEntityEntity>;
};

export type AddExistingEntityEntityInput = {
  primaryFields: AddExistingEntityEntityPrimaryFields;
};

export type AddExistingEntityEntityPrimaryFields = {
  entity1Id: Scalars['BigInt'];
  entity2Id: Scalars['BigInt'];
  entityTypeEntityTypeRoleId?: InputMaybe<Scalars['NullableInt']>;
  isRoleName2ForEntity2: Scalars['Boolean'];
};

export type AddRoleAssociatedFields = {
  rolePermissions: Array<AddRoleWithRolePermissionsInput>;
};

export type AddRoleInput = {
  associatedFields: AddRoleAssociatedFields;
  primaryFields: AddRolePrimaryFields;
};

export type AddRolePrimaryFields = {
  name: Scalars['String'];
};

export type AddRoleWithRolePermissionsInput = {
  primaryFields: AddRoleWithRolePermissionsPrimaryFields;
};

export type AddRoleWithRolePermissionsPrimaryFields = {
  permissionId: Scalars['Int'];
};

export type AddRolesInput = {
  inputs: Array<AddRoleInput>;
};

export type AddRolesOutput = {
  __typename?: 'AddRolesOutput';
  rows: Array<AddedRole>;
};

export type AddUserAssociatedFields = {
  userUserRoles: Array<AddUserWithUserUserRolesInput>;
};

export type AddUserCustomFields = {
  adUserMail: Scalars['String'];
};

export type AddUserInput = {
  associatedFields: AddUserAssociatedFields;
  customFields: AddUserCustomFields;
};

export type AddUserWithUserUserRolesInput = {
  primaryFields: AddUserWithUserUserRolesPrimaryFields;
};

export type AddUserWithUserUserRolesPrimaryFields = {
  roleId: Scalars['Int'];
};

export type AddUsersInput = {
  inputs: Array<AddUserInput>;
};

export type AddUsersOutput = {
  __typename?: 'AddUsersOutput';
  rows: Array<AddedUser>;
};

export type AddedEntity = {
  __typename?: 'AddedEntity';
  id: Scalars['BigInt'];
};

export type AddedEntityAddress = {
  __typename?: 'AddedEntityAddress';
  address: Address;
  id: Scalars['Int'];
};

export type AddedEntityEntity = {
  __typename?: 'AddedEntityEntity';
  entity2: Entity;
  id: Scalars['Int'];
};

export type AddedEntityFile = {
  __typename?: 'AddedEntityFile';
  id: Scalars['Int'];
};

export type AddedEntityLog = {
  __typename?: 'AddedEntityLog';
  id: Scalars['Int'];
};

export type AddedEntityType = {
  __typename?: 'AddedEntityType';
  id: Scalars['Int'];
};

export type AddedEntityTypeAddressRole = {
  __typename?: 'AddedEntityTypeAddressRole';
  id: Scalars['Int'];
};

export type AddedEntityTypeEntityType = {
  __typename?: 'AddedEntityTypeEntityType';
  id: Scalars['Int'];
};

export type AddedEntityTypeEntityTypeRole = {
  __typename?: 'AddedEntityTypeEntityTypeRole';
  id: Scalars['Int'];
};

export type AddedEntityTypeField = {
  __typename?: 'AddedEntityTypeField';
  id: Scalars['Int'];
};

export type AddedEntityTypeLogType = {
  __typename?: 'AddedEntityTypeLogType';
  id: Scalars['Int'];
};

export type AddedEntityTypeWorkflowStep = {
  __typename?: 'AddedEntityTypeWorkflowStep';
  id: Scalars['Int'];
};

export type AddedExistingEntityAddress = {
  __typename?: 'AddedExistingEntityAddress';
  id: Scalars['Int'];
};

export type AddedExistingEntityEntity = {
  __typename?: 'AddedExistingEntityEntity';
  id: Scalars['Int'];
};

export type AddedRole = {
  __typename?: 'AddedRole';
  id: Scalars['Int'];
};

export type AddedUser = {
  __typename?: 'AddedUser';
  id: Scalars['Int'];
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['NullableString']>;
  id: Scalars['Int'];
  label?: Maybe<Scalars['NullableString']>;
  number?: Maybe<Scalars['NullableString']>;
  state?: Maybe<Scalars['NullableString']>;
  street?: Maybe<Scalars['NullableString']>;
  unit?: Maybe<Scalars['NullableString']>;
  zipCode?: Maybe<Scalars['NullableString']>;
};

export type BigIntFilter = {
  op: FilterOperators;
  val: Scalars['BigInt'];
};

export type BooleanFilter = {
  op: FilterOperators;
  val: Scalars['Boolean'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  firstName?: Maybe<Scalars['NullableString']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['NullableString']>;
  userUserRoles: Array<UserRole>;
  username: Scalars['String'];
};

export type DateFilter = {
  op: FilterOperators;
  val: Scalars['Date'];
};

export type EditEntitiesInput = {
  inputs: Array<EditEntityInput>;
};

export type EditEntityAddressAssociatedFields = {
  address: EditEntityAddressWithAddressInput;
};

export type EditEntityAddressInput = {
  associatedFields: EditEntityAddressAssociatedFields;
  primaryFields: EditEntityAddressPrimaryFields;
  primaryKeys: EditEntityAddressPrimaryKeys;
};

export type EditEntityAddressPrimaryFields = {
  entityTypeAddressRoleId: Scalars['Int'];
  name?: InputMaybe<Scalars['NullableString']>;
  unit?: InputMaybe<Scalars['NullableString']>;
};

export type EditEntityAddressPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityAddressWithAddressInput = {
  primaryFields?: InputMaybe<EditEntityAddressWithAddressPrimaryFields>;
  primaryKeys?: InputMaybe<EditEntityAddressWithAddressPrimaryKeys>;
};

export type EditEntityAddressWithAddressPrimaryFields = {
  awsPlaceId?: InputMaybe<Scalars['NullableString']>;
  city?: InputMaybe<Scalars['NullableString']>;
  label?: InputMaybe<Scalars['NullableString']>;
  number?: InputMaybe<Scalars['NullableString']>;
  state?: InputMaybe<Scalars['NullableString']>;
  street?: InputMaybe<Scalars['NullableString']>;
  unit?: InputMaybe<Scalars['NullableString']>;
  zipCode?: InputMaybe<Scalars['NullableString']>;
};

export type EditEntityAddressWithAddressPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityAddressesInput = {
  inputs: Array<EditEntityAddressInput>;
};

export type EditEntityEntitiesInput = {
  inputs: Array<EditEntityEntityInput>;
};

export type EditEntityEntityAssociatedFields = {
  entity2: EditEntityEntityWithEntity2Input;
};

export type EditEntityEntityInput = {
  associatedFields: EditEntityEntityAssociatedFields;
  primaryFields?: InputMaybe<EditEntityEntityPrimaryFields>;
  primaryKeys: EditEntityEntityPrimaryKeys;
};

export type EditEntityEntityPrimaryFields = {
  entityTypeEntityTypeRoleId?: InputMaybe<Scalars['NullableInt']>;
};

export type EditEntityEntityPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityEntityWithEntity2Input = {
  primaryKeys?: InputMaybe<EditEntityEntityWithEntity2PrimaryKeys>;
};

export type EditEntityEntityWithEntity2PrimaryKeys = {
  id: Scalars['BigInt'];
};

export type EditEntityInput = {
  primaryFields: EditEntityPrimaryFields;
  primaryKeys: EditEntityPrimaryKeys;
};

export type EditEntityPrimaryFields = {
  values?: InputMaybe<Scalars['Json']>;
};

export type EditEntityPrimaryKeys = {
  id: Scalars['BigInt'];
};

export type EditEntityTypeAddressRoleInput = {
  primaryFields: EditEntityTypeAddressRolePrimaryFields;
  primaryKeys: EditEntityTypeAddressRolePrimaryKeys;
};

export type EditEntityTypeAddressRolePrimaryFields = {
  name: Scalars['String'];
};

export type EditEntityTypeAddressRolePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeAddressRolesInput = {
  inputs: Array<EditEntityTypeAddressRoleInput>;
};

export type EditEntityTypeEntityTypeInput = {
  primaryFields: EditEntityTypeEntityTypePrimaryFields;
  primaryKeys: EditEntityTypeEntityTypePrimaryKeys;
};

export type EditEntityTypeEntityTypePrimaryFields = {
  isParentChild: Scalars['Boolean'];
};

export type EditEntityTypeEntityTypePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeEntityTypeRoleInput = {
  primaryFields: EditEntityTypeEntityTypeRolePrimaryFields;
  primaryKeys: EditEntityTypeEntityTypeRolePrimaryKeys;
};

export type EditEntityTypeEntityTypeRolePrimaryFields = {
  name1: Scalars['String'];
  name2: Scalars['String'];
};

export type EditEntityTypeEntityTypeRolePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeEntityTypeRolesInput = {
  inputs: Array<EditEntityTypeEntityTypeRoleInput>;
};

export type EditEntityTypeEntityTypesInput = {
  inputs: Array<EditEntityTypeEntityTypeInput>;
};

export type EditEntityTypeFieldAssociatedFields = {
  entityTypeFieldSelects?: InputMaybe<Array<EditEntityTypeFieldWithEntityTypeFieldSelectsInput>>;
  entityTypeFieldWorkflowSteps: Array<EditEntityTypeFieldWithEntityTypeFieldWorkflowStepsInput>;
};

export type EditEntityTypeFieldInput = {
  associatedFields: EditEntityTypeFieldAssociatedFields;
  primaryFields: EditEntityTypeFieldPrimaryFields;
  primaryKeys: EditEntityTypeFieldPrimaryKeys;
};

export type EditEntityTypeFieldPrimaryFields = {
  category?: InputMaybe<Scalars['NullableString']>;
  code: Scalars['String'];
  description?: InputMaybe<Scalars['NullableString']>;
  fieldTypeId: Scalars['String'];
  isFilterAndTableColumn: Scalars['Boolean'];
  isRequired: Scalars['Boolean'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type EditEntityTypeFieldPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsAssociatedFields = {
  select: EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectInput;
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsInput = {
  associatedFields: EditEntityTypeFieldWithEntityTypeFieldSelectsAssociatedFields;
  primaryKeys?: InputMaybe<EditEntityTypeFieldWithEntityTypeFieldSelectsPrimaryKeys>;
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectAssociatedFields = {
  selectOptions: Array<EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsInput>;
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectInput = {
  associatedFields: EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectAssociatedFields;
  primaryFields: EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectPrimaryFields;
  primaryKeys?: InputMaybe<EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectPrimaryKeys>;
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectPrimaryFields = {
  name: Scalars['String'];
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsInput = {
  primaryFields: EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsPrimaryFields;
  primaryKeys?: InputMaybe<EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsPrimaryKeys>;
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsPrimaryFields = {
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
  value: Scalars['String'];
};

export type EditEntityTypeFieldWithEntityTypeFieldSelectsWithSelectWithSelectOptionsPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeFieldWithEntityTypeFieldWorkflowStepsInput = {
  primaryFields: EditEntityTypeFieldWithEntityTypeFieldWorkflowStepsPrimaryFields;
  primaryKeys?: InputMaybe<EditEntityTypeFieldWithEntityTypeFieldWorkflowStepsPrimaryKeys>;
};

export type EditEntityTypeFieldWithEntityTypeFieldWorkflowStepsPrimaryFields = {
  entityTypeWorkflowStepId: Scalars['Int'];
};

export type EditEntityTypeFieldWithEntityTypeFieldWorkflowStepsPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeFieldsInput = {
  inputs: Array<EditEntityTypeFieldInput>;
};

export type EditEntityTypeInput = {
  primaryFields: EditEntityTypePrimaryFields;
  primaryKeys: EditEntityTypePrimaryKeys;
};

export type EditEntityTypeLogTypeInput = {
  primaryFields: EditEntityTypeLogTypePrimaryFields;
  primaryKeys: EditEntityTypeLogTypePrimaryKeys;
};

export type EditEntityTypeLogTypePrimaryFields = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export type EditEntityTypeLogTypePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeLogTypesInput = {
  inputs: Array<EditEntityTypeLogTypeInput>;
};

export type EditEntityTypePrimaryFields = {
  code: Scalars['String'];
  icon?: InputMaybe<Scalars['NullableString']>;
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type EditEntityTypePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeWorkflowStepInput = {
  primaryFields: EditEntityTypeWorkflowStepPrimaryFields;
  primaryKeys: EditEntityTypeWorkflowStepPrimaryKeys;
};

export type EditEntityTypeWorkflowStepPrimaryFields = {
  description?: InputMaybe<Scalars['NullableString']>;
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type EditEntityTypeWorkflowStepPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditEntityTypeWorkflowStepsInput = {
  inputs: Array<EditEntityTypeWorkflowStepInput>;
};

export type EditEntityTypesInput = {
  inputs: Array<EditEntityTypeInput>;
};

export type EditExistingEntityAddressInput = {
  primaryFields: EditExistingEntityAddressPrimaryFields;
  primaryKeys: EditExistingEntityAddressPrimaryKeys;
};

export type EditExistingEntityAddressPrimaryFields = {
  addressId: Scalars['Int'];
  entityTypeAddressRoleId: Scalars['Int'];
  name?: InputMaybe<Scalars['NullableString']>;
  unit?: InputMaybe<Scalars['NullableString']>;
};

export type EditExistingEntityAddressPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditExistingEntityAddressesInput = {
  inputs: Array<EditExistingEntityAddressInput>;
};

export type EditRoleAssociatedFields = {
  rolePermissions: Array<EditRoleWithRolePermissionsInput>;
};

export type EditRoleInput = {
  associatedFields: EditRoleAssociatedFields;
  primaryFields: EditRolePrimaryFields;
  primaryKeys: EditRolePrimaryKeys;
};

export type EditRolePrimaryFields = {
  name: Scalars['String'];
};

export type EditRolePrimaryKeys = {
  id: Scalars['Int'];
};

export type EditRoleWithRolePermissionsInput = {
  primaryFields: EditRoleWithRolePermissionsPrimaryFields;
  primaryKeys?: InputMaybe<EditRoleWithRolePermissionsPrimaryKeys>;
};

export type EditRoleWithRolePermissionsPrimaryFields = {
  permissionId: Scalars['Int'];
};

export type EditRoleWithRolePermissionsPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditRolesInput = {
  inputs: Array<EditRoleInput>;
};

export type EditUserAssociatedFields = {
  userUserRoles: Array<EditUserWithUserUserRolesInput>;
};

export type EditUserInput = {
  associatedFields: EditUserAssociatedFields;
  primaryFields?: InputMaybe<EditUserPrimaryFields>;
  primaryKeys: EditUserPrimaryKeys;
};

export type EditUserPrimaryFields = {
  firstName?: InputMaybe<Scalars['NullableString']>;
  lastName?: InputMaybe<Scalars['NullableString']>;
};

export type EditUserPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditUserWithUserUserRolesInput = {
  primaryFields: EditUserWithUserUserRolesPrimaryFields;
  primaryKeys?: InputMaybe<EditUserWithUserUserRolesPrimaryKeys>;
};

export type EditUserWithUserUserRolesPrimaryFields = {
  roleId: Scalars['Int'];
};

export type EditUserWithUserUserRolesPrimaryKeys = {
  id: Scalars['Int'];
};

export type EditUsersInput = {
  inputs: Array<EditUserInput>;
};

export type Entity = {
  __typename?: 'Entity';
  entity2EntityEntities: Array<EntityEntity>;
  entityAddresses: Array<EntityAddress>;
  entityEntities: Array<EntityEntity>;
  id: Scalars['BigInt'];
  type: EntityType;
  values: Scalars['Json'];
};

export type EntityAddress = {
  __typename?: 'EntityAddress';
  address: Address;
  entityTypeAddressRole: EntityTypeAddressRole;
  id: Scalars['Int'];
  name?: Maybe<Scalars['NullableString']>;
  unit?: Maybe<Scalars['NullableString']>;
};

export type EntityEntity = {
  __typename?: 'EntityEntity';
  entityTypeEntityTypeRole?: Maybe<EntityTypeEntityTypeRole>;
  id: Scalars['Int'];
  isRoleName2ForEntity2: Scalars['Boolean'];
};

export type EntityFile = {
  __typename?: 'EntityFile';
  file: File;
  id: Scalars['Int'];
};

export type EntityLog = {
  __typename?: 'EntityLog';
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  message: Scalars['String'];
  type: EntityTypeLogType;
};

export type EntityType = {
  __typename?: 'EntityType';
  code: Scalars['String'];
  entityTypeFields: Array<EntityTypeField>;
  icon?: Maybe<Scalars['NullableString']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type EntityTypeAddressRole = {
  __typename?: 'EntityTypeAddressRole';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum EntityTypeCodes {
  Company = 'company',
  Contact = 'contact',
  Opportunity = 'opportunity'
}

export type EntityTypeEntityType = {
  __typename?: 'EntityTypeEntityType';
  entityType1: EntityType;
  entityType2: EntityType;
  id: Scalars['Int'];
  isParentChild: Scalars['Boolean'];
};

export type EntityTypeEntityTypeRole = {
  __typename?: 'EntityTypeEntityTypeRole';
  entityTypeEntityType: EntityTypeEntityType;
  id: Scalars['Int'];
  name1: Scalars['String'];
  name2: Scalars['String'];
};

export type EntityTypeField = {
  __typename?: 'EntityTypeField';
  category?: Maybe<Scalars['NullableString']>;
  code: Scalars['String'];
  description?: Maybe<Scalars['NullableString']>;
  entityTypeFieldSelects: Array<EntityTypeFieldSelect>;
  entityTypeFieldWorkflowSteps: Array<EntityTypeFieldWorkflowStep>;
  fieldType: FieldType;
  id: Scalars['Int'];
  isFilterAndTableColumn: Scalars['Boolean'];
  isRequired: Scalars['Boolean'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type EntityTypeFieldSelect = {
  __typename?: 'EntityTypeFieldSelect';
  id: Scalars['Int'];
  select: Select;
};

export type EntityTypeFieldWorkflowStep = {
  __typename?: 'EntityTypeFieldWorkflowStep';
  entityTypeField: EntityTypeField;
  entityTypeWorkflowStep: EntityTypeWorkflowStep;
  id: Scalars['Int'];
};

export type EntityTypeLogType = {
  __typename?: 'EntityTypeLogType';
  code: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type EntityTypeWorkflowStep = {
  __typename?: 'EntityTypeWorkflowStep';
  description?: Maybe<Scalars['NullableString']>;
  entityTypeFieldWorkflowSteps: Array<EntityTypeFieldWorkflowStep>;
  id: Scalars['Int'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type FieldType = {
  __typename?: 'FieldType';
  id: Scalars['String'];
  jsonType: Scalars['String'];
  name: Scalars['String'];
};

export enum FieldTypeIds {
  Checkbox = 'CHECKBOX',
  Currency = 'CURRENCY',
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Email = 'EMAIL',
  ImageFile = 'IMAGE_FILE',
  ImageUrl = 'IMAGE_URL',
  Multiselect = 'MULTISELECT',
  Number = 'NUMBER',
  NumberInt = 'NUMBER_INT',
  Percentage = 'PERCENTAGE',
  Phone = 'PHONE',
  Radio = 'RADIO',
  Select = 'SELECT',
  TextArea = 'TEXT_AREA',
  TextInput = 'TEXT_INPUT',
  Toggle = 'TOGGLE',
  Url = 'URL'
}

export type File = {
  __typename?: 'File';
  ext?: Maybe<Scalars['NullableString']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum FilterOperators {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  ILike = 'I_LIKE',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  Like = 'LIKE',
  NotEqual = 'NOT_EQUAL'
}

export type FloatFilter = {
  op: FilterOperators;
  val: Scalars['Float'];
};

export type GetAdUsersFilter = {
  mailStartsWith?: InputMaybe<Scalars['String']>;
};

export type GetAdUsersInput = {
  filter?: InputMaybe<GetAdUsersFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetAdUsersOutput = {
  __typename?: 'GetAdUsersOutput';
  count: Scalars['Int'];
  rows: Array<AdUser>;
};

export type GetAddressesInput = {
  pagination?: InputMaybe<Pagination>;
};

export type GetAddressesOutput = {
  __typename?: 'GetAddressesOutput';
  count: Scalars['Int'];
  rows: Array<Address>;
};

export type GetCurrentUsersOutput = {
  __typename?: 'GetCurrentUsersOutput';
  count: Scalars['Int'];
  rows: Array<CurrentUser>;
};

export type GetEntitiesByEntity2EntityEntitiesFilterFields = {
  entity1Id?: InputMaybe<BigIntFilter>;
};

export type GetEntitiesByEntityEntitiesFilterFields = {
  entity2Id?: InputMaybe<BigIntFilter>;
};

export type GetEntitiesFilter = {
  and?: InputMaybe<Array<GetEntitiesFilter>>;
  fields?: InputMaybe<GetEntitiesFilterFields>;
  or?: InputMaybe<Array<GetEntitiesFilter>>;
};

export type GetEntitiesFilterFields = {
  entity2EntityEntities?: InputMaybe<GetEntitiesByEntity2EntityEntitiesFilterFields>;
  entityEntities?: InputMaybe<GetEntitiesByEntityEntitiesFilterFields>;
  id?: InputMaybe<BigIntFilter>;
  typeId?: InputMaybe<IntFilter>;
  values?: InputMaybe<JsonFilter>;
};

export type GetEntitiesInput = {
  entityTypeFieldCodes?: InputMaybe<Array<Scalars['String']>>;
  filter?: InputMaybe<GetEntitiesFilter>;
  jsonFieldSortBys?: InputMaybe<Array<JsonFieldSortBy>>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetEntitiesSortBy>>;
};

export type GetEntitiesOutput = {
  __typename?: 'GetEntitiesOutput';
  count: Scalars['Int'];
  rows: Array<Entity>;
};

export type GetEntitiesSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetEntitiesSortByNames;
};

export enum GetEntitiesSortByNames {
  Id = 'id',
  Values = 'values'
}

export type GetEntityAddressesFilter = {
  and?: InputMaybe<Array<GetEntityAddressesFilter>>;
  fields?: InputMaybe<GetEntityAddressesFilterFields>;
  or?: InputMaybe<Array<GetEntityAddressesFilter>>;
};

export type GetEntityAddressesFilterFields = {
  entityId?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type GetEntityAddressesInput = {
  filter?: InputMaybe<GetEntityAddressesFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityAddressesOutput = {
  __typename?: 'GetEntityAddressesOutput';
  count: Scalars['Int'];
  rows: Array<EntityAddress>;
};

export type GetEntityEntitiesOutput = {
  __typename?: 'GetEntityEntitiesOutput';
  count: Scalars['Int'];
  rows: Array<EntityEntity>;
};

export type GetEntityFilesFilter = {
  and?: InputMaybe<Array<GetEntityFilesFilter>>;
  fields?: InputMaybe<GetEntityFilesFilterFields>;
  or?: InputMaybe<Array<GetEntityFilesFilter>>;
};

export type GetEntityFilesFilterFields = {
  entityId?: InputMaybe<BigIntFilter>;
};

export type GetEntityFilesInput = {
  filter?: InputMaybe<GetEntityFilesFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityFilesOutput = {
  __typename?: 'GetEntityFilesOutput';
  count: Scalars['Int'];
  rows: Array<EntityFile>;
};

export type GetEntityLogsFilter = {
  and?: InputMaybe<Array<GetEntityLogsFilter>>;
  fields?: InputMaybe<GetEntityLogsFilterFields>;
  or?: InputMaybe<Array<GetEntityLogsFilter>>;
};

export type GetEntityLogsFilterFields = {
  deletedAt?: InputMaybe<NullableDateFilter>;
  entityId?: InputMaybe<BigIntFilter>;
};

export type GetEntityLogsInput = {
  filter?: InputMaybe<GetEntityLogsFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityLogsOutput = {
  __typename?: 'GetEntityLogsOutput';
  count: Scalars['Int'];
  rows: Array<EntityLog>;
};

export type GetEntityTypeAddressRolesFilter = {
  and?: InputMaybe<Array<GetEntityTypeAddressRolesFilter>>;
  fields?: InputMaybe<GetEntityTypeAddressRolesFilterFields>;
  or?: InputMaybe<Array<GetEntityTypeAddressRolesFilter>>;
};

export type GetEntityTypeAddressRolesFilterFields = {
  entityTypeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type GetEntityTypeAddressRolesInput = {
  filter?: InputMaybe<GetEntityTypeAddressRolesFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetEntityTypeAddressRolesSortBy>>;
};

export type GetEntityTypeAddressRolesOutput = {
  __typename?: 'GetEntityTypeAddressRolesOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeAddressRole>;
};

export type GetEntityTypeAddressRolesSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetEntityTypeAddressRolesSortByNames;
};

export enum GetEntityTypeAddressRolesSortByNames {
  Name = 'name'
}

export type GetEntityTypeEntityTypeRolesByEntityTypeEntityTypeFilterFields = {
  entityType1Id?: InputMaybe<IntFilter>;
  entityType2Id?: InputMaybe<IntFilter>;
};

export type GetEntityTypeEntityTypeRolesFilter = {
  and?: InputMaybe<Array<GetEntityTypeEntityTypeRolesFilter>>;
  fields?: InputMaybe<GetEntityTypeEntityTypeRolesFilterFields>;
  or?: InputMaybe<Array<GetEntityTypeEntityTypeRolesFilter>>;
};

export type GetEntityTypeEntityTypeRolesFilterFields = {
  entityTypeEntityType?: InputMaybe<GetEntityTypeEntityTypeRolesByEntityTypeEntityTypeFilterFields>;
  entityTypeEntityTypeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type GetEntityTypeEntityTypeRolesInput = {
  filter?: InputMaybe<GetEntityTypeEntityTypeRolesFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityTypeEntityTypeRolesOutput = {
  __typename?: 'GetEntityTypeEntityTypeRolesOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeEntityTypeRole>;
};

export type GetEntityTypeEntityTypesFilter = {
  and?: InputMaybe<Array<GetEntityTypeEntityTypesFilter>>;
  fields?: InputMaybe<GetEntityTypeEntityTypesFilterFields>;
  or?: InputMaybe<Array<GetEntityTypeEntityTypesFilter>>;
};

export type GetEntityTypeEntityTypesFilterFields = {
  entityType1Id?: InputMaybe<IntFilter>;
  entityType2Id?: InputMaybe<IntFilter>;
};

export type GetEntityTypeEntityTypesInput = {
  filter?: InputMaybe<GetEntityTypeEntityTypesFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityTypeEntityTypesOutput = {
  __typename?: 'GetEntityTypeEntityTypesOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeEntityType>;
};

export type GetEntityTypeFieldSelectsInput = {
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityTypeFieldSelectsOutput = {
  __typename?: 'GetEntityTypeFieldSelectsOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeFieldSelect>;
};

export type GetEntityTypeFieldWorkflowStepsOutput = {
  __typename?: 'GetEntityTypeFieldWorkflowStepsOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeFieldWorkflowStep>;
};

export type GetEntityTypeFieldsFilter = {
  and?: InputMaybe<Array<GetEntityTypeFieldsFilter>>;
  fields?: InputMaybe<GetEntityTypeFieldsFilterFields>;
  or?: InputMaybe<Array<GetEntityTypeFieldsFilter>>;
};

export type GetEntityTypeFieldsFilterFields = {
  category?: InputMaybe<NullableStringFilter>;
  entityTypeId?: InputMaybe<IntFilter>;
  fieldTypeId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  isRequired?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  sortOrder?: InputMaybe<IntFilter>;
};

export type GetEntityTypeFieldsInput = {
  filter?: InputMaybe<GetEntityTypeFieldsFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetEntityTypeFieldsSortBy>>;
};

export type GetEntityTypeFieldsOutput = {
  __typename?: 'GetEntityTypeFieldsOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeField>;
};

export type GetEntityTypeFieldsSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetEntityTypeFieldsSortByNames;
};

export enum GetEntityTypeFieldsSortByNames {
  Name = 'name',
  SortOrder = 'sortOrder'
}

export type GetEntityTypeLogTypesFilter = {
  and?: InputMaybe<Array<GetEntityTypeLogTypesFilter>>;
  fields?: InputMaybe<GetEntityTypeLogTypesFilterFields>;
  or?: InputMaybe<Array<GetEntityTypeLogTypesFilter>>;
};

export type GetEntityTypeLogTypesFilterFields = {
  entityTypeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type GetEntityTypeLogTypesInput = {
  filter?: InputMaybe<GetEntityTypeLogTypesFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityTypeLogTypesOutput = {
  __typename?: 'GetEntityTypeLogTypesOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeLogType>;
};

export type GetEntityTypeWorkflowStepsFilter = {
  and?: InputMaybe<Array<GetEntityTypeWorkflowStepsFilter>>;
  fields?: InputMaybe<GetEntityTypeWorkflowStepsFilterFields>;
  or?: InputMaybe<Array<GetEntityTypeWorkflowStepsFilter>>;
};

export type GetEntityTypeWorkflowStepsFilterFields = {
  entityTypeId?: InputMaybe<IntFilter>;
};

export type GetEntityTypeWorkflowStepsInput = {
  filter?: InputMaybe<GetEntityTypeWorkflowStepsFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetEntityTypeWorkflowStepsSortBy>>;
};

export type GetEntityTypeWorkflowStepsOutput = {
  __typename?: 'GetEntityTypeWorkflowStepsOutput';
  count: Scalars['Int'];
  rows: Array<EntityTypeWorkflowStep>;
};

export type GetEntityTypeWorkflowStepsSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetEntityTypeWorkflowStepsSortByNames;
};

export enum GetEntityTypeWorkflowStepsSortByNames {
  SortOrder = 'sortOrder'
}

export type GetEntityTypesFilter = {
  and?: InputMaybe<Array<GetEntityTypesFilter>>;
  fields?: InputMaybe<GetEntityTypesFilterFields>;
  or?: InputMaybe<Array<GetEntityTypesFilter>>;
};

export type GetEntityTypesFilterFields = {
  id?: InputMaybe<IntFilter>;
};

export type GetEntityTypesInput = {
  filter?: InputMaybe<GetEntityTypesFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetEntityTypesOutput = {
  __typename?: 'GetEntityTypesOutput';
  count: Scalars['Int'];
  rows: Array<EntityType>;
};

export type GetFieldTypesInput = {
  pagination?: InputMaybe<Pagination>;
};

export type GetFieldTypesOutput = {
  __typename?: 'GetFieldTypesOutput';
  count: Scalars['Int'];
  rows: Array<FieldType>;
};

export type GetFilesOutput = {
  __typename?: 'GetFilesOutput';
  count: Scalars['Int'];
  rows: Array<File>;
};

export type GetPermissionsFilter = {
  and?: InputMaybe<Array<GetPermissionsFilter>>;
  fields?: InputMaybe<GetPermissionsFilterFields>;
  or?: InputMaybe<Array<GetPermissionsFilter>>;
};

export type GetPermissionsFilterFields = {
  name?: InputMaybe<StringFilter>;
};

export type GetPermissionsInput = {
  filter?: InputMaybe<GetPermissionsFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetPermissionsSortBy>>;
};

export type GetPermissionsOutput = {
  __typename?: 'GetPermissionsOutput';
  count: Scalars['Int'];
  rows: Array<Permission>;
};

export type GetPermissionsSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetPermissionsSortByNames;
};

export enum GetPermissionsSortByNames {
  Name = 'name'
}

export type GetRolePermissionsFilter = {
  and?: InputMaybe<Array<GetRolePermissionsFilter>>;
  fields?: InputMaybe<GetRolePermissionsFilterFields>;
  or?: InputMaybe<Array<GetRolePermissionsFilter>>;
};

export type GetRolePermissionsFilterFields = {
  roleId?: InputMaybe<IntFilter>;
};

export type GetRolePermissionsInput = {
  filter?: InputMaybe<GetRolePermissionsFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetRolePermissionsOutput = {
  __typename?: 'GetRolePermissionsOutput';
  count: Scalars['Int'];
  rows: Array<RolePermission>;
};

export type GetRolesFilter = {
  and?: InputMaybe<Array<GetRolesFilter>>;
  fields?: InputMaybe<GetRolesFilterFields>;
  or?: InputMaybe<Array<GetRolesFilter>>;
};

export type GetRolesFilterFields = {
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type GetRolesInput = {
  filter?: InputMaybe<GetRolesFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetRolesSortBy>>;
};

export type GetRolesOutput = {
  __typename?: 'GetRolesOutput';
  count: Scalars['Int'];
  rows: Array<Role>;
};

export type GetRolesSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetRolesSortByNames;
};

export enum GetRolesSortByNames {
  Id = 'id',
  Name = 'name'
}

export type GetSearchAllViewsFilter = {
  and?: InputMaybe<Array<GetSearchAllViewsFilter>>;
  fields?: InputMaybe<GetSearchAllViewsFilterFields>;
  or?: InputMaybe<Array<GetSearchAllViewsFilter>>;
};

export type GetSearchAllViewsFilterFields = {
  text?: InputMaybe<NullableStringFilter>;
};

export type GetSearchAllViewsInput = {
  filter?: InputMaybe<GetSearchAllViewsFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type GetSearchAllViewsOutput = {
  __typename?: 'GetSearchAllViewsOutput';
  count: Scalars['Int'];
  rows: Array<SearchAllView>;
};

export type GetSelectOptionsInput = {
  pagination?: InputMaybe<Pagination>;
};

export type GetSelectOptionsOutput = {
  __typename?: 'GetSelectOptionsOutput';
  count: Scalars['Int'];
  rows: Array<SelectOption>;
};

export type GetSelectsInput = {
  pagination?: InputMaybe<Pagination>;
};

export type GetSelectsOutput = {
  __typename?: 'GetSelectsOutput';
  count: Scalars['Int'];
  rows: Array<Select>;
};

export type GetUserRolesOutput = {
  __typename?: 'GetUserRolesOutput';
  count: Scalars['Int'];
  rows: Array<UserRole>;
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

export type GetUsersFilter = {
  and?: InputMaybe<Array<GetUsersFilter>>;
  fields?: InputMaybe<GetUsersFilterFields>;
  or?: InputMaybe<Array<GetUsersFilter>>;
};

export type GetUsersFilterFields = {
  firstName?: InputMaybe<NullableStringFilter>;
  id?: InputMaybe<IntFilter>;
  lastName?: InputMaybe<NullableStringFilter>;
  userUserRoles?: InputMaybe<GetUsersByUserUserRolesFilterFields>;
  username?: InputMaybe<StringFilter>;
};

export type GetUsersInput = {
  filter?: InputMaybe<GetUsersFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBys?: InputMaybe<Array<GetUsersSortBy>>;
};

export type GetUsersOutput = {
  __typename?: 'GetUsersOutput';
  count: Scalars['Int'];
  rows: Array<User>;
};

export type GetUsersSortBy = {
  isDesc?: InputMaybe<Scalars['Boolean']>;
  name: GetUsersSortByNames;
};

export enum GetUsersSortByNames {
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  Username = 'username'
}

export type IntFilter = {
  op: FilterOperators;
  val: Scalars['Int'];
};

export type JsonFieldSortBy = {
  index: Scalars['Int'];
  isDesc?: InputMaybe<Scalars['Boolean']>;
  jsonFieldName: Scalars['String'];
  sortByName: Scalars['String'];
};

export type JsonFilter = {
  name: Scalars['String'];
  op: FilterOperators;
  val: Scalars['String'];
};

export type LoginInput = {
  isClear: Scalars['Boolean'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEntities: AddEntitiesOutput;
  addEntityAddresses: AddEntityAddressesOutput;
  addEntityEntities: AddEntityEntitiesOutput;
  addEntityFiles: AddEntityFilesOutput;
  addEntityLogs: AddEntityLogsOutput;
  addEntityTypeAddressRoles: AddEntityTypeAddressRolesOutput;
  addEntityTypeEntityTypeRoles: AddEntityTypeEntityTypeRolesOutput;
  addEntityTypeEntityTypes: AddEntityTypeEntityTypesOutput;
  addEntityTypeFields: AddEntityTypeFieldsOutput;
  addEntityTypeLogTypes: AddEntityTypeLogTypesOutput;
  addEntityTypeWorkflowSteps: AddEntityTypeWorkflowStepsOutput;
  addEntityTypes: AddEntityTypesOutput;
  addExistingEntityAddresses: AddExistingEntityAddressesOutput;
  addExistingEntityEntities: AddExistingEntityEntitiesOutput;
  addRoles: AddRolesOutput;
  addUsers: AddUsersOutput;
  editEntities: Scalars['Int'];
  editEntityAddresses: Scalars['Int'];
  editEntityEntities: Scalars['Int'];
  editEntityTypeAddressRoles: Scalars['Int'];
  editEntityTypeEntityTypeRoles: Scalars['Int'];
  editEntityTypeEntityTypes: Scalars['Int'];
  editEntityTypeFields: Scalars['Int'];
  editEntityTypeLogTypes: Scalars['Int'];
  editEntityTypeWorkflowSteps: Scalars['Int'];
  editEntityTypes: Scalars['Int'];
  editExistingEntityAddresses: Scalars['Int'];
  editRoles: Scalars['Int'];
  editUsers: Scalars['Int'];
  login: LoginOutput;
  removeEntities: Scalars['Int'];
  removeEntityAddresses: Scalars['Int'];
  removeEntityEntities: Scalars['Int'];
  removeEntityFiles: Scalars['Int'];
  removeEntityTypeAddressRoles: Scalars['Int'];
  removeEntityTypeEntityTypeRoles: Scalars['Int'];
  removeEntityTypeEntityTypes: Scalars['Int'];
  removeEntityTypeFields: Scalars['Int'];
  removeEntityTypeLogTypes: Scalars['Int'];
  removeEntityTypeWorkflowSteps: Scalars['Int'];
  removeEntityTypes: Scalars['Int'];
  removeRoles: Scalars['Int'];
  removeUsers: Scalars['Int'];
  softRemoveEntityLogs: Scalars['Int'];
};


export type MutationAddEntitiesArgs = {
  input: AddEntitiesInput;
};


export type MutationAddEntityAddressesArgs = {
  input: AddEntityAddressesInput;
};


export type MutationAddEntityEntitiesArgs = {
  input: AddEntityEntitiesInput;
};


export type MutationAddEntityFilesArgs = {
  input: AddEntityFilesInput;
};


export type MutationAddEntityLogsArgs = {
  input: AddEntityLogsInput;
};


export type MutationAddEntityTypeAddressRolesArgs = {
  input: AddEntityTypeAddressRolesInput;
};


export type MutationAddEntityTypeEntityTypeRolesArgs = {
  input: AddEntityTypeEntityTypeRolesInput;
};


export type MutationAddEntityTypeEntityTypesArgs = {
  input: AddEntityTypeEntityTypesInput;
};


export type MutationAddEntityTypeFieldsArgs = {
  input: AddEntityTypeFieldsInput;
};


export type MutationAddEntityTypeLogTypesArgs = {
  input: AddEntityTypeLogTypesInput;
};


export type MutationAddEntityTypeWorkflowStepsArgs = {
  input: AddEntityTypeWorkflowStepsInput;
};


export type MutationAddEntityTypesArgs = {
  input: AddEntityTypesInput;
};


export type MutationAddExistingEntityAddressesArgs = {
  input: AddExistingEntityAddressesInput;
};


export type MutationAddExistingEntityEntitiesArgs = {
  input: AddExistingEntityEntitiesInput;
};


export type MutationAddRolesArgs = {
  input: AddRolesInput;
};


export type MutationAddUsersArgs = {
  input: AddUsersInput;
};


export type MutationEditEntitiesArgs = {
  input: EditEntitiesInput;
};


export type MutationEditEntityAddressesArgs = {
  input: EditEntityAddressesInput;
};


export type MutationEditEntityEntitiesArgs = {
  input: EditEntityEntitiesInput;
};


export type MutationEditEntityTypeAddressRolesArgs = {
  input: EditEntityTypeAddressRolesInput;
};


export type MutationEditEntityTypeEntityTypeRolesArgs = {
  input: EditEntityTypeEntityTypeRolesInput;
};


export type MutationEditEntityTypeEntityTypesArgs = {
  input: EditEntityTypeEntityTypesInput;
};


export type MutationEditEntityTypeFieldsArgs = {
  input: EditEntityTypeFieldsInput;
};


export type MutationEditEntityTypeLogTypesArgs = {
  input: EditEntityTypeLogTypesInput;
};


export type MutationEditEntityTypeWorkflowStepsArgs = {
  input: EditEntityTypeWorkflowStepsInput;
};


export type MutationEditEntityTypesArgs = {
  input: EditEntityTypesInput;
};


export type MutationEditExistingEntityAddressesArgs = {
  input: EditExistingEntityAddressesInput;
};


export type MutationEditRolesArgs = {
  input: EditRolesInput;
};


export type MutationEditUsersArgs = {
  input: EditUsersInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveEntitiesArgs = {
  input: RemoveEntitiesInput;
};


export type MutationRemoveEntityAddressesArgs = {
  input: RemoveEntityAddressesInput;
};


export type MutationRemoveEntityEntitiesArgs = {
  input: RemoveEntityEntitiesInput;
};


export type MutationRemoveEntityFilesArgs = {
  input: RemoveEntityFilesInput;
};


export type MutationRemoveEntityTypeAddressRolesArgs = {
  input: RemoveEntityTypeAddressRolesInput;
};


export type MutationRemoveEntityTypeEntityTypeRolesArgs = {
  input: RemoveEntityTypeEntityTypeRolesInput;
};


export type MutationRemoveEntityTypeEntityTypesArgs = {
  input: RemoveEntityTypeEntityTypesInput;
};


export type MutationRemoveEntityTypeFieldsArgs = {
  input: RemoveEntityTypeFieldsInput;
};


export type MutationRemoveEntityTypeLogTypesArgs = {
  input: RemoveEntityTypeLogTypesInput;
};


export type MutationRemoveEntityTypeWorkflowStepsArgs = {
  input: RemoveEntityTypeWorkflowStepsInput;
};


export type MutationRemoveEntityTypesArgs = {
  input: RemoveEntityTypesInput;
};


export type MutationRemoveRolesArgs = {
  input: RemoveRolesInput;
};


export type MutationRemoveUsersArgs = {
  input: RemoveUsersInput;
};


export type MutationSoftRemoveEntityLogsArgs = {
  input: SoftRemoveEntityLogsInput;
};

export type NullableBigIntFilter = {
  op: FilterOperators;
  val?: InputMaybe<Scalars['NullableBigInt']>;
};

export type NullableBooleanFilter = {
  op: FilterOperators;
  val?: InputMaybe<Scalars['NullableBoolean']>;
};

export type NullableDateFilter = {
  op: FilterOperators;
  val?: InputMaybe<Scalars['NullableDate']>;
};

export type NullableFloatFilter = {
  op: FilterOperators;
  val?: InputMaybe<Scalars['NullableFloat']>;
};

export type NullableIntFilter = {
  op: FilterOperators;
  val?: InputMaybe<Scalars['NullableInt']>;
};

export type NullableStringFilter = {
  op: FilterOperators;
  val?: InputMaybe<Scalars['NullableString']>;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Permission = {
  __typename?: 'Permission';
  code: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum PermissionCodes {
  Settings = 'settings'
}

export type Query = {
  __typename?: 'Query';
  getAdUsers: GetAdUsersOutput;
  getAddresses: GetAddressesOutput;
  getCurrentUsers: GetCurrentUsersOutput;
  getEntities: GetEntitiesOutput;
  getEntityAddresses: GetEntityAddressesOutput;
  getEntityFiles: GetEntityFilesOutput;
  getEntityLogs: GetEntityLogsOutput;
  getEntityTypeAddressRoles: GetEntityTypeAddressRolesOutput;
  getEntityTypeEntityTypeRoles: GetEntityTypeEntityTypeRolesOutput;
  getEntityTypeEntityTypes: GetEntityTypeEntityTypesOutput;
  getEntityTypeFieldSelects: GetEntityTypeFieldSelectsOutput;
  getEntityTypeFields: GetEntityTypeFieldsOutput;
  getEntityTypeLogTypes: GetEntityTypeLogTypesOutput;
  getEntityTypeWorkflowSteps: GetEntityTypeWorkflowStepsOutput;
  getEntityTypes: GetEntityTypesOutput;
  getFieldTypes: GetFieldTypesOutput;
  getPermissions: GetPermissionsOutput;
  getRolePermissions: GetRolePermissionsOutput;
  getRoles: GetRolesOutput;
  getSearchAllViews: GetSearchAllViewsOutput;
  getSelectOptions: GetSelectOptionsOutput;
  getSelects: GetSelectsOutput;
  getUsers: GetUsersOutput;
  searchAddress: SearchAddressOutput;
  searchAll: SearchAllOutput;
};


export type QueryGetAdUsersArgs = {
  input?: InputMaybe<GetAdUsersInput>;
};


export type QueryGetAddressesArgs = {
  input?: InputMaybe<GetAddressesInput>;
};


export type QueryGetEntitiesArgs = {
  input?: InputMaybe<GetEntitiesInput>;
};


export type QueryGetEntityAddressesArgs = {
  input?: InputMaybe<GetEntityAddressesInput>;
};


export type QueryGetEntityFilesArgs = {
  input?: InputMaybe<GetEntityFilesInput>;
};


export type QueryGetEntityLogsArgs = {
  input?: InputMaybe<GetEntityLogsInput>;
};


export type QueryGetEntityTypeAddressRolesArgs = {
  input?: InputMaybe<GetEntityTypeAddressRolesInput>;
};


export type QueryGetEntityTypeEntityTypeRolesArgs = {
  input?: InputMaybe<GetEntityTypeEntityTypeRolesInput>;
};


export type QueryGetEntityTypeEntityTypesArgs = {
  input?: InputMaybe<GetEntityTypeEntityTypesInput>;
};


export type QueryGetEntityTypeFieldSelectsArgs = {
  input?: InputMaybe<GetEntityTypeFieldSelectsInput>;
};


export type QueryGetEntityTypeFieldsArgs = {
  input?: InputMaybe<GetEntityTypeFieldsInput>;
};


export type QueryGetEntityTypeLogTypesArgs = {
  input?: InputMaybe<GetEntityTypeLogTypesInput>;
};


export type QueryGetEntityTypeWorkflowStepsArgs = {
  input?: InputMaybe<GetEntityTypeWorkflowStepsInput>;
};


export type QueryGetEntityTypesArgs = {
  input?: InputMaybe<GetEntityTypesInput>;
};


export type QueryGetFieldTypesArgs = {
  input?: InputMaybe<GetFieldTypesInput>;
};


export type QueryGetPermissionsArgs = {
  input?: InputMaybe<GetPermissionsInput>;
};


export type QueryGetRolePermissionsArgs = {
  input?: InputMaybe<GetRolePermissionsInput>;
};


export type QueryGetRolesArgs = {
  input?: InputMaybe<GetRolesInput>;
};


export type QueryGetSearchAllViewsArgs = {
  input?: InputMaybe<GetSearchAllViewsInput>;
};


export type QueryGetSelectOptionsArgs = {
  input?: InputMaybe<GetSelectOptionsInput>;
};


export type QueryGetSelectsArgs = {
  input?: InputMaybe<GetSelectsInput>;
};


export type QueryGetUsersArgs = {
  input?: InputMaybe<GetUsersInput>;
};


export type QuerySearchAddressArgs = {
  input: SearchAddressInput;
};


export type QuerySearchAllArgs = {
  input: SearchAllInput;
};

export type RemoveEntitiesInput = {
  primaryKeysList: Array<RemoveEntitiesPrimaryKeys>;
};

export type RemoveEntitiesPrimaryKeys = {
  id: Scalars['BigInt'];
};

export type RemoveEntityAddressesInput = {
  primaryKeysList: Array<RemoveEntityAddressesPrimaryKeys>;
};

export type RemoveEntityAddressesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityEntitiesInput = {
  primaryKeysList: Array<RemoveEntityEntitiesPrimaryKeys>;
};

export type RemoveEntityEntitiesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityFilesInput = {
  primaryKeysList: Array<RemoveEntityFilesPrimaryKeys>;
};

export type RemoveEntityFilesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypeAddressRolesInput = {
  primaryKeysList: Array<RemoveEntityTypeAddressRolesPrimaryKeys>;
};

export type RemoveEntityTypeAddressRolesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypeEntityTypeRolesInput = {
  primaryKeysList: Array<RemoveEntityTypeEntityTypeRolesPrimaryKeys>;
};

export type RemoveEntityTypeEntityTypeRolesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypeEntityTypesInput = {
  primaryKeysList: Array<RemoveEntityTypeEntityTypesPrimaryKeys>;
};

export type RemoveEntityTypeEntityTypesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypeFieldsInput = {
  primaryKeysList: Array<RemoveEntityTypeFieldsPrimaryKeys>;
};

export type RemoveEntityTypeFieldsPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypeLogTypesInput = {
  primaryKeysList: Array<RemoveEntityTypeLogTypesPrimaryKeys>;
};

export type RemoveEntityTypeLogTypesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypeWorkflowStepsInput = {
  primaryKeysList: Array<RemoveEntityTypeWorkflowStepsPrimaryKeys>;
};

export type RemoveEntityTypeWorkflowStepsPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveEntityTypesInput = {
  primaryKeysList: Array<RemoveEntityTypesPrimaryKeys>;
};

export type RemoveEntityTypesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveRolesInput = {
  primaryKeysList: Array<RemoveRolesPrimaryKeys>;
};

export type RemoveRolesPrimaryKeys = {
  id: Scalars['Int'];
};

export type RemoveUsersInput = {
  primaryKeysList: Array<RemoveUsersPrimaryKeys>;
};

export type RemoveUsersPrimaryKeys = {
  id: Scalars['Int'];
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  rolePermissions: Array<RolePermission>;
};

export type RolePermission = {
  __typename?: 'RolePermission';
  id: Scalars['Int'];
  permission: Permission;
  role: Role;
};

export type SearchAddressInput = {
  text: Scalars['String'];
};

export type SearchAddressOutput = {
  __typename?: 'SearchAddressOutput';
  rows: Array<SearchedAddress>;
};

export type SearchAllInput = {
  text: Scalars['String'];
};

export type SearchAllOutput = {
  __typename?: 'SearchAllOutput';
  count: Scalars['Int'];
  rows: Array<SearchAllResult>;
};

export type SearchAllResult = {
  __typename?: 'SearchAllResult';
  entityId?: Maybe<Scalars['NullableInt']>;
  entityTypeId?: Maybe<Scalars['NullableString']>;
  name?: Maybe<Scalars['NullableString']>;
};

export type SearchAllView = {
  __typename?: 'SearchAllView';
  entity: Entity;
  id?: Maybe<Scalars['NullableBigInt']>;
  text?: Maybe<Scalars['NullableString']>;
};

export type SearchedAddress = {
  __typename?: 'SearchedAddress';
  addressId?: Maybe<Scalars['NullableInt']>;
  awsPlaceId: Scalars['String'];
  city?: Maybe<Scalars['NullableString']>;
  label?: Maybe<Scalars['NullableString']>;
  number?: Maybe<Scalars['NullableString']>;
  state?: Maybe<Scalars['NullableString']>;
  street?: Maybe<Scalars['NullableString']>;
  unit?: Maybe<Scalars['NullableString']>;
  zipCode?: Maybe<Scalars['NullableString']>;
};

export type Select = {
  __typename?: 'Select';
  id: Scalars['Int'];
  name: Scalars['String'];
  selectOptions: Array<SelectOption>;
};

export type SelectOption = {
  __typename?: 'SelectOption';
  id: Scalars['Int'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
  value: Scalars['String'];
};

export type SoftRemoveEntityLogsInput = {
  ids: Array<Scalars['Int']>;
};

export type StringFilter = {
  op: FilterOperators;
  val: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  firstName?: Maybe<Scalars['NullableString']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['NullableString']>;
  userUserRoles: Array<UserRole>;
  username: Scalars['String'];
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['Int'];
  role: Role;
};

export type FileFragment = { __typename?: 'File', id: number, name: string, ext?: string | null | undefined };

export type PermissionListItemFragment = { __typename?: 'Permission', id: number, code: string, name: string };

export type RoleFragment = { __typename?: 'Role', id: number, code: string, name: string, rolePermissions: Array<{ __typename?: 'RolePermission', id: number, permission: { __typename?: 'Permission', id: number, code: string, name: string } }> };

export type RoleListItemFragment = { __typename?: 'Role', id: number, code: string, name: string, rolePermissions: Array<{ __typename?: 'RolePermission', id: number, permission: { __typename?: 'Permission', id: number, code: string, name: string } }> };

export type RolePermissionListItemFragment = { __typename?: 'RolePermission', id: number, permission: { __typename?: 'Permission', id: number, code: string, name: string } };

export type EntityTypeFragment = { __typename?: 'EntityType', id: number, code: string, name: string };

export type EntityTypeListItemFragment = { __typename?: 'EntityType', id: number, code: string, name: string };

export type EntityTypeEntityTypeFragment = { __typename?: 'EntityTypeEntityType', id: number, isParentChild: boolean, entityType1: { __typename?: 'EntityType', id: number, code: string, name: string }, entityType2: { __typename?: 'EntityType', id: number, code: string, name: string } };

export type EntityTypeEntityTypeListItemFragment = { __typename?: 'EntityTypeEntityType', id: number, entityType1: { __typename?: 'EntityType', id: number, code: string, name: string }, entityType2: { __typename?: 'EntityType', id: number, code: string, name: string } };

export type EntityTypeEntityTypeRoleFragment = { __typename?: 'EntityTypeEntityTypeRole', id: number, name1: string, name2: string, entityTypeEntityType: { __typename?: 'EntityTypeEntityType', id: number, isParentChild: boolean, entityType1: { __typename?: 'EntityType', id: number, code: string, name: string }, entityType2: { __typename?: 'EntityType', id: number, code: string, name: string } } };

export type EntityTypeEntityTypeRoleListItemFragment = { __typename?: 'EntityTypeEntityTypeRole', id: number, entityTypeEntityType: { __typename?: 'EntityTypeEntityType', id: number, entityType1: { __typename?: 'EntityType', id: number, code: string, name: string }, entityType2: { __typename?: 'EntityType', id: number, code: string, name: string } } };

export type FieldTypeFragment = { __typename?: 'FieldType', id: string, name: string, jsonType: string };

export type FieldTypeListItemFragment = { __typename?: 'FieldType', id: string, name: string, jsonType: string };

export type EntityTypeFieldFragment = { __typename?: 'EntityTypeField', id: number, code: string, name: string, isRequired: boolean, category?: string | null | undefined, sortOrder: number, isFilterAndTableColumn: boolean, fieldType: { __typename?: 'FieldType', id: string, name: string, jsonType: string }, entityTypeFieldWorkflowSteps: Array<{ __typename?: 'EntityTypeFieldWorkflowStep', id: number, entityTypeWorkflowStep: { __typename?: 'EntityTypeWorkflowStep', id: number, name: string, sortOrder: number } }> };

export type EntityTypeFieldListItemFragment = { __typename?: 'EntityTypeField', id: number, code: string, name: string, isRequired: boolean, category?: string | null | undefined, sortOrder: number, isFilterAndTableColumn: boolean, fieldType: { __typename?: 'FieldType', id: string, name: string, jsonType: string } };

export type EntityFragment = { __typename?: 'Entity', id: number, values: object };

export type EntityListItemFragment = { __typename?: 'Entity', id: number, values: object };

export type RelatedEntityListItemFragment = { __typename?: 'Entity', id: number, values: object, entityEntities: Array<{ __typename?: 'EntityEntity', id: number, isRoleName2ForEntity2: boolean, entityTypeEntityTypeRole?: { __typename?: 'EntityTypeEntityTypeRole', id: number, name1: string, name2: string } | undefined }>, entity2EntityEntities: Array<{ __typename?: 'EntityEntity', id: number, isRoleName2ForEntity2: boolean, entityTypeEntityTypeRole?: { __typename?: 'EntityTypeEntityTypeRole', id: number, name1: string, name2: string } | undefined }> };

export type AddressListItemFragment = { __typename?: 'Address', id: number, number?: string | null | undefined, street?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, unit?: string | null | undefined, zipCode?: string | null | undefined, label?: string | null | undefined };

export type EntityTypeAddressRoleListItemFragment = { __typename?: 'EntityTypeAddressRole', id: number, name: string };

export type EntityAddressListItemFragment = { __typename?: 'EntityAddress', id: number, name?: string | null | undefined, unit?: string | null | undefined, address: { __typename?: 'Address', id: number, street?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, zipCode?: string | null | undefined, unit?: string | null | undefined }, entityTypeAddressRole: { __typename?: 'EntityTypeAddressRole', id: number, name: string } };

export type EntityFileListItemFragment = { __typename?: 'EntityFile', id: number, file: { __typename?: 'File', id: number, name: string, ext?: string | null | undefined } };

export type EntityTypeLogTypeListItemFragment = { __typename?: 'EntityTypeLogType', id: number, code: string, name: string };

export type EntityLogListItemFragment = { __typename?: 'EntityLog', id: number, message: string, type: { __typename?: 'EntityTypeLogType', id: number, name: string } };

export type SearchAllViewListItemFragment = { __typename?: 'SearchAllView', id?: number | null | undefined, text?: string | null | undefined, entity: { __typename?: 'Entity', id: number, type: { __typename?: 'EntityType', id: number, name: string } } };

export type EntityTypeWorkflowStepFragment = { __typename?: 'EntityTypeWorkflowStep', id: number, name: string, sortOrder: number, entityTypeFieldWorkflowSteps: Array<{ __typename?: 'EntityTypeFieldWorkflowStep', id: number, entityTypeField: { __typename?: 'EntityTypeField', id: number, code: string, name: string, isRequired: boolean, category?: string | null | undefined, sortOrder: number, fieldType: { __typename?: 'FieldType', id: string, name: string, jsonType: string } } }> };

export type EntityTypeWorkflowStepListItemFragment = { __typename?: 'EntityTypeWorkflowStep', id: number, name: string, sortOrder: number };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', token: string } };

export type AddEntityTypeMutationVariables = Exact<{
  input: AddEntityTypeInput;
}>;


export type AddEntityTypeMutation = { __typename?: 'Mutation', addEntityTypes: { __typename?: 'AddEntityTypesOutput', rows: Array<{ __typename?: 'AddedEntityType', id: number }> } };

export type EditEntityTypeMutationVariables = Exact<{
  input: EditEntityTypeInput;
}>;


export type EditEntityTypeMutation = { __typename?: 'Mutation', editEntityTypes: number };

export type RemoveEntityTypeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeMutation = { __typename?: 'Mutation', removeEntityTypes: number };

export type AddEntityTypeEntityTypeMutationVariables = Exact<{
  input: AddEntityTypeEntityTypeInput;
}>;


export type AddEntityTypeEntityTypeMutation = { __typename?: 'Mutation', addEntityTypeEntityTypes: { __typename?: 'AddEntityTypeEntityTypesOutput', rows: Array<{ __typename?: 'AddedEntityTypeEntityType', id: number }> } };

export type EditEntityTypeEntityTypeMutationVariables = Exact<{
  input: EditEntityTypeEntityTypeInput;
}>;


export type EditEntityTypeEntityTypeMutation = { __typename?: 'Mutation', editEntityTypeEntityTypes: number };

export type RemoveEntityTypeEntityTypeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeEntityTypeMutation = { __typename?: 'Mutation', removeEntityTypeEntityTypes: number };

export type AddEntityTypeEntityTypeRoleMutationVariables = Exact<{
  input: AddEntityTypeEntityTypeRoleInput;
}>;


export type AddEntityTypeEntityTypeRoleMutation = { __typename?: 'Mutation', addEntityTypeEntityTypeRoles: { __typename?: 'AddEntityTypeEntityTypeRolesOutput', rows: Array<{ __typename?: 'AddedEntityTypeEntityTypeRole', id: number }> } };

export type RemoveEntityTypeEntityTypeRoleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeEntityTypeRoleMutation = { __typename?: 'Mutation', removeEntityTypeEntityTypeRoles: number };

export type AddEntityTypeFieldMutationVariables = Exact<{
  input: AddEntityTypeFieldInput;
}>;


export type AddEntityTypeFieldMutation = { __typename?: 'Mutation', addEntityTypeFields: { __typename?: 'AddEntityTypeFieldsOutput', rows: Array<{ __typename?: 'AddedEntityTypeField', id: number }> } };

export type EditEntityTypeFieldMutationVariables = Exact<{
  input: EditEntityTypeFieldInput;
}>;


export type EditEntityTypeFieldMutation = { __typename?: 'Mutation', editEntityTypeFields: number };

export type RemoveEntityTypeFieldMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeFieldMutation = { __typename?: 'Mutation', removeEntityTypeFields: number };

export type AddEntityMutationVariables = Exact<{
  input: AddEntityInput;
}>;


export type AddEntityMutation = { __typename?: 'Mutation', addEntities: { __typename?: 'AddEntitiesOutput', rows: Array<{ __typename?: 'AddedEntity', id: number }> } };

export type EditEntityMutationVariables = Exact<{
  input: EditEntityInput;
}>;


export type EditEntityMutation = { __typename?: 'Mutation', editEntities: number };

export type RemoveEntityMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type RemoveEntityMutation = { __typename?: 'Mutation', removeEntities: number };

export type AddNewEntityEntityMutationVariables = Exact<{
  input: AddEntityEntityInput;
}>;


export type AddNewEntityEntityMutation = { __typename?: 'Mutation', addEntityEntities: { __typename?: 'AddEntityEntitiesOutput', rows: Array<{ __typename?: 'AddedEntityEntity', id: number, entity2: { __typename?: 'Entity', id: number } }> } };

export type AddExistingEntityEntityMutationVariables = Exact<{
  input: AddExistingEntityEntityInput;
}>;


export type AddExistingEntityEntityMutation = { __typename?: 'Mutation', addExistingEntityEntities: { __typename?: 'AddExistingEntityEntitiesOutput', rows: Array<{ __typename?: 'AddedExistingEntityEntity', id: number }> } };

export type RemoveEntityEntityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityEntityMutation = { __typename?: 'Mutation', removeEntityEntities: number };

export type AddEntityTypeAddressRoleMutationVariables = Exact<{
  input: AddEntityTypeAddressRoleInput;
}>;


export type AddEntityTypeAddressRoleMutation = { __typename?: 'Mutation', addEntityTypeAddressRoles: { __typename?: 'AddEntityTypeAddressRolesOutput', rows: Array<{ __typename?: 'AddedEntityTypeAddressRole', id: number }> } };

export type RemoveEntityTypeAddressRoleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeAddressRoleMutation = { __typename?: 'Mutation', removeEntityTypeAddressRoles: number };

export type AddNewEntityAddressMutationVariables = Exact<{
  input: AddEntityAddressInput;
}>;


export type AddNewEntityAddressMutation = { __typename?: 'Mutation', addEntityAddresses: { __typename?: 'AddEntityAddressesOutput', rows: Array<{ __typename?: 'AddedEntityAddress', id: number, address: { __typename?: 'Address', id: number } }> } };

export type AddExistingEntityAddressMutationVariables = Exact<{
  input: AddExistingEntityAddressInput;
}>;


export type AddExistingEntityAddressMutation = { __typename?: 'Mutation', addExistingEntityAddresses: { __typename?: 'AddExistingEntityAddressesOutput', rows: Array<{ __typename?: 'AddedExistingEntityAddress', id: number }> } };

export type RemoveEntityAddressMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityAddressMutation = { __typename?: 'Mutation', removeEntityAddresses: number };

export type AddEntityFileMutationVariables = Exact<{
  input: AddEntityFileInput;
}>;


export type AddEntityFileMutation = { __typename?: 'Mutation', addEntityFiles: { __typename?: 'AddEntityFilesOutput', rows: Array<{ __typename?: 'AddedEntityFile', id: number }> } };

export type RemoveEntityFileMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityFileMutation = { __typename?: 'Mutation', removeEntityFiles: number };

export type AddEntityTypeLogTypeMutationVariables = Exact<{
  input: AddEntityTypeLogTypeInput;
}>;


export type AddEntityTypeLogTypeMutation = { __typename?: 'Mutation', addEntityTypeLogTypes: { __typename?: 'AddEntityTypeLogTypesOutput', rows: Array<{ __typename?: 'AddedEntityTypeLogType', id: number }> } };

export type RemoveEntityTypeLogTypeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeLogTypeMutation = { __typename?: 'Mutation', removeEntityTypeLogTypes: number };

export type AddEntityLogMutationVariables = Exact<{
  input: AddEntityLogInput;
}>;


export type AddEntityLogMutation = { __typename?: 'Mutation', addEntityLogs: { __typename?: 'AddEntityLogsOutput', rows: Array<{ __typename?: 'AddedEntityLog', id: number }> } };

export type SoftRemoveEntityLogMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SoftRemoveEntityLogMutation = { __typename?: 'Mutation', softRemoveEntityLogs: number };

export type AddEntityTypeWorkflowStepsMutationVariables = Exact<{
  input: AddEntityTypeWorkflowStepInput;
}>;


export type AddEntityTypeWorkflowStepsMutation = { __typename?: 'Mutation', addEntityTypeWorkflowSteps: { __typename?: 'AddEntityTypeWorkflowStepsOutput', rows: Array<{ __typename?: 'AddedEntityTypeWorkflowStep', id: number }> } };

export type EditEntityTypeWorkflowStepMutationVariables = Exact<{
  input: EditEntityTypeWorkflowStepInput;
}>;


export type EditEntityTypeWorkflowStepMutation = { __typename?: 'Mutation', editEntityTypeWorkflowSteps: number };

export type RemoveEntityTypeWorkflowStepMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveEntityTypeWorkflowStepMutation = { __typename?: 'Mutation', removeEntityTypeWorkflowSteps: number };

export type GetPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPermissionsQuery = { __typename?: 'Query', getPermissions: { __typename?: 'GetPermissionsOutput', count: number, rows: Array<{ __typename?: 'Permission', id: number, code: string, name: string }> } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', getRoles: { __typename?: 'GetRolesOutput', count: number, rows: Array<{ __typename?: 'Role', id: number, code: string, name: string, rolePermissions: Array<{ __typename?: 'RolePermission', id: number, permission: { __typename?: 'Permission', id: number, code: string, name: string } }> }> } };

export type GetEntityTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntityTypesQuery = { __typename?: 'Query', getEntityTypes: { __typename?: 'GetEntityTypesOutput', count: number, rows: Array<{ __typename?: 'EntityType', id: number, code: string, name: string }> } };

export type GetEntityTypeEntityTypesQueryVariables = Exact<{
  input?: InputMaybe<GetEntityTypeEntityTypesInput>;
}>;


export type GetEntityTypeEntityTypesQuery = { __typename?: 'Query', getEntityTypeEntityTypes: { __typename?: 'GetEntityTypeEntityTypesOutput', count: number, rows: Array<{ __typename?: 'EntityTypeEntityType', id: number, entityType1: { __typename?: 'EntityType', id: number, code: string, name: string }, entityType2: { __typename?: 'EntityType', id: number, code: string, name: string } }> } };

export type GetEntityTypeEntityTypeRolesQueryVariables = Exact<{
  entityTypeEntityTypeId: Scalars['Int'];
}>;


export type GetEntityTypeEntityTypeRolesQuery = { __typename?: 'Query', getEntityTypeEntityTypeRoles: { __typename?: 'GetEntityTypeEntityTypeRolesOutput', count: number, rows: Array<{ __typename?: 'EntityTypeEntityTypeRole', id: number, entityTypeEntityType: { __typename?: 'EntityTypeEntityType', id: number, entityType1: { __typename?: 'EntityType', id: number, code: string, name: string }, entityType2: { __typename?: 'EntityType', id: number, code: string, name: string } } }> } };

export type GetFieldTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFieldTypesQuery = { __typename?: 'Query', getFieldTypes: { __typename?: 'GetFieldTypesOutput', count: number, rows: Array<{ __typename?: 'FieldType', id: string, name: string, jsonType: string }> } };

export type GetEntityTypeFieldsQueryVariables = Exact<{
  entityTypeId: Scalars['Int'];
}>;


export type GetEntityTypeFieldsQuery = { __typename?: 'Query', getEntityTypeFields: { __typename?: 'GetEntityTypeFieldsOutput', count: number, rows: Array<{ __typename?: 'EntityTypeField', id: number, code: string, name: string, isRequired: boolean, category?: string | null | undefined, sortOrder: number, isFilterAndTableColumn: boolean, fieldType: { __typename?: 'FieldType', id: string, name: string, jsonType: string } }> } };

export type GetEntityTypeFieldQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetEntityTypeFieldQuery = { __typename?: 'Query', getEntityTypeFields: { __typename?: 'GetEntityTypeFieldsOutput', rows: Array<{ __typename?: 'EntityTypeField', id: number, code: string, name: string, isRequired: boolean, category?: string | null | undefined, sortOrder: number, isFilterAndTableColumn: boolean, fieldType: { __typename?: 'FieldType', id: string, name: string, jsonType: string }, entityTypeFieldWorkflowSteps: Array<{ __typename?: 'EntityTypeFieldWorkflowStep', id: number, entityTypeWorkflowStep: { __typename?: 'EntityTypeWorkflowStep', id: number, name: string, sortOrder: number } }> }> } };

export type GetEntitiesQueryVariables = Exact<{
  input: GetEntitiesInput;
}>;


export type GetEntitiesQuery = { __typename?: 'Query', getEntities: { __typename?: 'GetEntitiesOutput', count: number, rows: Array<{ __typename?: 'Entity', id: number, values: object }> } };

export type GetRelatedEntitiesQueryVariables = Exact<{
  entityId: Scalars['BigInt'];
  relatedTypeId: Scalars['Int'];
}>;


export type GetRelatedEntitiesQuery = { __typename?: 'Query', getEntities: { __typename?: 'GetEntitiesOutput', count: number, rows: Array<{ __typename?: 'Entity', id: number, values: object, entityEntities: Array<{ __typename?: 'EntityEntity', id: number, isRoleName2ForEntity2: boolean, entityTypeEntityTypeRole?: { __typename?: 'EntityTypeEntityTypeRole', id: number, name1: string, name2: string } | undefined }>, entity2EntityEntities: Array<{ __typename?: 'EntityEntity', id: number, isRoleName2ForEntity2: boolean, entityTypeEntityTypeRole?: { __typename?: 'EntityTypeEntityTypeRole', id: number, name1: string, name2: string } | undefined }> }> } };

export type GetEntityQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type GetEntityQuery = { __typename?: 'Query', getEntities: { __typename?: 'GetEntitiesOutput', rows: Array<{ __typename?: 'Entity', id: number, values: object }> } };

export type GetAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressesQuery = { __typename?: 'Query', getAddresses: { __typename?: 'GetAddressesOutput', count: number, rows: Array<{ __typename?: 'Address', id: number, number?: string | null | undefined, street?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, unit?: string | null | undefined, zipCode?: string | null | undefined, label?: string | null | undefined }> } };

export type GetEntityTypeAddressRolesQueryVariables = Exact<{
  entityTypeId: Scalars['Int'];
}>;


export type GetEntityTypeAddressRolesQuery = { __typename?: 'Query', getEntityTypeAddressRoles: { __typename?: 'GetEntityTypeAddressRolesOutput', count: number, rows: Array<{ __typename?: 'EntityTypeAddressRole', id: number, name: string }> } };

export type GetEntityAddressesQueryVariables = Exact<{
  entityId: Scalars['BigInt'];
}>;


export type GetEntityAddressesQuery = { __typename?: 'Query', getEntityAddresses: { __typename?: 'GetEntityAddressesOutput', count: number, rows: Array<{ __typename?: 'EntityAddress', id: number, name?: string | null | undefined, unit?: string | null | undefined, address: { __typename?: 'Address', id: number, street?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, zipCode?: string | null | undefined, unit?: string | null | undefined }, entityTypeAddressRole: { __typename?: 'EntityTypeAddressRole', id: number, name: string } }> } };

export type GetEntityFilesQueryVariables = Exact<{
  entityId: Scalars['BigInt'];
}>;


export type GetEntityFilesQuery = { __typename?: 'Query', getEntityFiles: { __typename?: 'GetEntityFilesOutput', count: number, rows: Array<{ __typename?: 'EntityFile', id: number, file: { __typename?: 'File', id: number, name: string, ext?: string | null | undefined } }> } };

export type GetEntityTypeLogTypesQueryVariables = Exact<{
  entityTypeId: Scalars['Int'];
}>;


export type GetEntityTypeLogTypesQuery = { __typename?: 'Query', getEntityTypeLogTypes: { __typename?: 'GetEntityTypeLogTypesOutput', count: number, rows: Array<{ __typename?: 'EntityTypeLogType', id: number, code: string, name: string }> } };

export type GetEntityLogsQueryVariables = Exact<{
  entityId: Scalars['BigInt'];
}>;


export type GetEntityLogsQuery = { __typename?: 'Query', getEntityLogs: { __typename?: 'GetEntityLogsOutput', count: number, rows: Array<{ __typename?: 'EntityLog', id: number, message: string, type: { __typename?: 'EntityTypeLogType', id: number, name: string } }> } };

export type GetSearchAllViewsQueryVariables = Exact<{
  text?: InputMaybe<Scalars['NullableString']>;
}>;


export type GetSearchAllViewsQuery = { __typename?: 'Query', getSearchAllViews: { __typename?: 'GetSearchAllViewsOutput', count: number, rows: Array<{ __typename?: 'SearchAllView', id?: number | null | undefined, text?: string | null | undefined, entity: { __typename?: 'Entity', id: number, type: { __typename?: 'EntityType', id: number, name: string } } }> } };

export type GetEntityTypeWorkflowStepsQueryVariables = Exact<{
  entityTypeId: Scalars['Int'];
}>;


export type GetEntityTypeWorkflowStepsQuery = { __typename?: 'Query', getEntityTypeWorkflowSteps: { __typename?: 'GetEntityTypeWorkflowStepsOutput', count: number, rows: Array<{ __typename?: 'EntityTypeWorkflowStep', id: number, name: string, sortOrder: number }> } };

export const PermissionListItem = gql`
    fragment PermissionListItem on Permission {
  id
  code
  name
}
    `;
export const Role = gql`
    fragment Role on Role {
  id
  code
  name
  rolePermissions {
    id
    permission {
      id
      code
      name
    }
  }
}
    `;
export const RolePermissionListItem = gql`
    fragment RolePermissionListItem on RolePermission {
  id
  permission {
    id
    code
    name
  }
}
    `;
export const RoleListItem = gql`
    fragment RoleListItem on Role {
  id
  code
  name
  rolePermissions {
    ...RolePermissionListItem
  }
}
    ${RolePermissionListItem}`;
export const EntityTypeListItem = gql`
    fragment EntityTypeListItem on EntityType {
  id
  code
  name
}
    `;
export const EntityTypeEntityTypeListItem = gql`
    fragment EntityTypeEntityTypeListItem on EntityTypeEntityType {
  id
  entityType1 {
    id
    code
    name
  }
  entityType2 {
    id
    code
    name
  }
}
    `;
export const EntityType = gql`
    fragment EntityType on EntityType {
  id
  code
  name
}
    `;
export const EntityTypeEntityType = gql`
    fragment EntityTypeEntityType on EntityTypeEntityType {
  id
  isParentChild
  entityType1 {
    ...EntityType
  }
  entityType2 {
    ...EntityType
  }
}
    ${EntityType}`;
export const EntityTypeEntityTypeRole = gql`
    fragment EntityTypeEntityTypeRole on EntityTypeEntityTypeRole {
  id
  name1
  name2
  entityTypeEntityType {
    ...EntityTypeEntityType
  }
}
    ${EntityTypeEntityType}`;
export const EntityTypeEntityTypeRoleListItem = gql`
    fragment EntityTypeEntityTypeRoleListItem on EntityTypeEntityTypeRole {
  id
  entityTypeEntityType {
    id
    entityType1 {
      id
      code
      name
    }
    entityType2 {
      id
      code
      name
    }
  }
}
    `;
export const FieldType = gql`
    fragment FieldType on FieldType {
  id
  name
  jsonType
}
    `;
export const EntityTypeField = gql`
    fragment EntityTypeField on EntityTypeField {
  id
  code
  name
  isRequired
  category
  sortOrder
  isFilterAndTableColumn
  fieldType {
    ...FieldType
  }
  entityTypeFieldWorkflowSteps {
    id
    entityTypeWorkflowStep {
      id
      name
      sortOrder
    }
  }
}
    ${FieldType}`;
export const FieldTypeListItem = gql`
    fragment FieldTypeListItem on FieldType {
  id
  name
  jsonType
}
    `;
export const EntityTypeFieldListItem = gql`
    fragment EntityTypeFieldListItem on EntityTypeField {
  id
  code
  name
  isRequired
  category
  sortOrder
  isFilterAndTableColumn
  fieldType {
    ...FieldTypeListItem
  }
}
    ${FieldTypeListItem}`;
export const Entity = gql`
    fragment Entity on Entity {
  id
  values
}
    `;
export const EntityListItem = gql`
    fragment EntityListItem on Entity {
  id
  values
}
    `;
export const RelatedEntityListItem = gql`
    fragment RelatedEntityListItem on Entity {
  id
  values
  entityEntities {
    id
    isRoleName2ForEntity2
    entityTypeEntityTypeRole {
      id
      name1
      name2
    }
  }
  entity2EntityEntities {
    id
    isRoleName2ForEntity2
    entityTypeEntityTypeRole {
      id
      name1
      name2
    }
  }
}
    `;
export const AddressListItem = gql`
    fragment AddressListItem on Address {
  id
  number
  street
  city
  state
  unit
  zipCode
  label
}
    `;
export const EntityTypeAddressRoleListItem = gql`
    fragment EntityTypeAddressRoleListItem on EntityTypeAddressRole {
  id
  name
}
    `;
export const EntityAddressListItem = gql`
    fragment EntityAddressListItem on EntityAddress {
  id
  name
  unit
  address {
    id
    street
    city
    state
    zipCode
    unit
  }
  entityTypeAddressRole {
    id
    name
  }
}
    `;
export const File = gql`
    fragment File on File {
  id
  name
  ext
}
    `;
export const EntityFileListItem = gql`
    fragment EntityFileListItem on EntityFile {
  id
  file {
    ...File
  }
}
    ${File}`;
export const EntityTypeLogTypeListItem = gql`
    fragment EntityTypeLogTypeListItem on EntityTypeLogType {
  id
  code
  name
}
    `;
export const EntityLogListItem = gql`
    fragment EntityLogListItem on EntityLog {
  id
  message
  type {
    id
    name
  }
}
    `;
export const SearchAllViewListItem = gql`
    fragment SearchAllViewListItem on SearchAllView {
  id
  text
  entity {
    id
    type {
      id
      name
    }
  }
}
    `;
export const EntityTypeWorkflowStep = gql`
    fragment EntityTypeWorkflowStep on EntityTypeWorkflowStep {
  id
  name
  sortOrder
  entityTypeFieldWorkflowSteps {
    id
    entityTypeField {
      id
      code
      name
      isRequired
      category
      sortOrder
      fieldType {
        ...FieldType
      }
    }
  }
}
    ${FieldType}`;
export const EntityTypeWorkflowStepListItem = gql`
    fragment EntityTypeWorkflowStepListItem on EntityTypeWorkflowStep {
  id
  name
  sortOrder
}
    `;
export const Login = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token
  }
}
    `;
export const AddEntityType = gql`
    mutation addEntityType($input: AddEntityTypeInput!) {
  addEntityTypes(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const EditEntityType = gql`
    mutation editEntityType($input: EditEntityTypeInput!) {
  editEntityTypes(input: {inputs: [$input]})
}
    `;
export const RemoveEntityType = gql`
    mutation removeEntityType($id: Int!) {
  removeEntityTypes(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityTypeEntityType = gql`
    mutation addEntityTypeEntityType($input: AddEntityTypeEntityTypeInput!) {
  addEntityTypeEntityTypes(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const EditEntityTypeEntityType = gql`
    mutation editEntityTypeEntityType($input: EditEntityTypeEntityTypeInput!) {
  editEntityTypeEntityTypes(input: {inputs: [$input]})
}
    `;
export const RemoveEntityTypeEntityType = gql`
    mutation removeEntityTypeEntityType($id: Int!) {
  removeEntityTypeEntityTypes(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityTypeEntityTypeRole = gql`
    mutation addEntityTypeEntityTypeRole($input: AddEntityTypeEntityTypeRoleInput!) {
  addEntityTypeEntityTypeRoles(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const RemoveEntityTypeEntityTypeRole = gql`
    mutation removeEntityTypeEntityTypeRole($id: Int!) {
  removeEntityTypeEntityTypeRoles(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityTypeField = gql`
    mutation addEntityTypeField($input: AddEntityTypeFieldInput!) {
  addEntityTypeFields(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const EditEntityTypeField = gql`
    mutation editEntityTypeField($input: EditEntityTypeFieldInput!) {
  editEntityTypeFields(input: {inputs: [$input]})
}
    `;
export const RemoveEntityTypeField = gql`
    mutation removeEntityTypeField($id: Int!) {
  removeEntityTypeFields(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntity = gql`
    mutation addEntity($input: AddEntityInput!) {
  addEntities(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const EditEntity = gql`
    mutation editEntity($input: EditEntityInput!) {
  editEntities(input: {inputs: [$input]})
}
    `;
export const RemoveEntity = gql`
    mutation removeEntity($id: BigInt!) {
  removeEntities(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddNewEntityEntity = gql`
    mutation addNewEntityEntity($input: AddEntityEntityInput!) {
  addEntityEntities(input: {inputs: [$input]}) {
    rows {
      id
      entity2 {
        id
      }
    }
  }
}
    `;
export const AddExistingEntityEntity = gql`
    mutation addExistingEntityEntity($input: AddExistingEntityEntityInput!) {
  addExistingEntityEntities(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const RemoveEntityEntity = gql`
    mutation removeEntityEntity($id: Int!) {
  removeEntityEntities(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityTypeAddressRole = gql`
    mutation addEntityTypeAddressRole($input: AddEntityTypeAddressRoleInput!) {
  addEntityTypeAddressRoles(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const RemoveEntityTypeAddressRole = gql`
    mutation removeEntityTypeAddressRole($id: Int!) {
  removeEntityTypeAddressRoles(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddNewEntityAddress = gql`
    mutation addNewEntityAddress($input: AddEntityAddressInput!) {
  addEntityAddresses(input: {inputs: [$input]}) {
    rows {
      id
      address {
        id
      }
    }
  }
}
    `;
export const AddExistingEntityAddress = gql`
    mutation addExistingEntityAddress($input: AddExistingEntityAddressInput!) {
  addExistingEntityAddresses(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const RemoveEntityAddress = gql`
    mutation removeEntityAddress($id: Int!) {
  removeEntityAddresses(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityFile = gql`
    mutation addEntityFile($input: AddEntityFileInput!) {
  addEntityFiles(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const RemoveEntityFile = gql`
    mutation removeEntityFile($id: Int!) {
  removeEntityFiles(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityTypeLogType = gql`
    mutation addEntityTypeLogType($input: AddEntityTypeLogTypeInput!) {
  addEntityTypeLogTypes(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const RemoveEntityTypeLogType = gql`
    mutation removeEntityTypeLogType($id: Int!) {
  removeEntityTypeLogTypes(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const AddEntityLog = gql`
    mutation addEntityLog($input: AddEntityLogInput!) {
  addEntityLogs(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const SoftRemoveEntityLog = gql`
    mutation softRemoveEntityLog($id: Int!) {
  softRemoveEntityLogs(input: {ids: [$id]})
}
    `;
export const AddEntityTypeWorkflowSteps = gql`
    mutation addEntityTypeWorkflowSteps($input: AddEntityTypeWorkflowStepInput!) {
  addEntityTypeWorkflowSteps(input: {inputs: [$input]}) {
    rows {
      id
    }
  }
}
    `;
export const EditEntityTypeWorkflowStep = gql`
    mutation editEntityTypeWorkflowStep($input: EditEntityTypeWorkflowStepInput!) {
  editEntityTypeWorkflowSteps(input: {inputs: [$input]})
}
    `;
export const RemoveEntityTypeWorkflowStep = gql`
    mutation removeEntityTypeWorkflowStep($id: Int!) {
  removeEntityTypeWorkflowSteps(input: {primaryKeysList: [{id: $id}]})
}
    `;
export const GetPermissions = gql`
    query getPermissions {
  getPermissions {
    count
    rows {
      ...PermissionListItem
    }
  }
}
    ${PermissionListItem}`;
export const GetRoles = gql`
    query getRoles {
  getRoles {
    count
    rows {
      ...RoleListItem
    }
  }
}
    ${RoleListItem}`;
export const GetEntityTypes = gql`
    query getEntityTypes {
  getEntityTypes {
    count
    rows {
      ...EntityTypeListItem
    }
  }
}
    ${EntityTypeListItem}`;
export const GetEntityTypeEntityTypes = gql`
    query getEntityTypeEntityTypes($input: GetEntityTypeEntityTypesInput) {
  getEntityTypeEntityTypes(input: $input) {
    count
    rows {
      ...EntityTypeEntityTypeListItem
    }
  }
}
    ${EntityTypeEntityTypeListItem}`;
export const GetEntityTypeEntityTypeRoles = gql`
    query getEntityTypeEntityTypeRoles($entityTypeEntityTypeId: Int!) {
  getEntityTypeEntityTypeRoles(
    input: {filter: {fields: {entityTypeEntityTypeId: {val: $entityTypeEntityTypeId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityTypeEntityTypeRoleListItem
    }
  }
}
    ${EntityTypeEntityTypeRoleListItem}`;
export const GetFieldTypes = gql`
    query getFieldTypes {
  getFieldTypes {
    count
    rows {
      ...FieldTypeListItem
    }
  }
}
    ${FieldTypeListItem}`;
export const GetEntityTypeFields = gql`
    query getEntityTypeFields($entityTypeId: Int!) {
  getEntityTypeFields(
    input: {filter: {fields: {entityTypeId: {val: $entityTypeId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityTypeFieldListItem
    }
  }
}
    ${EntityTypeFieldListItem}`;
export const GetEntityTypeField = gql`
    query getEntityTypeField($id: Int!) {
  getEntityTypeFields(input: {filter: {fields: {id: {val: $id, op: EQUAL}}}}) {
    rows {
      ...EntityTypeField
    }
  }
}
    ${EntityTypeField}`;
export const GetEntities = gql`
    query getEntities($input: GetEntitiesInput!) {
  getEntities(input: $input) {
    count
    rows {
      ...EntityListItem
    }
  }
}
    ${EntityListItem}`;
export const GetRelatedEntities = gql`
    query getRelatedEntities($entityId: BigInt!, $relatedTypeId: Int!) {
  getEntities(
    input: {filter: {and: [{fields: {typeId: {val: $relatedTypeId, op: EQUAL}}}, {or: [{fields: {entityEntities: {entity2Id: {val: $entityId, op: EQUAL}}}}, {fields: {entity2EntityEntities: {entity1Id: {val: $entityId, op: EQUAL}}}}]}]}}
  ) {
    count
    rows {
      ...RelatedEntityListItem
    }
  }
}
    ${RelatedEntityListItem}`;
export const GetEntity = gql`
    query getEntity($id: BigInt!) {
  getEntities(input: {filter: {fields: {id: {val: $id, op: EQUAL}}}}) {
    rows {
      ...Entity
    }
  }
}
    ${Entity}`;
export const GetAddresses = gql`
    query getAddresses {
  getAddresses {
    count
    rows {
      ...AddressListItem
    }
  }
}
    ${AddressListItem}`;
export const GetEntityTypeAddressRoles = gql`
    query getEntityTypeAddressRoles($entityTypeId: Int!) {
  getEntityTypeAddressRoles(
    input: {filter: {fields: {entityTypeId: {val: $entityTypeId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityTypeAddressRoleListItem
    }
  }
}
    ${EntityTypeAddressRoleListItem}`;
export const GetEntityAddresses = gql`
    query getEntityAddresses($entityId: BigInt!) {
  getEntityAddresses(
    input: {filter: {fields: {entityId: {val: $entityId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityAddressListItem
    }
  }
}
    ${EntityAddressListItem}`;
export const GetEntityFiles = gql`
    query getEntityFiles($entityId: BigInt!) {
  getEntityFiles(
    input: {filter: {fields: {entityId: {val: $entityId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityFileListItem
    }
  }
}
    ${EntityFileListItem}`;
export const GetEntityTypeLogTypes = gql`
    query getEntityTypeLogTypes($entityTypeId: Int!) {
  getEntityTypeLogTypes(
    input: {filter: {fields: {entityTypeId: {val: $entityTypeId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityTypeLogTypeListItem
    }
  }
}
    ${EntityTypeLogTypeListItem}`;
export const GetEntityLogs = gql`
    query getEntityLogs($entityId: BigInt!) {
  getEntityLogs(
    input: {filter: {fields: {entityId: {val: $entityId, op: EQUAL}, deletedAt: {val: null, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityLogListItem
    }
  }
}
    ${EntityLogListItem}`;
export const GetSearchAllViews = gql`
    query getSearchAllViews($text: NullableString) {
  getSearchAllViews(input: {filter: {fields: {text: {val: $text, op: LIKE}}}}) {
    count
    rows {
      ...SearchAllViewListItem
    }
  }
}
    ${SearchAllViewListItem}`;
export const GetEntityTypeWorkflowSteps = gql`
    query getEntityTypeWorkflowSteps($entityTypeId: Int!) {
  getEntityTypeWorkflowSteps(
    input: {filter: {fields: {entityTypeId: {val: $entityTypeId, op: EQUAL}}}}
  ) {
    count
    rows {
      ...EntityTypeWorkflowStepListItem
    }
  }
}
    ${EntityTypeWorkflowStepListItem}`;
export const PermissionListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PermissionListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PermissionListItemFragment, unknown>;
export const RoleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rolePermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RoleFragment, unknown>;
export const RolePermissionListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RolePermissionListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RolePermission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RolePermissionListItemFragment, unknown>;
export const RoleListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rolePermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RolePermissionListItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RolePermissionListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RolePermission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RoleListItemFragment, unknown>;
export const EntityTypeListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<EntityTypeListItemFragment, unknown>;
export const EntityTypeEntityTypeListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityType1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityType2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EntityTypeEntityTypeListItemFragment, unknown>;
export const EntityTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<EntityTypeFragment, unknown>;
export const EntityTypeEntityTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isParentChild"}},{"kind":"Field","name":{"kind":"Name","value":"entityType1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityType2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<EntityTypeEntityTypeFragment, unknown>;
export const EntityTypeEntityTypeRoleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityTypeRole"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityTypeRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name1"}},{"kind":"Field","name":{"kind":"Name","value":"name2"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeEntityType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isParentChild"}},{"kind":"Field","name":{"kind":"Name","value":"entityType1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityType2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityType"}}]}}]}}]} as unknown as DocumentNode<EntityTypeEntityTypeRoleFragment, unknown>;
export const EntityTypeEntityTypeRoleListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityTypeRoleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityTypeRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityType1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityType2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<EntityTypeEntityTypeRoleListItemFragment, unknown>;
export const FieldTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}}]} as unknown as DocumentNode<FieldTypeFragment, unknown>;
export const EntityTypeFieldFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeField"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isFilterAndTableColumn"}},{"kind":"Field","name":{"kind":"Name","value":"fieldType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeFieldWorkflowSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeWorkflowStep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}}]} as unknown as DocumentNode<EntityTypeFieldFragment, unknown>;
export const FieldTypeListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}}]} as unknown as DocumentNode<FieldTypeListItemFragment, unknown>;
export const EntityTypeFieldListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeFieldListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isFilterAndTableColumn"}},{"kind":"Field","name":{"kind":"Name","value":"fieldType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldTypeListItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}}]} as unknown as DocumentNode<EntityTypeFieldListItemFragment, unknown>;
export const EntityFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Entity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Entity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]} as unknown as DocumentNode<EntityFragment, unknown>;
export const EntityListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Entity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]} as unknown as DocumentNode<EntityListItemFragment, unknown>;
export const RelatedEntityListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RelatedEntityListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Entity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"entityEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRoleName2ForEntity2"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityTypeRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name1"}},{"kind":"Field","name":{"kind":"Name","value":"name2"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity2EntityEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRoleName2ForEntity2"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityTypeRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name1"}},{"kind":"Field","name":{"kind":"Name","value":"name2"}}]}}]}}]}}]} as unknown as DocumentNode<RelatedEntityListItemFragment, unknown>;
export const AddressListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<AddressListItemFragment, unknown>;
export const EntityTypeAddressRoleListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeAddressRoleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeAddressRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<EntityTypeAddressRoleListItemFragment, unknown>;
export const EntityAddressListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityAddressListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityAddress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeAddressRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EntityAddressListItemFragment, unknown>;
export const FileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}}]}}]} as unknown as DocumentNode<FileFragment, unknown>;
export const EntityFileListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityFileListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"File"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}}]}}]} as unknown as DocumentNode<EntityFileListItemFragment, unknown>;
export const EntityTypeLogTypeListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeLogTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeLogType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<EntityTypeLogTypeListItemFragment, unknown>;
export const EntityLogListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityLogListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EntityLogListItemFragment, unknown>;
export const SearchAllViewListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchAllViewListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchAllView"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"entity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchAllViewListItemFragment, unknown>;
export const EntityTypeWorkflowStepFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeWorkflowStep"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeWorkflowStep"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeFieldWorkflowSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"fieldType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldType"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}}]} as unknown as DocumentNode<EntityTypeWorkflowStepFragment, unknown>;
export const EntityTypeWorkflowStepListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeWorkflowStepListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeWorkflowStep"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]} as unknown as DocumentNode<EntityTypeWorkflowStepListItemFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const AddEntityTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeMutation, AddEntityTypeMutationVariables>;
export const EditEntityTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEntityType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEntityTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}]}]}}]} as unknown as DocumentNode<EditEntityTypeMutation, EditEntityTypeMutationVariables>;
export const RemoveEntityTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeMutation, RemoveEntityTypeMutationVariables>;
export const AddEntityTypeEntityTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityTypeEntityType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeEntityTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypeEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeEntityTypeMutation, AddEntityTypeEntityTypeMutationVariables>;
export const EditEntityTypeEntityTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEntityTypeEntityType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEntityTypeEntityTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEntityTypeEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}]}]}}]} as unknown as DocumentNode<EditEntityTypeEntityTypeMutation, EditEntityTypeEntityTypeMutationVariables>;
export const RemoveEntityTypeEntityTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityTypeEntityType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypeEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeEntityTypeMutation, RemoveEntityTypeEntityTypeMutationVariables>;
export const AddEntityTypeEntityTypeRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityTypeEntityTypeRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeEntityTypeRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypeEntityTypeRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeEntityTypeRoleMutation, AddEntityTypeEntityTypeRoleMutationVariables>;
export const RemoveEntityTypeEntityTypeRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityTypeEntityTypeRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypeEntityTypeRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeEntityTypeRoleMutation, RemoveEntityTypeEntityTypeRoleMutationVariables>;
export const AddEntityTypeFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityTypeField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeFieldInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypeFields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeFieldMutation, AddEntityTypeFieldMutationVariables>;
export const EditEntityTypeFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEntityTypeField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEntityTypeFieldInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEntityTypeFields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}]}]}}]} as unknown as DocumentNode<EditEntityTypeFieldMutation, EditEntityTypeFieldMutationVariables>;
export const RemoveEntityTypeFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityTypeField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypeFields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeFieldMutation, RemoveEntityTypeFieldMutationVariables>;
export const AddEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityMutation, AddEntityMutationVariables>;
export const EditEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEntityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}]}]}}]} as unknown as DocumentNode<EditEntityMutation, EditEntityMutationVariables>;
export const RemoveEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityMutation, RemoveEntityMutationVariables>;
export const AddNewEntityEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addNewEntityEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityEntityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entity2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddNewEntityEntityMutation, AddNewEntityEntityMutationVariables>;
export const AddExistingEntityEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addExistingEntityEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddExistingEntityEntityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExistingEntityEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddExistingEntityEntityMutation, AddExistingEntityEntityMutationVariables>;
export const RemoveEntityEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityEntityMutation, RemoveEntityEntityMutationVariables>;
export const AddEntityTypeAddressRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityTypeAddressRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeAddressRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypeAddressRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeAddressRoleMutation, AddEntityTypeAddressRoleMutationVariables>;
export const RemoveEntityTypeAddressRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityTypeAddressRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypeAddressRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeAddressRoleMutation, RemoveEntityTypeAddressRoleMutationVariables>;
export const AddNewEntityAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addNewEntityAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityAddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityAddresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddNewEntityAddressMutation, AddNewEntityAddressMutationVariables>;
export const AddExistingEntityAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addExistingEntityAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddExistingEntityAddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExistingEntityAddresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddExistingEntityAddressMutation, AddExistingEntityAddressMutationVariables>;
export const RemoveEntityAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityAddresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityAddressMutation, RemoveEntityAddressMutationVariables>;
export const AddEntityFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityFileMutation, AddEntityFileMutationVariables>;
export const RemoveEntityFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityFileMutation, RemoveEntityFileMutationVariables>;
export const AddEntityTypeLogTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityTypeLogType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeLogTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypeLogTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeLogTypeMutation, AddEntityTypeLogTypeMutationVariables>;
export const RemoveEntityTypeLogTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityTypeLogType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypeLogTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeLogTypeMutation, RemoveEntityTypeLogTypeMutationVariables>;
export const AddEntityLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityLogMutation, AddEntityLogMutationVariables>;
export const SoftRemoveEntityLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"softRemoveEntityLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"softRemoveEntityLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ids"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"id"}}]}}]}}]}]}}]} as unknown as DocumentNode<SoftRemoveEntityLogMutation, SoftRemoveEntityLogMutationVariables>;
export const AddEntityTypeWorkflowStepsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityTypeWorkflowSteps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEntityTypeWorkflowStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityTypeWorkflowSteps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityTypeWorkflowStepsMutation, AddEntityTypeWorkflowStepsMutationVariables>;
export const EditEntityTypeWorkflowStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEntityTypeWorkflowStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEntityTypeWorkflowStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEntityTypeWorkflowSteps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"inputs"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}]}}]}]}}]} as unknown as DocumentNode<EditEntityTypeWorkflowStepMutation, EditEntityTypeWorkflowStepMutationVariables>;
export const RemoveEntityTypeWorkflowStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityTypeWorkflowStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityTypeWorkflowSteps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"primaryKeysList"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]}]}}]} as unknown as DocumentNode<RemoveEntityTypeWorkflowStepMutation, RemoveEntityTypeWorkflowStepMutationVariables>;
export const GetPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PermissionListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PermissionListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetPermissionsQuery, GetPermissionsQueryVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RolePermissionListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RolePermission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rolePermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RolePermissionListItem"}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const GetEntityTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetEntityTypesQuery, GetEntityTypesQueryVariables>;
export const GetEntityTypeEntityTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeEntityTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetEntityTypeEntityTypesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeEntityTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeEntityTypeListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityType1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityType2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetEntityTypeEntityTypesQuery, GetEntityTypeEntityTypesQueryVariables>;
export const GetEntityTypeEntityTypeRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeEntityTypeRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeEntityTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeEntityTypeRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityTypeEntityTypeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeEntityTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeEntityTypeRoleListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeEntityTypeRoleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeEntityTypeRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityType1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityType2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetEntityTypeEntityTypeRolesQuery, GetEntityTypeEntityTypeRolesQueryVariables>;
export const GetFieldTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFieldTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFieldTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldTypeListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}}]} as unknown as DocumentNode<GetFieldTypesQuery, GetFieldTypesQueryVariables>;
export const GetEntityTypeFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeFields"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeFields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityTypeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeFieldListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeFieldListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isFilterAndTableColumn"}},{"kind":"Field","name":{"kind":"Name","value":"fieldType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldTypeListItem"}}]}}]}}]} as unknown as DocumentNode<GetEntityTypeFieldsQuery, GetEntityTypeFieldsQueryVariables>;
export const GetEntityTypeFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeFields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeField"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"jsonType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeField"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isFilterAndTableColumn"}},{"kind":"Field","name":{"kind":"Name","value":"fieldType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeFieldWorkflowSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeWorkflowStep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]}}]} as unknown as DocumentNode<GetEntityTypeFieldQuery, GetEntityTypeFieldQueryVariables>;
export const GetEntitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetEntitiesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Entity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]} as unknown as DocumentNode<GetEntitiesQuery, GetEntitiesQueryVariables>;
export const GetRelatedEntitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRelatedEntities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"relatedTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"typeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"relatedTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityEntities"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entity2Id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entity2EntityEntities"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entity1Id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}]}}]}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RelatedEntityListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RelatedEntityListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Entity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"entityEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRoleName2ForEntity2"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityTypeRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name1"}},{"kind":"Field","name":{"kind":"Name","value":"name2"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity2EntityEntities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRoleName2ForEntity2"}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeEntityTypeRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name1"}},{"kind":"Field","name":{"kind":"Name","value":"name2"}}]}}]}}]}}]} as unknown as DocumentNode<GetRelatedEntitiesQuery, GetRelatedEntitiesQueryVariables>;
export const GetEntityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Entity"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Entity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Entity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]} as unknown as DocumentNode<GetEntityQuery, GetEntityQueryVariables>;
export const GetAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]} as unknown as DocumentNode<GetAddressesQuery, GetAddressesQueryVariables>;
export const GetEntityTypeAddressRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeAddressRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeAddressRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityTypeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeAddressRoleListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeAddressRoleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeAddressRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetEntityTypeAddressRolesQuery, GetEntityTypeAddressRolesQueryVariables>;
export const GetEntityAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityAddresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityAddresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityAddressListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityAddressListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityAddress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entityTypeAddressRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetEntityAddressesQuery, GetEntityAddressesQueryVariables>;
export const GetEntityFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityFileListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityFileListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"File"}}]}}]}}]} as unknown as DocumentNode<GetEntityFilesQuery, GetEntityFilesQueryVariables>;
export const GetEntityTypeLogTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeLogTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeLogTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityTypeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeLogTypeListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeLogTypeListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeLogType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetEntityTypeLogTypesQuery, GetEntityTypeLogTypesQueryVariables>;
export const GetEntityLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"deletedAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"NullValue"}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityLogListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityLogListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetEntityLogsQuery, GetEntityLogsQueryVariables>;
export const GetSearchAllViewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSearchAllViews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NullableString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSearchAllViews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"text"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"LIKE"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchAllViewListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchAllViewListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchAllView"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"entity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSearchAllViewsQuery, GetSearchAllViewsQueryVariables>;
export const GetEntityTypeWorkflowStepsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEntityTypeWorkflowSteps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEntityTypeWorkflowSteps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityTypeId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"val"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"op"},"value":{"kind":"EnumValue","value":"EQUAL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EntityTypeWorkflowStepListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EntityTypeWorkflowStepListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EntityTypeWorkflowStep"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]} as unknown as DocumentNode<GetEntityTypeWorkflowStepsQuery, GetEntityTypeWorkflowStepsQueryVariables>;