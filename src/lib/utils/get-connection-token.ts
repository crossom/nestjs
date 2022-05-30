export const getConnectionToken = (connectionName?: string): string =>
	`${connectionName?.toUpperCase() || "DEFAULT"}_THOTHOM_CONNECTION`;
