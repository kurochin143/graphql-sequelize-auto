import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Permissions, PermissionsId } from './Permissions';
import type { Roles, RolesId } from './Roles';
import type { Users, UsersId } from './Users';

export interface RolePermissionsAttributes {
	id: number;
	createdAt: Date;
	createdBy: number | null;
	updatedAt: Date | null;
	updatedBy: number | null;
	deletedAt: Date | null;
	deletedBy: number | null;
	roleId: number;
	permissionId: number;
}

export type RolePermissionsPk = "id";
export type RolePermissionsId = RolePermissions[RolePermissionsPk];
export type RolePermissionsOptionalAttributes = "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy";
export type RolePermissionsCreationAttributes = Optional<RolePermissionsAttributes, RolePermissionsOptionalAttributes>;

export class RolePermissions extends Model<RolePermissionsAttributes, RolePermissionsCreationAttributes> implements RolePermissionsAttributes {
	id!: number;
	createdAt!: Date;
	createdBy!: number | null;
	updatedAt!: Date | null;
	updatedBy!: number | null;
	deletedAt!: Date | null;
	deletedBy!: number | null;
	roleId!: number;
	permissionId!: number;

	// RolePermissions belongsTo Permissions via permissionId
	permission!: Permissions;
	getPermission!: Sequelize.BelongsToGetAssociationMixin<Permissions>;
	setPermission!: Sequelize.BelongsToSetAssociationMixin<Permissions, PermissionsId>;
	createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permissions>;
	// RolePermissions belongsTo Roles via roleId
	role!: Roles;
	getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
	setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
	createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;
	// RolePermissions belongsTo Users via createdBy
	createdByUser!: Users;
	getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// RolePermissions belongsTo Users via deletedBy
	deletedByUser!: Users;
	getDeletedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setDeletedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createDeletedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// RolePermissions belongsTo Users via updatedBy
	updatedByUser!: Users;
	getUpdatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUpdatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUpdatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

	static initModel(sequelize: Sequelize.Sequelize): typeof RolePermissions {
		return sequelize.define('RolePermissions', {
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
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'roles',
				key: 'id'
			},
			unique: "uc__rp__role_id__permission_id",
			field: 'role_id'
		},
		permissionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'permissions',
				key: 'id'
			},
			unique: "uc__rp__role_id__permission_id",
			field: 'permission_id'
		}
	}, {
		tableName: 'role_permissions',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "idx__rp__role_id__permission_id",
				fields: [
					{ name: "role_id" },
					{ name: "permission_id" },
				]
			},
			{
				name: "pk__role_permissions",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
			{
				name: "uc__rp__role_id__permission_id",
				unique: true,
				fields: [
					{ name: "role_id" },
					{ name: "permission_id" },
				]
			},
		]
	}) as typeof RolePermissions;
	}
}
