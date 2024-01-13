import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RolePermissions, RolePermissionsId } from './RolePermissions';
import type { UserRoles, UserRolesId } from './UserRoles';
import type { Users, UsersId } from './Users';

export interface RolesAttributes {
	id: number;
	createdAt: Date;
	createdBy: number | null;
	updatedAt: Date | null;
	updatedBy: number | null;
	deletedAt: Date | null;
	deletedBy: number | null;
	code: string;
	name: string;
	isHardCoded: boolean;
	description: string | null;
}

export type RolesPk = "id";
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "description";
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles extends Model<RolesAttributes, RolesCreationAttributes> implements RolesAttributes {
	id!: number;
	createdAt!: Date;
	createdBy!: number | null;
	updatedAt!: Date | null;
	updatedBy!: number | null;
	deletedAt!: Date | null;
	deletedBy!: number | null;
	code!: string;
	name!: string;
	isHardCoded!: boolean;
	description!: string | null;

	// Roles hasMany RolePermissions via roleId
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
	// Roles hasMany UserRoles via roleId
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
	// Roles belongsTo Users via createdBy
	createdByUser!: Users;
	getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// Roles belongsTo Users via deletedBy
	deletedByUser!: Users;
	getDeletedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setDeletedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createDeletedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// Roles belongsTo Users via updatedBy
	updatedByUser!: Users;
	getUpdatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUpdatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUpdatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

	static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
		return sequelize.define('Roles', {
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
			unique: "uc__roles__code"
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		isHardCoded: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'is_hard_coded'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'roles',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "pk__roles",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
			{
				name: "uc__roles__code",
				unique: true,
				fields: [
					{ name: "code" },
				]
			},
		]
	}) as typeof Roles;
	}
}
