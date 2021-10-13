import { DynamicModule, Module } from "@nestjs/common";
import { BaseConnectionOptions } from "@techmmunity/symbiosis";
import { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";
import { SymbiosisCoreModule } from "./symbiosis-core.module";
import { SymbiosisConnectionClass } from "./types/symbiosis";

import { createRepositoriesProviders } from "./utils/create-repository-providers";
import { getConnectionToken } from "./utils/get-connection-token";

@Module({})
export class SymbiosisModule {
	public static forRoot<ConnectionOptions extends BaseConnectionOptions>(
		// eslint-disable-next-line @typescript-eslint/naming-convention
		ConnectionClass: SymbiosisConnectionClass<ConnectionOptions>,
		options: ConnectionOptions,
	): DynamicModule {
		return {
			module: SymbiosisModule,
			imports: [SymbiosisCoreModule.forRoot(ConnectionClass, options)],
		};
	}

	public static forFeature(
		entities: Array<CustomClass> = [],
		connectionName?: string,
	): DynamicModule {
		const connectionToken = getConnectionToken(connectionName);

		const providers = createRepositoriesProviders({
			entities,
			connectionName,
			connectionToken,
		});

		return {
			module: SymbiosisModule,
			providers,
			exports: providers,
		};
	}
}
