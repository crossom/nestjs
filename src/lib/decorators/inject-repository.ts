import { Inject } from "@nestjs/common";

import { getRepositoryToken } from "../utils/get-repository-token";

import type { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectRepository = (
	entity: CustomClass,
	connectionName?: string,
) => Inject(getRepositoryToken(entity, connectionName));
