import { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";

export const getRepositoryToken = (
	entity: CustomClass,
	connectionName?: string,
): string => {
	const connectionNameFormatted = connectionName?.toUpperCase() || "DEFAULT";
	const entityName = (entity as any).name.toUpperCase();

	return `${connectionNameFormatted}_${entityName}_REPOSITORY`;
};
