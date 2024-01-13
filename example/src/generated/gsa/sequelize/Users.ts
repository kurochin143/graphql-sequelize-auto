import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Permissions, PermissionsId } from './Permissions';
import type { RolePermissions, RolePermissionsId } from './RolePermissions';
import type { Roles, RolesId } from './Roles';
import type { UserRoles, UserRolesId } from './UserRoles';

export interface UsersAttributes {
	id: number;
	createdAt: Date;
	createdBy: number | null;
	updatedAt: Date | null;
	updatedBy: number | null;
	deletedAt: Date | null;
	deletedBy: number | null;
	username: string;
	password: string;
	firstName: string | null;
	lastName: string | null;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "firstName" | "lastName";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
	id!: number;
	createdAt!: Date;
	createdBy!: number | null;
	updatedAt!: Date | null;
	updatedBy!: number | null;
	deletedAt!: Date | null;
	deletedBy!: number | null;
	username!: string;
	password!: string;
	firstName!: string | null;
	lastName!: string | null;

	// Users hasMany Permissions via createdBy
	permissions!: Permissions[];
	getPermissions!: Sequelize.HasManyGetAssociationsMixin<Permissions>;
	setPermissions!: Sequelize.HasManySetAssociationsMixin<Permissions, PermissionsId>;
	addPermission!: Sequelize.HasManyAddAssociationMixin<Permissions, PermissionsId>;
	addPermissions!: Sequelize.HasManyAddAssociationsMixin<Permissions, PermissionsId>;
	createPermission!: Sequelize.HasManyCreateAssociationMixin<Permissions>;
	removePermission!: Sequelize.HasManyRemoveAssociationMixin<Permissions, PermissionsId>;
	removePermissions!: Sequelize.HasManyRemoveAssociationsMixin<Permissions, PermissionsId>;
	hasPermission!: Sequelize.HasManyHasAssociationMixin<Permissions, PermissionsId>;
	hasPermissions!: Sequelize.HasManyHasAssociationsMixin<Permissions, PermissionsId>;
	countPermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany Permissions via deletedBy
	deletedByPermissions!: Permissions[];
	getDeletedByPermissions!: Sequelize.HasManyGetAssociationsMixin<Permissions>;
	setDeletedByPermissions!: Sequelize.HasManySetAssociationsMixin<Permissions, PermissionsId>;
	addDeletedByPermission!: Sequelize.HasManyAddAssociationMixin<Permissions, PermissionsId>;
	addDeletedByPermissions!: Sequelize.HasManyAddAssociationsMixin<Permissions, PermissionsId>;
	createDeletedByPermission!: Sequelize.HasManyCreateAssociationMixin<Permissions>;
	removeDeletedByPermission!: Sequelize.HasManyRemoveAssociationMixin<Permissions, PermissionsId>;
	removeDeletedByPermissions!: Sequelize.HasManyRemoveAssociationsMixin<Permissions, PermissionsId>;
	hasDeletedByPermission!: Sequelize.HasManyHasAssociationMixin<Permissions, PermissionsId>;
	hasDeletedByPermissions!: Sequelize.HasManyHasAssociationsMixin<Permissions, PermissionsId>;
	countDeletedByPermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany Permissions via updatedBy
	updatedByPermissions!: Permissions[];
	getUpdatedByPermissions!: Sequelize.HasManyGetAssociationsMixin<Permissions>;
	setUpdatedByPermissions!: Sequelize.HasManySetAssociationsMixin<Permissions, PermissionsId>;
	addUpdatedByPermission!: Sequelize.HasManyAddAssociationMixin<Permissions, PermissionsId>;
	addUpdatedByPermissions!: Sequelize.HasManyAddAssociationsMixin<Permissions, PermissionsId>;
	createUpdatedByPermission!: Sequelize.HasManyCreateAssociationMixin<Permissions>;
	removeUpdatedByPermission!: Sequelize.HasManyRemoveAssociationMixin<Permissions, PermissionsId>;
	removeUpdatedByPermissions!: Sequelize.HasManyRemoveAssociationsMixin<Permissions, PermissionsId>;
	hasUpdatedByPermission!: Sequelize.HasManyHasAssociationMixin<Permissions, PermissionsId>;
	hasUpdatedByPermissions!: Sequelize.HasManyHasAssociationsMixin<Permissions, PermissionsId>;
	countUpdatedByPermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany RolePermissions via createdBy
	rolePermissions!: RolePermissions[];
	getRolePermissions!: Sequelize.HasManyGetAssociationsMixin<RolePermissions>;
	setRolePermissions!: Sequelize.HasManySetAssociationsMixin<RolePermissions, RolePermissionsId>;
	addRolePermission!: Sequelize.HasManyAddAssociationMixin<RolePermissions, RolePermissionsId>;
	addRolePermissions!: Sequelize.HasManyAddAssociationsMixin<RolePermissions, RolePermissionsId>;
	createRolePermission!: Sequelize.HasManyCreateAssociationMixin<RolePermissions>;
	removeRolePermission!: Sequelize.HasManyRemoveAssociationMixin<RolePermissions, RolePermissionsId>;
	removeRolePermissions!: Sequelize.HasManyRemoveAssociationsMixin<RolePermissions, RolePermissionsId>;
	hasRolePermission!: Sequelize.HasManyHasAssociationMixin<RolePermissions, RolePermissionsId>;
	hasRolePermissions!: Sequelize.HasManyHasAssociationsMixin<RolePermissions, RolePermissionsId>;
	countRolePermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany RolePermissions via deletedBy
	deletedByRolePermissions!: RolePermissions[];
	getDeletedByRolePermissions!: Sequelize.HasManyGetAssociationsMixin<RolePermissions>;
	setDeletedByRolePermissions!: Sequelize.HasManySetAssociationsMixin<RolePermissions, RolePermissionsId>;
	addDeletedByRolePermission!: Sequelize.HasManyAddAssociationMixin<RolePermissions, RolePermissionsId>;
	addDeletedByRolePermissions!: Sequelize.HasManyAddAssociationsMixin<RolePermissions, RolePermissionsId>;
	createDeletedByRolePermission!: Sequelize.HasManyCreateAssociationMixin<RolePermissions>;
	removeDeletedByRolePermission!: Sequelize.HasManyRemoveAssociationMixin<RolePermissions, RolePermissionsId>;
	removeDeletedByRolePermissions!: Sequelize.HasManyRemoveAssociationsMixin<RolePermissions, RolePermissionsId>;
	hasDeletedByRolePermission!: Sequelize.HasManyHasAssociationMixin<RolePermissions, RolePermissionsId>;
	hasDeletedByRolePermissions!: Sequelize.HasManyHasAssociationsMixin<RolePermissions, RolePermissionsId>;
	countDeletedByRolePermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany RolePermissions via updatedBy
	updatedByRolePermissions!: RolePermissions[];
	getUpdatedByRolePermissions!: Sequelize.HasManyGetAssociationsMixin<RolePermissions>;
	setUpdatedByRolePermissions!: Sequelize.HasManySetAssociationsMixin<RolePermissions, RolePermissionsId>;
	addUpdatedByRolePermission!: Sequelize.HasManyAddAssociationMixin<RolePermissions, RolePermissionsId>;
	addUpdatedByRolePermissions!: Sequelize.HasManyAddAssociationsMixin<RolePermissions, RolePermissionsId>;
	createUpdatedByRolePermission!: Sequelize.HasManyCreateAssociationMixin<RolePermissions>;
	removeUpdatedByRolePermission!: Sequelize.HasManyRemoveAssociationMixin<RolePermissions, RolePermissionsId>;
	removeUpdatedByRolePermissions!: Sequelize.HasManyRemoveAssociationsMixin<RolePermissions, RolePermissionsId>;
	hasUpdatedByRolePermission!: Sequelize.HasManyHasAssociationMixin<RolePermissions, RolePermissionsId>;
	hasUpdatedByRolePermissions!: Sequelize.HasManyHasAssociationsMixin<RolePermissions, RolePermissionsId>;
	countUpdatedByRolePermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany Roles via createdBy
	roles!: Roles[];
	getRoles!: Sequelize.HasManyGetAssociationsMixin<Roles>;
	setRoles!: Sequelize.HasManySetAssociationsMixin<Roles, RolesId>;
	addRole!: Sequelize.HasManyAddAssociationMixin<Roles, RolesId>;
	addRoles!: Sequelize.HasManyAddAssociationsMixin<Roles, RolesId>;
	createRole!: Sequelize.HasManyCreateAssociationMixin<Roles>;
	removeRole!: Sequelize.HasManyRemoveAssociationMixin<Roles, RolesId>;
	removeRoles!: Sequelize.HasManyRemoveAssociationsMixin<Roles, RolesId>;
	hasRole!: Sequelize.HasManyHasAssociationMixin<Roles, RolesId>;
	hasRoles!: Sequelize.HasManyHasAssociationsMixin<Roles, RolesId>;
	countRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany Roles via deletedBy
	deletedByRoles!: Roles[];
	getDeletedByRoles!: Sequelize.HasManyGetAssociationsMixin<Roles>;
	setDeletedByRoles!: Sequelize.HasManySetAssociationsMixin<Roles, RolesId>;
	addDeletedByRole!: Sequelize.HasManyAddAssociationMixin<Roles, RolesId>;
	addDeletedByRoles!: Sequelize.HasManyAddAssociationsMixin<Roles, RolesId>;
	createDeletedByRole!: Sequelize.HasManyCreateAssociationMixin<Roles>;
	removeDeletedByRole!: Sequelize.HasManyRemoveAssociationMixin<Roles, RolesId>;
	removeDeletedByRoles!: Sequelize.HasManyRemoveAssociationsMixin<Roles, RolesId>;
	hasDeletedByRole!: Sequelize.HasManyHasAssociationMixin<Roles, RolesId>;
	hasDeletedByRoles!: Sequelize.HasManyHasAssociationsMixin<Roles, RolesId>;
	countDeletedByRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany Roles via updatedBy
	updatedByRoles!: Roles[];
	getUpdatedByRoles!: Sequelize.HasManyGetAssociationsMixin<Roles>;
	setUpdatedByRoles!: Sequelize.HasManySetAssociationsMixin<Roles, RolesId>;
	addUpdatedByRole!: Sequelize.HasManyAddAssociationMixin<Roles, RolesId>;
	addUpdatedByRoles!: Sequelize.HasManyAddAssociationsMixin<Roles, RolesId>;
	createUpdatedByRole!: Sequelize.HasManyCreateAssociationMixin<Roles>;
	removeUpdatedByRole!: Sequelize.HasManyRemoveAssociationMixin<Roles, RolesId>;
	removeUpdatedByRoles!: Sequelize.HasManyRemoveAssociationsMixin<Roles, RolesId>;
	hasUpdatedByRole!: Sequelize.HasManyHasAssociationMixin<Roles, RolesId>;
	hasUpdatedByRoles!: Sequelize.HasManyHasAssociationsMixin<Roles, RolesId>;
	countUpdatedByRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany UserRoles via createdBy
	userRoles!: UserRoles[];
	getUserRoles!: Sequelize.HasManyGetAssociationsMixin<UserRoles>;
	setUserRoles!: Sequelize.HasManySetAssociationsMixin<UserRoles, UserRolesId>;
	addUserRole!: Sequelize.HasManyAddAssociationMixin<UserRoles, UserRolesId>;
	addUserRoles!: Sequelize.HasManyAddAssociationsMixin<UserRoles, UserRolesId>;
	createUserRole!: Sequelize.HasManyCreateAssociationMixin<UserRoles>;
	removeUserRole!: Sequelize.HasManyRemoveAssociationMixin<UserRoles, UserRolesId>;
	removeUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<UserRoles, UserRolesId>;
	hasUserRole!: Sequelize.HasManyHasAssociationMixin<UserRoles, UserRolesId>;
	hasUserRoles!: Sequelize.HasManyHasAssociationsMixin<UserRoles, UserRolesId>;
	countUserRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany UserRoles via deletedBy
	deletedByUserRoles!: UserRoles[];
	getDeletedByUserRoles!: Sequelize.HasManyGetAssociationsMixin<UserRoles>;
	setDeletedByUserRoles!: Sequelize.HasManySetAssociationsMixin<UserRoles, UserRolesId>;
	addDeletedByUserRole!: Sequelize.HasManyAddAssociationMixin<UserRoles, UserRolesId>;
	addDeletedByUserRoles!: Sequelize.HasManyAddAssociationsMixin<UserRoles, UserRolesId>;
	createDeletedByUserRole!: Sequelize.HasManyCreateAssociationMixin<UserRoles>;
	removeDeletedByUserRole!: Sequelize.HasManyRemoveAssociationMixin<UserRoles, UserRolesId>;
	removeDeletedByUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<UserRoles, UserRolesId>;
	hasDeletedByUserRole!: Sequelize.HasManyHasAssociationMixin<UserRoles, UserRolesId>;
	hasDeletedByUserRoles!: Sequelize.HasManyHasAssociationsMixin<UserRoles, UserRolesId>;
	countDeletedByUserRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany UserRoles via updatedBy
	updatedByUserRoles!: UserRoles[];
	getUpdatedByUserRoles!: Sequelize.HasManyGetAssociationsMixin<UserRoles>;
	setUpdatedByUserRoles!: Sequelize.HasManySetAssociationsMixin<UserRoles, UserRolesId>;
	addUpdatedByUserRole!: Sequelize.HasManyAddAssociationMixin<UserRoles, UserRolesId>;
	addUpdatedByUserRoles!: Sequelize.HasManyAddAssociationsMixin<UserRoles, UserRolesId>;
	createUpdatedByUserRole!: Sequelize.HasManyCreateAssociationMixin<UserRoles>;
	removeUpdatedByUserRole!: Sequelize.HasManyRemoveAssociationMixin<UserRoles, UserRolesId>;
	removeUpdatedByUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<UserRoles, UserRolesId>;
	hasUpdatedByUserRole!: Sequelize.HasManyHasAssociationMixin<UserRoles, UserRolesId>;
	hasUpdatedByUserRoles!: Sequelize.HasManyHasAssociationsMixin<UserRoles, UserRolesId>;
	countUpdatedByUserRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users hasMany UserRoles via userId
	userUserRoles!: UserRoles[];
	getUserUserRoles!: Sequelize.HasManyGetAssociationsMixin<UserRoles>;
	setUserUserRoles!: Sequelize.HasManySetAssociationsMixin<UserRoles, UserRolesId>;
	addUserUserRole!: Sequelize.HasManyAddAssociationMixin<UserRoles, UserRolesId>;
	addUserUserRoles!: Sequelize.HasManyAddAssociationsMixin<UserRoles, UserRolesId>;
	createUserUserRole!: Sequelize.HasManyCreateAssociationMixin<UserRoles>;
	removeUserUserRole!: Sequelize.HasManyRemoveAssociationMixin<UserRoles, UserRolesId>;
	removeUserUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<UserRoles, UserRolesId>;
	hasUserUserRole!: Sequelize.HasManyHasAssociationMixin<UserRoles, UserRolesId>;
	hasUserUserRoles!: Sequelize.HasManyHasAssociationsMixin<UserRoles, UserRolesId>;
	countUserUserRoles!: Sequelize.HasManyCountAssociationsMixin;
	// Users belongsTo Users via createdBy
	createdByUser!: Users;
	getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// Users belongsTo Users via deletedBy
	deletedByUser!: Users;
	getDeletedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setDeletedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createDeletedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// Users belongsTo Users via updatedBy
	updatedByUser!: Users;
	getUpdatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUpdatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUpdatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

	static initModel(sequelize: Sequelize.Sequelize): typeof Users {
		return sequelize.define('Users', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'created_by'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'updated_at'
		},
		updatedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'updated_by'
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'deleted_at'
		},
		deletedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'deleted_by'
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "uc__users__username"
		},
		password: {
			type: DataTypes.CHAR(60),
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'first_name'
		},
		lastName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'last_name'
		}
	}, {
		tableName: 'users',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "idx__users__username",
				fields: [
					{ name: "username" },
				]
			},
			{
				name: "idx__users__username__first_name__last_name",
				fields: [
					{ name: "username" },
					{ name: "first_name" },
					{ name: "last_name" },
				]
			},
			{
				name: "pk__users",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
			{
				name: "uc__users__username",
				unique: true,
				fields: [
					{ name: "username" },
				]
			},
		]
	}) as typeof Users;
	}
}
