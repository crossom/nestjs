import type { Provider } from "@nestjs/common";
import type { BaseConnection } from "@techmmunity/symbiosis";

import { getRepositoryToken } from "./get-repository-token";

import type { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";

interface CreateRepositoryProvidersParams {
	entities: Array<CustomClass>;
	connectionToken: string;
	connectionName?: string;
}

export const createRepositoriesProviders = ({
	entities,
	connectionToken,
	connectionName,
}: CreateRepositoryProvidersParams): Array<Provider> =>
	entities.map(entity => ({
		provide: getRepositoryToken(entity, connectionName),
		useFactory: (connection: BaseConnection) =>
			connection.getRepository(entity),
		inject: [connectionToken],
	}));
