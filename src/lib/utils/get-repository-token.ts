export const getRepositoryToken = (
	entity: any,
	connectionName?: string,
): string => {
	const connectionNameFormatted = connectionName?.toUpperCase() || "DEFAULT";
	const entityName = entity.name.toUpperCase();

	return `${connectionNameFormatted}_${entityName}_REPOSITORY`;
};
