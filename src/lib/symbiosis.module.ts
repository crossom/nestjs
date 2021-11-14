import { DynamicModule, Module } from "@nestjs/common";
import { BaseConnectionOptions } from "@techmmunity/symbiosis";
import { SymbiosisCoreModule } from "./symbiosis-core.module";
import { ForRootOptions } from "./types/options";

import { createRepositoriesProviders } from "./utils/create-repository-providers";
import { getConnectionToken } from "./utils/get-connection-token";

@Module({})
export class SymbiosisModule {
	public static forRoot<ConnectionOptions extends BaseConnectionOptions>(
		options: ForRootOptions<ConnectionOptions>,
	): DynamicModule {
		return {
			module: SymbiosisModule,
			imports: [SymbiosisCoreModule.forRoot(options)],
		};
	}

	public static forFeature(
		entities: Array<any> = [],
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
