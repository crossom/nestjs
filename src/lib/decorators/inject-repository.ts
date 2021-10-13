import { Inject } from "@nestjs/common";
import { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";
import { getRepositoryToken } from "../utils/get-repository-token";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectRepository = (
	entity: CustomClass,
	connectionName?: string,
) => Inject(getRepositoryToken(entity, connectionName));
