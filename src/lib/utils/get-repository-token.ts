import { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";

export const getRepositoryToken = (
	entity: CustomClass,
	connectionName?: string,
): string =>
	`${connectionName?.toUpperCase() || "DEFAULT"}_${(
		entity as any
	).name.toUppercase()}_REPOSITORY`;
