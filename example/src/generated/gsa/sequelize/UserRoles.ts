import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Roles, RolesId } from './Roles';
import type { Users, UsersId } from './Users';

export interface UserRolesAttributes {
	id: number;
	createdAt: Date;
	createdBy: number | null;
	updatedAt: Date | null;
	updatedBy: number | null;
	deletedAt: Date | null;
	deletedBy: number | null;
	userId: number;
	roleId: number;
}

export type UserRolesPk = "id";
export type UserRolesId = UserRoles[UserRolesPk];
export type UserRolesOptionalAttributes = "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy";
export type UserRolesCreationAttributes = Optional<UserRolesAttributes, UserRolesOptionalAttributes>;

export class UserRoles extends Model<UserRolesAttributes, UserRolesCreationAttributes> implements UserRolesAttributes {
	id!: number;
	createdAt!: Date;
	createdBy!: number | null;
	updatedAt!: Date | null;
	updatedBy!: number | null;
	deletedAt!: Date | null;
	deletedBy!: number | null;
	userId!: number;
	roleId!: number;

	// UserRoles belongsTo Roles via roleId
	role!: Roles;
	getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
	setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
	createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;
	// UserRoles belongsTo Users via createdBy
	createdByUser!: Users;
	getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// UserRoles belongsTo Users via deletedBy
	deletedByUser!: Users;
	getDeletedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setDeletedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createDeletedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// UserRoles belongsTo Users via updatedBy
	updatedByUser!: Users;
	getUpdatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUpdatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUpdatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// UserRoles belongsTo Users via userId
	user!: Users;
	getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

	static initModel(sequelize: Sequelize.Sequelize): typeof UserRoles {
		return sequelize.define('UserRoles', {
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
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			},
			unique: "uc__user_roles__user_id__role_id",
			field: 'user_id'
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'roles',
				key: 'id'
			},
			unique: "uc__user_roles__user_id__role_id",
			field: 'role_id'
		}
	}, {
		tableName: 'user_roles',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "idx__user_roles__user_id__role_id",
				fields: [
					{ name: "user_id" },
					{ name: "role_id" },
				]
			},
			{
				name: "pk__user_roles",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
			{
				name: "uc__user_roles__user_id__role_id",
				unique: true,
				fields: [
					{ name: "user_id" },
					{ name: "role_id" },
				]
			},
		]
	}) as typeof UserRoles;
	}
}
