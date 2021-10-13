export const getConnectionToken = (connectionName?: string): string =>
	`${connectionName?.toUpperCase() || "DEFAULT"}_SYMBIOSIS_CONNECTION`;
