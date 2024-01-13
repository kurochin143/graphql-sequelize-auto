import {
	AddEntityDocument,
	AddEntityFileDocument,
	AddEntityLogDocument,
	AddEntityTypeAddressRoleDocument,
	AddEntityTypeDocument,
	AddEntityTypeEntityTypeDocument,
	AddEntityTypeEntityTypeRoleDocument,
	AddEntityTypeFieldDocument,
	AddEntityTypeLogTypeDocument,
	AddEntityTypeWorkflowStepsDocument,
	AddExistingEntityAddressDocument,
	AddExistingEntityEntityDocument,
	AddNewEntityAddressDocument,
	AddNewEntityEntityDocument,
	AddressListItemFragment,
	EditEntityDocument,
	EditEntityTypeFieldDocument,
	EntityListItemFragment,
	EntityTypeAddressRoleListItemFragment,
	EntityTypeEntityTypeListItemFragment,
	EntityTypeEntityTypeRoleListItemFragment,
	EntityTypeFieldListItemFragment,
	EntityTypeListItemFragment,
	EntityTypeLogTypeListItemFragment,
	EntityTypeWorkflowStepListItemFragment,
	FieldTypeIds,
	FilterOperators,
	GetAddressesDocument,
	GetEntitiesDocument,
	GetEntitiesFilter,
	GetEntityAddressesDocument,
	GetEntityFilesDocument,
	GetEntityLogsDocument,
	GetEntityTypeAddressRolesDocument,
	GetEntityTypeEntityTypeRolesDocument,
	GetEntityTypeEntityTypesDocument,
	GetEntityTypeFieldDocument,
	GetEntityTypeFieldsDocument,
	GetEntityTypeLogTypesDocument,
	GetEntityTypeWorkflowStepsDocument,
	GetEntityTypesDocument,
	GetFieldTypesDocument,
	GetRelatedEntitiesDocument,
	GetRolesDocument,
	GetSearchAllViewsDocument,
	LoginDocument,
	RelatedEntityListItemFragment,
	RemoveEntityEntityDocument,
	RolePermissionListItemFragment,
} from "../generated/graphql";
import db from "../../src/db";
import gsaService from "../../src/common/services/gsaService";
import fse from "fs-extra";
import path from "path";
import { isBuffer } from "lodash";
import TestApp from "../TestApp";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";
const ADMIN_ROLE_NAME = "Admin"; // from the db

