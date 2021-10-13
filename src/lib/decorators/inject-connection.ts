import { Inject } from "@nestjs/common";
import { getConnectionToken } from "../utils/get-connection-token";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectConnection = (connectionName?: string) =>
	Inject(getConnectionToken(connectionName));
