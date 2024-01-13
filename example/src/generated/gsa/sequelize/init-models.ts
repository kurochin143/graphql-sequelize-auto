import type { Sequelize } from "sequelize";
import { Permissions as _Permissions } from "./Permissions";
import type { PermissionsAttributes, PermissionsCreationAttributes } from "./Permissions";
import { RolePermissions as _RolePermissions } from "./RolePermissions";
import type { RolePermissionsAttributes, RolePermissionsCreationAttributes } from "./RolePermissions";
import { Roles as _Roles } from "./Roles";
import type { RolesAttributes, RolesCreationAttributes } from "./Roles";
import { UserRoles as _UserRoles } from "./UserRoles";
import type { UserRolesAttributes, UserRolesCreationAttributes } from "./UserRoles";
import { Users as _Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";

export {
	_Permissions as Permissions,
	_RolePermissions as RolePermissions,
	_Roles as Roles,
	_UserRoles as UserRoles,
	_Users as Users,
};

export type {
	PermissionsAttributes,
	PermissionsCreationAttributes,
	RolePermissionsAttributes,
	RolePermissionsCreationAttributes,
	RolesAttributes,
	RolesCreationAttributes,
	UserRolesAttributes,
	UserRolesCreationAttributes,
	UsersAttributes,
	UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
	const Permissions = _Permissions.initModel(sequelize);
	const RolePermissions = _RolePermissions.initModel(sequelize);
	const Roles = _Roles.initModel(sequelize);
	const UserRoles = _UserRoles.initModel(sequelize);
	const Users = _Users.initModel(sequelize);

	RolePermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permissionId", targetKey: "id"});
	Permissions.hasMany(RolePermissions, { as: "rolePermissions", foreignKey: "permissionId", sourceKey: "id"});
	RolePermissions.belongsTo(Roles, { as: "role", foreignKey: "roleId", targetKey: "id"});
	Roles.hasMany(RolePermissions, { as: "rolePermissions", foreignKey: "roleId", sourceKey: "id"});
	UserRoles.belongsTo(Roles, { as: "role", foreignKey: "roleId", targetKey: "id"});
	Roles.hasMany(UserRoles, { as: "userRoles", foreignKey: "roleId", sourceKey: "id"});
	Permissions.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy", targetKey: "id"});
	Users.hasMany(Permissions, { as: "permissions", foreignKey: "createdBy", sourceKey: "id"});
	Permissions.belongsTo(Users, { as: "deletedByUser", foreignKey: "deletedBy", targetKey: "id"});
	Users.hasMany(Permissions, { as: "deletedByPermissions", foreignKey: "deletedBy", sourceKey: "id"});
	Permissions.belongsTo(Users, { as: "updatedByUser", foreignKey: "updatedBy", targetKey: "id"});
	Users.hasMany(Permissions, { as: "updatedByPermissions", foreignKey: "updatedBy", sourceKey: "id"});
	RolePermissions.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy", targetKey: "id"});
	Users.hasMany(RolePermissions, { as: "rolePermissions", foreignKey: "createdBy", sourceKey: "id"});
	RolePermissions.belongsTo(Users, { as: "deletedByUser", foreignKey: "deletedBy", targetKey: "id"});
	Users.hasMany(RolePermissions, { as: "deletedByRolePermissions", foreignKey: "deletedBy", sourceKey: "id"});
	RolePermissions.belongsTo(Users, { as: "updatedByUser", foreignKey: "updatedBy", targetKey: "id"});
	Users.hasMany(RolePermissions, { as: "updatedByRolePermissions", foreignKey: "updatedBy", sourceKey: "id"});
	Roles.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy", targetKey: "id"});
	Users.hasMany(Roles, { as: "roles", foreignKey: "createdBy", sourceKey: "id"});
	Roles.belongsTo(Users, { as: "deletedByUser", foreignKey: "deletedBy", targetKey: "id"});
	Users.hasMany(Roles, { as: "deletedByRoles", foreignKey: "deletedBy", sourceKey: "id"});
	Roles.belongsTo(Users, { as: "updatedByUser", foreignKey: "updatedBy", targetKey: "id"});
	Users.hasMany(Roles, { as: "updatedByRoles", foreignKey: "updatedBy", sourceKey: "id"});
	UserRoles.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy", targetKey: "id"});
	Users.hasMany(UserRoles, { as: "userRoles", foreignKey: "createdBy", sourceKey: "id"});
	UserRoles.belongsTo(Users, { as: "deletedByUser", foreignKey: "deletedBy", targetKey: "id"});
	Users.hasMany(UserRoles, { as: "deletedByUserRoles", foreignKey: "deletedBy", sourceKey: "id"});
	UserRoles.belongsTo(Users, { as: "updatedByUser", foreignKey: "updatedBy", targetKey: "id"});
	Users.hasMany(UserRoles, { as: "updatedByUserRoles", foreignKey: "updatedBy", sourceKey: "id"});
	UserRoles.belongsTo(Users, { as: "user", foreignKey: "userId", targetKey: "id"});
	Users.hasMany(UserRoles, { as: "userUserRoles", foreignKey: "userId", sourceKey: "id"});
	Users.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy", targetKey: "id"});
	Users.hasMany(Users, { as: "users", foreignKey: "createdBy", sourceKey: "id"});
	Users.belongsTo(Users, { as: "deletedByUser", foreignKey: "deletedBy", targetKey: "id"});
	Users.hasMany(Users, { as: "deletedByUsers", foreignKey: "deletedBy", sourceKey: "id"});
	Users.belongsTo(Users, { as: "updatedByUser", foreignKey: "updatedBy", targetKey: "id"});
	Users.hasMany(Users, { as: "updatedByUsers", foreignKey: "updatedBy", sourceKey: "id"});


	return {
		Permissions: Permissions,
		RolePermissions: RolePermissions,
		Roles: Roles,
		UserRoles: UserRoles,
		Users: Users,
	};
}
