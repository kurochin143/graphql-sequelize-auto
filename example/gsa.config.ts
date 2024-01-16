import { GsaConfig } from "graphql-sequelize-auto-generator";
import { FilterOperators } from "graphql-sequelize-auto-generator/build/cli/enums";

const config: GsaConfig = {
	codeFilesDir: "./src/generated/gsa",
	nonCodeFilesDir: "./src/nonCode/generated/gsa",
	additionalGqlSchemas: ["./src/nonCode/schema.gql"],
	host: process.env.DB_HOST!,
	port: parseInt(process.env.DB_PORT!),
	database: process.env.DB_NAME!,
	username: process.env.DB_USER!,
	password: process.env.DB_PASS!,
	dialect: "postgres",
	skipTables: ["public.sequelize_migrations"],
	tableConfigs: [
		{
			name: "public.users",
			aliasConfigs: [
				{
					name: "User",
					get: {
						input: {
							filterFields: [
								{
									name: "id",
									operators: [FilterOperators.Equal],
								},
								{
									name: "username",
									operators: [FilterOperators.Like],
								},
								{
									name: "userUserRoles",
									filterFields: [
										{
											name: "role",
											filterFields: [
												{
													name: "rolePermissions",
													filterFields: [
														{
															name: "permission",
															filterFields: [
																{
																	name: "id",
																	operators: [FilterOperators.Equal],
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
							sortByFields: [
								{
									name: "id",
								},
								{
									name: "username",
								},
							],
						},
						output: {
							primaryFields: {
								include: ["id", "username"],
							},
							associatedFields: [
								{
									name: "userUserRoles",
									aliasName: "UserRole",
								},
							],
						},
					},
					add: {
						input: {
							primaryFields: {
								include: ["username", "password"],
							},
							associatedFields: [
								{
									name: "userUserRoles",
									isOptional: false,
									input: {
										primaryFields: {
											isOptional: false,
											include: ["roleId"],
										},
									},
								},
							],
						},
						output: {
							primaryFields: {
								include: ["id"],
							},
						},
					},
					edit: {
						input: {
							primaryFields: {
								include: ["firstName", "lastName"],
							},
							associatedFields: [
								{
									name: "userUserRoles",
									isOptional: false,
									input: {
										primaryFields: {
											include: ["roleId"],
										},
									},
								},
							],
						},
					},
					remove: {
						isEnabled: true,
					},
				},
			],
		},
		{
			name: "public.permissions",
			aliasConfigs: [
				{
					name: "Permission",
					get: {
						input: {
							filterFields: [
								{
									name: "name",
									operators: [FilterOperators.Like],
								},
							],
							sortByFields: [
								{
									name: "name",
								},
							],
						},
						output: {
							primaryFields: {
								include: ["id", "name"],
							},
						},
					},
				},
			],
		},
		{
			name: "public.roles",
			aliasConfigs: [
				{
					name: "Role",
					get: {
						input: {
							filterFields: [
								{
									name: "id",
									operators: [FilterOperators.Equal],
								},
								{
									name: "name",
									operators: [FilterOperators.Like],
								},
							],
							sortByFields: [
								{
									name: "id",
								},
								{
									name: "name",
								},
							],
						},
						output: {
							primaryFields: {
								include: ["id", "name"],
							},
							associatedFields: [
								{
									name: "rolePermissions",
									aliasName: "RolePermission",
								},
							],
						},
					},
					add: {
						input: {
							primaryFields: {
								include: ["name"],
							},
							associatedFields: [
								{
									name: "rolePermissions",
									isOptional: false,
									input: {
										primaryFields: {
											include: ["permissionId"],
										},
									},
								},
							],
						},
						output: {
							primaryFields: {
								include: ["id"],
							},
						},
					},
					edit: {
						input: {
							primaryFields: {
								include: ["name"],
							},
							associatedFields: [
								{
									name: "rolePermissions",
									isOptional: false,
									input: {
										primaryFields: {
											include: ["permissionId"],
										},
									},
								},
							],
						},
					},
					remove: {
						isEnabled: true,
					},
				},
			],
		},
		{
			name: "public.user_roles",
			aliasConfigs: [
				{
					name: "UserRole",
					get: {
						isTypeOnly: true,
						output: {
							primaryFields: {
								include: ["id"],
							},
							associatedFields: [
								{
									name: "role",
									aliasName: "Role",
								},
							],
						},
					},
				},
			],
		},
		{
			name: "public.role_permissions",
			aliasConfigs: [
				{
					name: "RolePermission",
					get: {
						input: {
							filterFields: [
								{
									name: "roleId",
									operators: [FilterOperators.Equal],
								},
							],
						},
						output: {
							primaryFields: {
								include: ["id"],
							},
							associatedFields: [
								{
									name: "role",
									aliasName: "Role",
								},
								{
									name: "permission",
									aliasName: "Permission",
								},
							],
						},
					},
				},
			],
		},
	],
};

export default config;
