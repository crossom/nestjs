import { Provider } from "@nestjs/common";
import { Connection } from "@techmmunity/symbiosis";
import { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";
import { getRepositoryToken } from "./get-repository-token";

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
		useFactory: (connection: Connection) => connection.getRepository(entity),
		inject: [connectionToken],
	}));
