import _ from "lodash";

export interface ImportGenSingle {
	import: string;
	isDefault?: boolean;
	from: string;
}

export const tabs = (count: number) => {
	const tabsStrArr: string[] = [];
	for (let i = 0; i < count; ++i) {
		tabsStrArr.push("\t");
	}
	return tabsStrArr.join("");
};

export const generateImports = (importGenSingles: ImportGenSingle[]) => {
	// import per from
	const imports: { [source: string]: { default?: string; imports: string[] } } = {};
	importGenSingles.forEach((importGenSingle) => {
		const importData = imports[importGenSingle.from];
		if (importData) {
			if (importGenSingle.isDefault) {
				importData.default = importGenSingle.import;
			} else {
				importData.imports.push(importGenSingle.import);
			}
		} else {
			let newImportData: { default?: string; imports: string[] };
			if (importGenSingle.isDefault) {
				newImportData = {
					default: importGenSingle.import,
					imports: [],
				};
			} else {
				newImportData = {
					imports: [importGenSingle.import],
				};
			}
			imports[importGenSingle.from] = newImportData;
		}
	});

	const importStrArr: string[] = [];
	_.keys(imports).forEach((source) => {
		const importData = imports[source];
		let importStr = "import";
		if (importData.default) {
			importStr += ` ${importData.default}`;
		}

		if (importData.imports.length !== 0) {
			importStr += (importData.default ? ", " : " ") + `{ ${importData.imports.join(", ")} }`;
		}

		importStr += ` from "${source}";`;
		importStrArr.push(importStr);
	});

	if (importStrArr.length !== 0) {
		return importStrArr.join("\n");
	}

	return "";
};
