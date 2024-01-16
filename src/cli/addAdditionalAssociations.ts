import fse from "fs-extra";
import { camelCase, upperFirst } from "lodash";
import { Utils } from "sequelize";
import { TableConfig } from ".";

// @TODO this is better done in sequelize-auto
const addAdditionalRelations = (sequelizeAutoDir: string, tableConfigs: TableConfig[]) => {
	const initModelsFilePath = sequelizeAutoDir + "/init-models.ts";
	const initModelsStr = fse.readFileSync(initModelsFilePath).toString();
	const initModelsStrSplit = initModelsStr.split("\treturn {");

	if (initModelsStrSplit.length !== 2) {
		throw Error("Failed to parse init-models.ts. This may be due to sequelize-auto version");
	}

	const sequelizeAdditionalAssociations: string[] = [];

	for (const tableConfig of tableConfigs) {
		if (tableConfig.additionalAssociations) {
			const tableNameShort = tableConfig.name.split(".")[1];
			const sequelizeModelName = upperFirst(camelCase(tableNameShort));

			for (const additionalAssociation of tableConfig.additionalAssociations) {
				const associatedTableNameShort = additionalAssociation.name.split(".")[1];
				const associatedSequelizeModelName = upperFirst(camelCase(associatedTableNameShort));
				const foreignFieldName = camelCase(Utils.singularize(additionalAssociation.foreignKey));
				const referenceFieldName = camelCase(Utils.singularize(additionalAssociation.referenceKey));

				const sequelizeAdditionalAssociation = `\t${sequelizeModelName}.belongsTo(${associatedSequelizeModelName}, { as: "${additionalAssociation.fieldName}", foreignKey: "${foreignFieldName}", targetKey: "${referenceFieldName}" });\n`;
				sequelizeAdditionalAssociations.push(sequelizeAdditionalAssociation);
			}
		}
	}

	fse.outputFileSync(
		initModelsFilePath,
		initModelsStrSplit[0] +
			sequelizeAdditionalAssociations.join("") +
			"\n\treturn {" +
			initModelsStrSplit[1],
	);
};

export default addAdditionalRelations;