describe("essential", () => {
	class EssentialTestApp extends TestApp {}

	const testApp = new EssentialTestApp();

	const { supertestGet, gqlSupertest } = testApp.shorten();

	let didAuthenticate = false;

	beforeAll(async () => {
		await db.start(false);
		gsaService.init();
		await testApp.init();

		// seed users
		// @TODO create a user per permission
		const client = await db.getPool().connect();
		await client.query(
			`
INSERT INTO users(username, password)
VALUES
('${ADMIN_USERNAME}', '${ADMIN_PASSWORD}');

INSERT INTO user_roles(user_id, role_id)
VALUES
((SELECT id FROM users WHERE username='${ADMIN_USERNAME}'), (SELECT id FROM roles WHERE name='${ADMIN_ROLE_NAME}'));
	`,
		);
		client.release();
	});

	beforeEach(() => {
		if (didAuthenticate && testApp.getToken() === undefined) {
			throw new Error("Could not authenticate, skipping test");
		}
	});

	afterAll(async () => {
		await db.stop();
	});

	describe("authentication", () => {
		it("authenticates", async () => {
			didAuthenticate = true;
			const res = await gqlSupertest(LoginDocument, {
				input: {
					isClear: true,
					username: ADMIN_USERNAME,
					password: ADMIN_PASSWORD,
				},
			});

			testApp.setToken(res.login.token);
		});
	});

	describe("add", () => {
		const COMPANY_ENTITY_TYPE_CODE = "company";
		const CONTACT_ENTITY_TYPE_CODE = "contact";
		const REGION_ENTITY_TYPE_CODE = "region";
		const DISTRICT_ENTITY_TYPE_CODE = "district";
		const DIVISION_ENTITY_TYPE_CODE = "division";
		const FACILITY_ENTITY_TYPE_CODE = "facility";
		const ACCOUNT_ENTITY_TYPE_CODE = "account";

		const ENTITY_TYPE_CODE__NAME__MAP = new Map<string, string>();
		ENTITY_TYPE_CODE__NAME__MAP.set(COMPANY_ENTITY_TYPE_CODE, "Company");
		ENTITY_TYPE_CODE__NAME__MAP.set(CONTACT_ENTITY_TYPE_CODE, "Contact");
		ENTITY_TYPE_CODE__NAME__MAP.set(REGION_ENTITY_TYPE_CODE, "Region");
		ENTITY_TYPE_CODE__NAME__MAP.set(DISTRICT_ENTITY_TYPE_CODE, "District");
		ENTITY_TYPE_CODE__NAME__MAP.set(DIVISION_ENTITY_TYPE_CODE, "Division");
		ENTITY_TYPE_CODE__NAME__MAP.set(FACILITY_ENTITY_TYPE_CODE, "Facility");
		ENTITY_TYPE_CODE__NAME__MAP.set(ACCOUNT_ENTITY_TYPE_CODE, "Account");

		let companyEntityType: EntityTypeListItemFragment | undefined;
		let contactEntityType: EntityTypeListItemFragment | undefined;
		let regionEntityType: EntityTypeListItemFragment | undefined;
		let districtEntityType: EntityTypeListItemFragment | undefined;
		let divisionEntityType: EntityTypeListItemFragment | undefined;
		let facilityEntityType: EntityTypeListItemFragment | undefined;
		let accountEntityType: EntityTypeListItemFragment | undefined;

		it("adds and gets entityTypes, and gets correct roles", async () => {
			let i = 0;
			for (const [code, name] of ENTITY_TYPE_CODE__NAME__MAP) {
				await gqlSupertest(AddEntityTypeDocument, {
					input: {
						primaryFields: {
							name,
							code,
							sortOrder: ++i,
						},
					},
				});
			}

			const getEntityTypesRes = await gqlSupertest(GetEntityTypesDocument);
			const entityTypes = getEntityTypesRes.getEntityTypes.rows;
			// there's no other entity type in the db other than the ones we added
			expect(entityTypes.length).toBe(ENTITY_TYPE_CODE__NAME__MAP.size);

			const getRolesRes = await gqlSupertest(GetRolesDocument);
			const roles = getRolesRes.getRoles.rows;
			// there's already a role in the db, the admin role, so we can't check for the exact length
			for (const [entityTypeCode, entityTypeName] of ENTITY_TYPE_CODE__NAME__MAP) {
				const entityType = entityTypes.find((entityType) => {
					return entityType.code === entityTypeCode && entityType.name === entityTypeName;
				});
				expect(entityType).not.toBeUndefined();

				// when an entityType is added, a role is also added with the same code and name
				const role = roles.find((role) => {
					return role.code === entityTypeCode && role.name === entityTypeName;
				});
				expect(role).not.toBeUndefined();

				switch (entityTypeCode) {
					case COMPANY_ENTITY_TYPE_CODE:
						companyEntityType = entityType!;
						break;
					case CONTACT_ENTITY_TYPE_CODE:
						contactEntityType = entityType!;
						break;
					case REGION_ENTITY_TYPE_CODE:
						regionEntityType = entityType!;
						break;
					case DISTRICT_ENTITY_TYPE_CODE:
						districtEntityType = entityType!;
						break;
					case DIVISION_ENTITY_TYPE_CODE:
						divisionEntityType = entityType!;
						break;
					case FACILITY_ENTITY_TYPE_CODE:
						facilityEntityType = entityType!;
						break;
					case ACCOUNT_ENTITY_TYPE_CODE:
						accountEntityType = entityType!;
						break;
				}
			}
		});

		const COMPANY_PERMISSION_CODES = ["company"];
		const CONTACT_PERMISSION_CODES = ["contact"];
		const REGION_PERMISSION_CODES = ["region", "district", "division", "facility", "account"];
		const DISTRICT_PERMISSION_CODES = ["district", "division", "facility", "account"];
		const DIVISION_PERMISSION_CODES = ["division", "facility", "account"];
		const FACILITY_PERMISSION_CODES = ["facility", "account"];
		const ACCOUNT_PERMISSION_CODES = ["account"];

		let companyContactEntityTypeEntityType: EntityTypeEntityTypeListItemFragment | undefined;
		let regionDistrictEntityTypeEntityType: EntityTypeEntityTypeListItemFragment | undefined;
		let regionDivisionEntityTypeEntityType: EntityTypeEntityTypeListItemFragment | undefined;
		let districtDivisionEntityTypeEntityType: EntityTypeEntityTypeListItemFragment | undefined;
		let divisionFacilityEntityTypeEntityType: EntityTypeEntityTypeListItemFragment | undefined;
		let facilityAccountEntityTypeEntityType: EntityTypeEntityTypeListItemFragment | undefined;

		it("adds and gets entityTypeEntityTypes and gets correct rolePermissions", async () => {
			expect(companyEntityType).not.toBeUndefined();
			expect(regionEntityType).not.toBeUndefined();
			expect(districtEntityType).not.toBeUndefined();
			expect(divisionEntityType).not.toBeUndefined();
			expect(facilityEntityType).not.toBeUndefined();
			expect(accountEntityType).not.toBeUndefined();

			const entityType1Id_entityType2s_map = new Map<
				number,
				{
					entityType2Id: number;
					isParentChild: boolean;
				}[]
			>();
			entityType1Id_entityType2s_map.set(companyEntityType!.id, [
				{
					entityType2Id: contactEntityType!.id,
					isParentChild: false,
				},
			]);
			entityType1Id_entityType2s_map.set(regionEntityType!.id, [
				{
					entityType2Id: districtEntityType!.id,
					isParentChild: true,
				},
				{
					entityType2Id: divisionEntityType!.id,
					isParentChild: true,
				},
			]);
			entityType1Id_entityType2s_map.set(districtEntityType!.id, [
				{
					entityType2Id: divisionEntityType!.id,
					isParentChild: true,
				},
			]);
			entityType1Id_entityType2s_map.set(divisionEntityType!.id, [
				{
					entityType2Id: facilityEntityType!.id,
					isParentChild: true,
				},
			]);
			entityType1Id_entityType2s_map.set(facilityEntityType!.id, [
				{
					entityType2Id: accountEntityType!.id,
					isParentChild: true,
				},
			]);

			let addedEntityTypeEntityTypesLength = 0;
			for (const [entityType1Id, entityType2s] of entityType1Id_entityType2s_map) {
				for (const entityType2 of entityType2s) {
					await gqlSupertest(AddEntityTypeEntityTypeDocument, {
						input: {
							primaryFields: {
								entityType1Id,
								entityType2Id: entityType2.entityType2Id,
								isParentChild: entityType2.isParentChild,
							},
						},
					});
					++addedEntityTypeEntityTypesLength;
				}
			}

			const getEntityTypeEntityTypesRes = await gqlSupertest(GetEntityTypeEntityTypesDocument);
			const entityTypeEntityTypes = getEntityTypeEntityTypesRes.getEntityTypeEntityTypes.rows;
			expect(entityTypeEntityTypes.length).toBe(addedEntityTypeEntityTypesLength);
			for (const entityTypeEntityType of entityTypeEntityTypes) {
				if (
					entityTypeEntityType.entityType1.code === COMPANY_ENTITY_TYPE_CODE &&
					entityTypeEntityType.entityType2.code === CONTACT_ENTITY_TYPE_CODE
				) {
					companyContactEntityTypeEntityType = entityTypeEntityType;
				} else if (
					entityTypeEntityType.entityType1.code === REGION_ENTITY_TYPE_CODE &&
					entityTypeEntityType.entityType2.code === DISTRICT_ENTITY_TYPE_CODE
				) {
					regionDistrictEntityTypeEntityType = entityTypeEntityType;
				} else if (
					entityTypeEntityType.entityType1.code === REGION_ENTITY_TYPE_CODE &&
					entityTypeEntityType.entityType2.code === DIVISION_ENTITY_TYPE_CODE
				) {
					regionDivisionEntityTypeEntityType = entityTypeEntityType;
				} else if (
					entityTypeEntityType.entityType1.code === DISTRICT_ENTITY_TYPE_CODE &&
					entityTypeEntityType.entityType2.code === DIVISION_ENTITY_TYPE_CODE
				) {
					districtDivisionEntityTypeEntityType = entityTypeEntityType;
				} else if (
					entityTypeEntityType.entityType1.code === DIVISION_ENTITY_TYPE_CODE &&
					entityTypeEntityType.entityType2.code === FACILITY_ENTITY_TYPE_CODE
				) {
					divisionFacilityEntityTypeEntityType = entityTypeEntityType;
				} else if (
					entityTypeEntityType.entityType1.code === FACILITY_ENTITY_TYPE_CODE &&
					entityTypeEntityType.entityType2.code === ACCOUNT_ENTITY_TYPE_CODE
				) {
					facilityAccountEntityTypeEntityType = entityTypeEntityType;
				}
			}

			const hasExactPermissionCodes = (
				rolePermissions: RolePermissionListItemFragment[],
				permissionCodes: string[],
			) => {
				expect(rolePermissions.length).toBe(permissionCodes.length);
				for (const permissionCode of permissionCodes) {
					expect(
						rolePermissions.find((rolePermission) => {
							return rolePermission.permission.code === permissionCode;
						}),
					).not.toBeUndefined();
				}
			};

			const getRolesRes = await gqlSupertest(GetRolesDocument);
			const roles = getRolesRes.getRoles.rows;
			for (const role of roles) {
				switch (role.code) {
					case COMPANY_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, COMPANY_PERMISSION_CODES);
						break;
					case CONTACT_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, CONTACT_PERMISSION_CODES);
						break;
					case REGION_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, REGION_PERMISSION_CODES);
						break;
					case DISTRICT_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, DISTRICT_PERMISSION_CODES);
						break;
					case DIVISION_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, DIVISION_PERMISSION_CODES);
						break;
					case FACILITY_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, FACILITY_PERMISSION_CODES);
						break;
					case ACCOUNT_ENTITY_TYPE_CODE:
						hasExactPermissionCodes(role.rolePermissions, ACCOUNT_PERMISSION_CODES);
						break;
				}
			}
		});

		const WORKPLACE_ROLE_NAME = "test workplace role name 1";
		const CEO_ROLE_NAME = "test ceo role name 2";

		let companyContactWorkplaceCeoEntityTypeEntityTypeRole:
			| EntityTypeEntityTypeRoleListItemFragment
			| undefined;

		it("adds and gets entityTypeEntityTypeRoles", async () => {
			expect(companyContactEntityTypeEntityType).not.toBeUndefined();

			await gqlSupertest(AddEntityTypeEntityTypeRoleDocument, {
				input: {
					primaryFields: {
						entityTypeEntityTypeId: companyContactEntityTypeEntityType!.id,
						name1: WORKPLACE_ROLE_NAME,
						name2: CEO_ROLE_NAME,
					},
				},
			});

			const getEntityTypeEntityTypeRolesRes = await gqlSupertest(
				GetEntityTypeEntityTypeRolesDocument,
				{
					entityTypeEntityTypeId: companyContactEntityTypeEntityType!.id,
				},
			);
			const entityTypeEntityTypeRoles =
				getEntityTypeEntityTypeRolesRes.getEntityTypeEntityTypeRoles.rows;
			expect(entityTypeEntityTypeRoles.length).toBe(1);
			companyContactWorkplaceCeoEntityTypeEntityTypeRole = entityTypeEntityTypeRoles[0];
		});

		const addAllFieldTypesAsEntityTypeFields = async (entityTypeId: number) => {
			const getFieldTypesRes = await gqlSupertest(GetFieldTypesDocument);
			const fieldTypes = getFieldTypesRes.getFieldTypes.rows;

			for (let i = 0; i < fieldTypes.length; ++i) {
				const fieldType = fieldTypes[i];

				await gqlSupertest(AddEntityTypeFieldDocument, {
					input: {
						primaryFields: {
							entityTypeId,
							fieldTypeId: fieldType.id,
							code: "test_" + fieldType.id.toLowerCase(),
							name: "Test " + fieldType.id,
							sortOrder: i,
							isRequired: false,
							isFilterAndTableColumn: true,
						},
					},
				});
			}
		};

		let companyEntityTypeFields: EntityTypeFieldListItemFragment[] = [];

		it("adds and gets entityTypeFields", async () => {
			expect(companyEntityType).not.toBeUndefined();

			await addAllFieldTypesAsEntityTypeFields(companyEntityType!.id);

			const getEntityTypeFieldsRes = await gqlSupertest(GetEntityTypeFieldsDocument, {
				entityTypeId: companyEntityType!.id,
			});
			companyEntityTypeFields = getEntityTypeFieldsRes.getEntityTypeFields.rows;

			const getFieldTypesRes = await gqlSupertest(GetFieldTypesDocument);
			const fieldTypes = getFieldTypesRes.getFieldTypes.rows;
			expect(companyEntityTypeFields.length).toBe(fieldTypes.length);
		});

		const createEntityValues = (
			entityTypeFields: EntityTypeFieldListItemFragment[],
			stringMarker: string,
		) => {
			const values: object = {};
			for (const entityTypeField of entityTypeFields) {
				if (entityTypeField.fieldType.id === FieldTypeIds.Date) {
					values[entityTypeField.code] = "2020-01-01";
					continue;
				}

				if (entityTypeField.fieldType.id === FieldTypeIds.DateTime) {
					values[entityTypeField.code] = new Date().toISOString();
					continue;
				}

				switch (entityTypeField.fieldType.jsonType) {
					case "string":
						values[entityTypeField.code] = stringMarker + entityTypeField.code;
						break;
					case "number":
						values[entityTypeField.code] = 1337;
						break;
					case "boolean":
						values[entityTypeField.code] = true;
						break;
				}
			}

			return values;
		};

		let companyEntity: EntityListItemFragment | undefined;

		it("adds and gets entity with values", async () => {
			expect(companyEntityTypeFields.length).not.toBe(0);

			const ENTITY_VALUES = createEntityValues(companyEntityTypeFields, "test");

			await gqlSupertest(AddEntityDocument, {
				input: {
					primaryFields: {
						typeId: companyEntityType!.id,
						values: ENTITY_VALUES,
					},
				},
			});

			const getEntitiesRes = await gqlSupertest(GetEntitiesDocument, {
				input: {
					filter: {
						fields: {
							typeId: {
								val: companyEntityType!.id,
								op: FilterOperators.Equal,
							},
						},
						and: Object.keys(ENTITY_VALUES).map((entityTypeFieldCode): GetEntitiesFilter => {
							return {
								fields: {
									values: {
										name: entityTypeFieldCode,
										val: JSON.stringify(ENTITY_VALUES[entityTypeFieldCode]),
										op: FilterOperators.Equal,
									},
								},
							};
						}),
					},
				},
			});

			const entities = getEntitiesRes.getEntities.rows;
			expect(entities.length).toBe(1);
			companyEntity = entities[0];

			const entityTypeFieldCodes = Object.keys(ENTITY_VALUES);
			for (const entityTypeFieldCode of entityTypeFieldCodes) {
				expect(companyEntity.values[entityTypeFieldCode]).toBe(ENTITY_VALUES[entityTypeFieldCode]);
			}
		});

		let contactEntity: RelatedEntityListItemFragment | undefined;
		let companyContactEntityEntityId: number | undefined;

		it("adds new entity to entityEntity", async () => {
			expect(companyEntity).not.toBeUndefined();
			expect(companyContactWorkplaceCeoEntityTypeEntityTypeRole).not.toBeUndefined();

			// add contact to company
			await gqlSupertest(AddNewEntityEntityDocument, {
				input: {
					primaryFields: {
						entity1Id: companyEntity!.id,
						entityTypeEntityTypeRoleId: companyContactWorkplaceCeoEntityTypeEntityTypeRole!.id,
						isRoleName2ForEntity2: true,
					},
					associatedFields: {
						entity2: {
							primaryFields: {
								typeId: contactEntityType!.id,
								values: {},
							},
						},
					},
				},
			});

			{
				const getRelatedEntitiesRes = await gqlSupertest(GetRelatedEntitiesDocument, {
					entityId: companyEntity!.id,
					relatedTypeId: contactEntityType!.id,
				});
				const entities = getRelatedEntitiesRes.getEntities.rows;
				expect(entities.length).toBe(1);
				contactEntity = entities[0];

				if (contactEntity.entityEntities.length !== 0) {
					companyContactEntityEntityId = contactEntity.entityEntities[0].id;
					// related entity(contactEntity) is entity_id_1
				} else {
					companyContactEntityEntityId = contactEntity.entity2EntityEntities[0].id;
					// related entity(contactEntity) is entity_id_2
				}
			}

			// company should also show up in contact's related entities
			{
				const getRelatedEntitiesRes = await gqlSupertest(GetRelatedEntitiesDocument, {
					entityId: contactEntity!.id,
					relatedTypeId: companyEntityType!.id,
				});
				const entities = getRelatedEntitiesRes.getEntities.rows;
				expect(entities.length).toBe(1);
			}

			// add company to contact, this will test GetRelatedEntities query
			// the original companyEntity is not involved in this test
			await gqlSupertest(AddNewEntityEntityDocument, {
				input: {
					primaryFields: {
						entity1Id: contactEntity!.id,
						entityTypeEntityTypeRoleId: companyContactWorkplaceCeoEntityTypeEntityTypeRole!.id,
						isRoleName2ForEntity2: false,
					},
					associatedFields: {
						entity2: {
							primaryFields: {
								typeId: companyEntityType!.id,
								values: {},
							},
						},
					},
				},
			});

			{
				const getEntitiesRes = await gqlSupertest(GetRelatedEntitiesDocument, {
					entityId: contactEntity!.id,
					relatedTypeId: companyEntityType!.id,
				});
				const entities = getEntitiesRes.getEntities.rows;
				expect(entities.length).toBe(2);
			}
		});

		it("adds existing entity to entityEntity", async () => {
			expect(companyEntity).not.toBeUndefined();
			expect(companyContactEntityEntityId).not.toBeUndefined();

			// remove companyEntity and contactEntity relationship
			await gqlSupertest(RemoveEntityEntityDocument, {
				id: companyContactEntityEntityId!,
			});

			{
				const getEntitiesRes = await gqlSupertest(GetRelatedEntitiesDocument, {
					entityId: companyEntity!.id,
					relatedTypeId: contactEntityType!.id,
				});
				const entities = getEntitiesRes.getEntities.rows;
				expect(entities.length).toBe(0);
			}

			await gqlSupertest(AddExistingEntityEntityDocument, {
				input: {
					primaryFields: {
						entity1Id: companyEntity!.id,
						entity2Id: contactEntity!.id,
						entityTypeEntityTypeRoleId: companyContactWorkplaceCeoEntityTypeEntityTypeRole!.id,
						isRoleName2ForEntity2: true,
					},
				},
			});

			const getEntitiesRes = await gqlSupertest(GetRelatedEntitiesDocument, {
				entityId: companyEntity!.id,
				relatedTypeId: contactEntityType!.id,
			});
			const entities = getEntitiesRes.getEntities.rows;
			expect(entities.length).toBe(1);
		});

		let companyEntityTypeAddressRole: EntityTypeAddressRoleListItemFragment | undefined;

		it("adds and gets entityTypeAddressRole", async () => {
			expect(companyEntityType).not.toBeUndefined();

			const EXPECTED_ENTITY_TYPE_ADDRESS_ROLE_NAME = "test address role name";

			await gqlSupertest(AddEntityTypeAddressRoleDocument, {
				input: {
					primaryFields: {
						entityTypeId: companyEntityType!.id,
						name: EXPECTED_ENTITY_TYPE_ADDRESS_ROLE_NAME,
					},
				},
			});

			const getEntityTypeAddressRolesRes = await gqlSupertest(GetEntityTypeAddressRolesDocument, {
				entityTypeId: companyEntityType!.id,
			});
			const entityTypeAddressRoles = getEntityTypeAddressRolesRes.getEntityTypeAddressRoles.rows;
			expect(entityTypeAddressRoles.length).toBe(1);
			companyEntityTypeAddressRole = entityTypeAddressRoles[0];
			expect(companyEntityTypeAddressRole.name).toBe(EXPECTED_ENTITY_TYPE_ADDRESS_ROLE_NAME);
		});

		let address: AddressListItemFragment | undefined;

		it("adds and gets new address to entityAddress and gets entityAddress", async () => {
			expect(companyEntity).not.toBeUndefined();

			await gqlSupertest(AddNewEntityAddressDocument, {
				input: {
					primaryFields: {
						entityId: companyEntity!.id,
						entityTypeAddressRoleId: companyEntityTypeAddressRole!.id,
						name: "some test warehouse adds new address to entityAddress",
						unit: "a",
					},
					associatedFields: {
						address: {
							primaryFields: {
								street: "222 E Lane",
								city: "Chicago",
								state: "Illinois",
								unit: "1a",
								zipCode: "12345",
							},
						},
					},
				},
			});

			const getAddressesRes = await gqlSupertest(GetAddressesDocument);
			const addresses = getAddressesRes.getAddresses.rows;
			expect(addresses.length).toBe(1);
			address = addresses[0];
			// @TODO expect fields

			const getEntityAddressesRes = await gqlSupertest(GetEntityAddressesDocument, {
				entityId: companyEntity!.id,
			});
			const entityAddresses = getEntityAddressesRes.getEntityAddresses.rows;
			expect(entityAddresses.length).toBe(1);
			// @TODO expect fields
		});

		it("adds existing address to entityAddress and gets entityAddress", async () => {
			expect(address).not.toBeUndefined();
			expect(companyEntityTypeAddressRole).not.toBeUndefined();

			// @TODO search the address

			await gqlSupertest(AddExistingEntityAddressDocument, {
				input: {
					primaryFields: {
						entityId: companyEntity!.id,
						addressId: address!.id,
						entityTypeAddressRoleId: companyEntityTypeAddressRole!.id,
						name: "some test warehouse add existing address to entityAddress",
						unit: "b",
					},
				},
			});

			const getEntityAddressesRes = await gqlSupertest(GetEntityAddressesDocument, {
				entityId: companyEntity!.id,
			});
			const entityAddresses = getEntityAddressesRes.getEntityAddresses.rows;
			expect(entityAddresses.length).toBe(2);
			// @TODO expect fields
		});

		it("adds and gets entityFile with file and download file", async () => {
			expect(companyEntity).not.toBeUndefined();

			const filePath = path.join(__dirname, "../../tsDummy/dummy.ts");
			const fileBuffer = await fse.readFile(filePath);

			await gqlSupertest(AddEntityFileDocument, {
				input: {
					primaryFields: {
						entityId: companyEntity!.id,
					},
					customFields: {
						fileStrBase64: fileBuffer.toString("base64"),
						fileName: "dummy.ts",
					},
				},
			});

			const getEntityFilesRes = await gqlSupertest(GetEntityFilesDocument, {
				entityId: companyEntity!.id,
			});
			const entityFiles = getEntityFilesRes.getEntityFiles.rows;
			expect(entityFiles.length).toBe(1);
			const file = entityFiles[0].file;

			const downloadFileRes = await supertestGet(
				"/api/v1/files/" + file.id + "?token=" + testApp.getToken(),
				{
					isAuthenticated: false,
				},
			).expect(200);
			expect(isBuffer(downloadFileRes.body)).toBeTruthy();
			expect(fileBuffer.equals(downloadFileRes.body)).toBeTruthy();
		});

		let companyEntityTypeLogType: EntityTypeLogTypeListItemFragment | undefined;

		it("adds and gets entityTypeLogType", async () => {
			expect(companyEntityType).not.toBeUndefined();

			const EXPECTED_ENTITY_TYPE_LOG_TYPE_NAME = "test log type";
			const EXPECTED_ENTITY_TYPE_LOG_TYPE_CODE = "test_log_type_code";

			await gqlSupertest(AddEntityTypeLogTypeDocument, {
				input: {
					primaryFields: {
						entityTypeId: companyEntityType!.id,
						name: EXPECTED_ENTITY_TYPE_LOG_TYPE_NAME,
						code: EXPECTED_ENTITY_TYPE_LOG_TYPE_CODE,
					},
				},
			});

			const getEntityTypeLogTypesRes = await gqlSupertest(GetEntityTypeLogTypesDocument, {
				entityTypeId: companyEntityType!.id,
			});

			const entityTypeLogTypes = getEntityTypeLogTypesRes.getEntityTypeLogTypes.rows;
			expect(entityTypeLogTypes.length).toBe(1);
			companyEntityTypeLogType = entityTypeLogTypes[0];
			expect(companyEntityTypeLogType.name).toBe(EXPECTED_ENTITY_TYPE_LOG_TYPE_NAME);
			expect(companyEntityTypeLogType.code).toBe(EXPECTED_ENTITY_TYPE_LOG_TYPE_CODE);
		});

		it("adds and gets entityLog", async () => {
			expect(companyEntity).not.toBeUndefined();
			expect(companyEntityTypeLogType).not.toBeUndefined();

			const EXPECTED_ENTITY_LOG_MESSAGE = "test entity log";

			await gqlSupertest(AddEntityLogDocument, {
				input: {
					primaryFields: {
						entityId: companyEntity!.id,
						typeId: companyEntityTypeLogType!.id,
						message: EXPECTED_ENTITY_LOG_MESSAGE,
					},
				},
			});

			const getEntityLogsRes = await gqlSupertest(GetEntityLogsDocument, {
				entityId: companyEntity!.id,
			});

			const entityLogs = getEntityLogsRes.getEntityLogs.rows;
			expect(entityLogs.length).toBe(1);
			const entityLog = entityLogs[0];
			expect(entityLog.message).toBe(EXPECTED_ENTITY_LOG_MESSAGE);
		});

		const SEARCH_TEXT = "search me";

		it("edits companyEntity and searches SEARCH_TEXT", async () => {
			expect(companyEntityType).not.toBeUndefined();
			expect(companyEntity).not.toBeUndefined();

			await gqlSupertest(AddEntityTypeFieldDocument, {
				input: {
					primaryFields: {
						entityTypeId: companyEntityType!.id,
						fieldTypeId: FieldTypeIds.TextInput,
						code: "name",
						name: "Name",
						sortOrder: 0,
						isRequired: false,
						isFilterAndTableColumn: true,
					},
				},
			});

			await gqlSupertest(EditEntityDocument, {
				input: {
					primaryKeys: {
						id: companyEntity!.id,
					},
					primaryFields: {
						values: {
							...companyEntity!.values,
							name: SEARCH_TEXT,
						},
					},
				},
			});

			const getSearchAllViewsRes = await gqlSupertest(GetSearchAllViewsDocument, {
				text: SEARCH_TEXT,
			});

			const searchAllViews = getSearchAllViewsRes.getSearchAllViews.rows;
			expect(searchAllViews.length).not.toBe(0);

			for (const searchAllView of searchAllViews) {
				expect(searchAllView.text).toContain(SEARCH_TEXT);
			}
		});

		let companyEntityTypeWorkflowStep: EntityTypeWorkflowStepListItemFragment | undefined;

		it("adds and gets entityTypeWorkflowStep", async () => {
			expect(companyEntityType).not.toBeUndefined();

			const EXPECTED_ENTITY_TYPE_WORKFLOW_STEP_NAME = "test workflow step name";
			const EXPECTED_SORT_ORDER = 1;

			await gqlSupertest(AddEntityTypeWorkflowStepsDocument, {
				input: {
					primaryFields: {
						entityTypeId: companyEntityType!.id,
						name: EXPECTED_ENTITY_TYPE_WORKFLOW_STEP_NAME,
						sortOrder: EXPECTED_SORT_ORDER,
					},
				},
			});

			const getEntityTypeWorkflowStepsRes = await gqlSupertest(GetEntityTypeWorkflowStepsDocument, {
				entityTypeId: companyEntityType!.id,
			});

			const entityTypeWorkflowSteps = getEntityTypeWorkflowStepsRes.getEntityTypeWorkflowSteps.rows;
			expect(entityTypeWorkflowSteps.length).toBe(1);
			companyEntityTypeWorkflowStep = entityTypeWorkflowSteps[0];
			expect(companyEntityTypeWorkflowStep.name).toBe(EXPECTED_ENTITY_TYPE_WORKFLOW_STEP_NAME);
			expect(companyEntityTypeWorkflowStep.sortOrder).toBe(EXPECTED_SORT_ORDER);
		});

		it("adds entityTypeWorkflowStep to entityTypeField", async () => {
			expect(companyEntityTypeWorkflowStep).not.toBeUndefined();
			expect(companyEntityTypeFields.length).not.toBe(0);

			const companyEntityTypeFieldListItem = companyEntityTypeFields[0];

			{
				const getEntityTypeFieldRes = await gqlSupertest(GetEntityTypeFieldDocument, {
					id: companyEntityTypeFieldListItem.id,
				});

				const companyEntityTypeField = getEntityTypeFieldRes.getEntityTypeFields.rows[0];

				await gqlSupertest(EditEntityTypeFieldDocument, {
					input: {
						primaryKeys: {
							id: companyEntityTypeField.id,
						},
						primaryFields: {
							code: companyEntityTypeField.code,
							name: companyEntityTypeField.name,
							sortOrder: companyEntityTypeField.sortOrder,
							isRequired: companyEntityTypeField.isRequired,
							fieldTypeId: companyEntityTypeField.fieldType.id,
							category: companyEntityTypeField.category,
							isFilterAndTableColumn: companyEntityTypeField.isFilterAndTableColumn,
						},
						associatedFields: {
							entityTypeFieldWorkflowSteps: [
								{
									primaryFields: {
										entityTypeWorkflowStepId: companyEntityTypeWorkflowStep!.id,
									},
								},
							],
						},
					},
				});
			}

			{
				const getEntityTypeFieldRes = await gqlSupertest(GetEntityTypeFieldDocument, {
					id: companyEntityTypeFieldListItem.id,
				});
				const companyEntityTypeField = getEntityTypeFieldRes.getEntityTypeFields.rows[0];
				expect(companyEntityTypeField.entityTypeFieldWorkflowSteps.length).toBe(1);

				await gqlSupertest(EditEntityTypeFieldDocument, {
					input: {
						primaryKeys: {
							id: companyEntityTypeField.id,
						},
						primaryFields: {
							code: companyEntityTypeField.code,
							name: companyEntityTypeField.name,
							sortOrder: companyEntityTypeField.sortOrder,
							isRequired: companyEntityTypeField.isRequired,
							fieldTypeId: companyEntityTypeField.fieldType.id,
							category: companyEntityTypeField.category,
							isFilterAndTableColumn: companyEntityTypeField.isFilterAndTableColumn,
						},
						associatedFields: {
							entityTypeFieldWorkflowSteps: [
								{
									primaryKeys: {
										id: companyEntityTypeField.entityTypeFieldWorkflowSteps[0].id,
									},
									primaryFields: {
										entityTypeWorkflowStepId: companyEntityTypeWorkflowStep!.id,
									},
								},
							],
						},
					},
				});
			}
		});
	});

	// if (testEnv.TEST_SHOULD_REMOVE !== 0) {
	// 	describe("remove", () => {
	// 		it("soft removes entityLog one by one", async () => {
	// 			expect(entityLogIds.length).not.toBe(0);

	// 			for (const entityLogId of entityLogIds) {
	// 				await gqlSupertest(SoftRemoveEntityLogDocument, {
	// 					id: entityLogId,
	// 				});
	// 			}

	// 			const getEntityLogsRes = await gqlSupertest(GetEntityLogsDocument, {
	// 				entityId: companyEntity!.id,
	// 			});

	// 			const entityLogs = getEntityLogsRes.getEntityLogs.rows;
	// 			expect(entityLogs.length).toBe(0);
	// 		});

	// 		it("removes entityLogTypes one by one", async () => {
	// 			// test only, remove entityLogs
	// 			await db.getSequelizeModels().EntityLogs.destroy({
	// 				where: {
	// 					id: {
	// 						[Op.in]: entityLogIds,
	// 					},
	// 				},
	// 			});

	// 			expect(entityLogTypeIds.length).not.toBe(0);

	// 			for (const entityLogTypeId of entityLogTypeIds) {
	// 				await gqlSupertest(RemoveEntityLogTypeDocument, {
	// 					id: entityLogTypeId,
	// 				});
	// 			}
	// 		});

	// 		it("removes entityFiles one by one", async () => {
	// 			expect(entityFileIds.length).not.toBe(0);

	// 			for (const entityFileId of entityFileIds) {
	// 				await gqlSupertest(RemoveEntityFileDocument, {
	// 					id: entityFileId,
	// 				});
	// 			}
	// 		});

	// 		it("removes entityAddresses one by one", async () => {
	// 			expect(entityAddressIds.length).not.toBe(0);

	// 			for (const entityAddressId of entityAddressIds) {
	// 				await gqlSupertest(RemoveEntityAddressDocument, {
	// 					id: entityAddressId,
	// 				});
	// 			}
	// 		});

	// 		it("removes entityTypeAddressRole", async () => {
	// 			expect(companyEntityTypeAddressRole).not.toBeUndefined();

	// 			await gqlSupertest(RemoveEntityTypeAddressRoleDocument, {
	// 				id: companyEntityTypeAddressRole!.id,
	// 			});
	// 		});

	// 		it("removes entityEntities one by one", async () => {
	// 			expect(entityEntityIds.length).not.toBe(0);

	// 			for (const entityEntityId of entityEntityIds) {
	// 				await gqlSupertest(RemoveEntityEntityDocument, {
	// 					id: entityEntityId,
	// 				});
	// 			}
	// 		});

	// 		it("removes entityTypeEntityTypeRole", async () => {
	// 			expect(companyToCompanyRole).not.toBeUndefined();

	// 			await gqlSupertest(RemoveEntityTypeEntityTypeRoleDocument, {
	// 				id: companyToCompanyRole!.id,
	// 			});
	// 		});

	// 		it("removes entities one by one", async () => {
	// 			expect(entityIds.length).not.toBe(0);

	// 			for (const entityId of entityIds) {
	// 				await gqlSupertest(RemoveEntityDocument, {
	// 					id: entityId,
	// 				});
	// 			}
	// 		});

	// 		it("removes entityTypeField", async () => {
	// 			expect(companyEntityTypeFields.length).not.toBe(0);

	// 			await gqlSupertest(RemoveEntityTypeFieldDocument, {
	// 				id: companyEntityTypeFields[0]!.id,
	// 			});
	// 		});
	// 	});
	// }
});
