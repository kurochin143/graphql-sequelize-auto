import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RolePermissions, RolePermissionsId } from './RolePermissions';
import type { Users, UsersId } from './Users';

export interface PermissionsAttributes {
	id: number;
	createdAt: Date;
	createdBy: number | null;
	updatedAt: Date | null;
	updatedBy: number | null;
	deletedAt: Date | null;
	deletedBy: number | null;
	code: string;
	name: string;
	description: string | null;
}

export type PermissionsPk = "id";
export type PermissionsId = Permissions[PermissionsPk];
export type PermissionsOptionalAttributes = "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "description";
export type PermissionsCreationAttributes = Optional<PermissionsAttributes, PermissionsOptionalAttributes>;

export class Permissions extends Model<PermissionsAttributes, PermissionsCreationAttributes> implements PermissionsAttributes {
	id!: number;
	createdAt!: Date;
	createdBy!: number | null;
	updatedAt!: Date | null;
	updatedBy!: number | null;
	deletedAt!: Date | null;
	deletedBy!: number | null;
	code!: string;
	name!: string;
	description!: string | null;

	// Permissions hasMany RolePermissions via permissionId
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
	// Permissions belongsTo Users via createdBy
	createdByUser!: Users;
	getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// Permissions belongsTo Users via deletedBy
	deletedByUser!: Users;
	getDeletedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setDeletedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createDeletedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// Permissions belongsTo Users via updatedBy
	updatedByUser!: Users;
	getUpdatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUpdatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUpdatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

	static initModel(sequelize: Sequelize.Sequelize): typeof Permissions {
		return sequelize.define('Permissions', {
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
		code: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "uc__permissions__code"
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'permissions',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "pk__permissions",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
			{
				name: "uc__permissions__code",
				unique: true,
				fields: [
					{ name: "code" },
				]
			},
		]
	}) as typeof Permissions;
	}
}
