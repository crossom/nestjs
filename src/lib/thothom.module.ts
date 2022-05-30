import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import type { BaseConnectionOptions } from "@thothom/core";

import { ThothOMCoreModule } from "./thothom-core.module";

import { createRepositoriesProviders } from "./utils/create-repository-providers";
import { getConnectionToken } from "./utils/get-connection-token";

import type { ForRootOptions } from "./types/options";

@Module({})
export class ThothOMModule {
	public static forRoot<ConnectionOptions extends BaseConnectionOptions>(
		options: ForRootOptions<ConnectionOptions>,
	): DynamicModule {
		return {
			module: ThothOMModule,
			imports: [ThothOMCoreModule.forRoot(options)],
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
			module: ThothOMModule,
			providers,
			exports: providers,
		};
	}
}
