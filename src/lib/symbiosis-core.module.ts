import type {
	DynamicModule,
	OnApplicationShutdown,
	Provider,
} from "@nestjs/common";
import { Global, Inject, Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import type {
	BaseConnection,
	BaseConnectionOptions,
} from "@techmmunity/symbiosis";
import { Logger } from "@techmmunity/symbiosis";

import { SYMBIOSIS_MODULE_OPTIONS } from "./symbiosis.constants";

import { getArrayOptions } from "./utils/get-array-options";
import { getConnectionToken } from "./utils/get-connection-token";

import type { ForRootOptions } from "./types/options";
import type { SymbiosisPluginClass } from "./types/symbiosis";

@Global()
@Module({})
export class SymbiosisCoreModule implements OnApplicationShutdown {
	public constructor(
		@Inject(SYMBIOSIS_MODULE_OPTIONS)
		private readonly options: Array<BaseConnectionOptions>,
		private readonly moduleRef: ModuleRef,
	) {}

	public static forRoot<ConnectionOptions extends BaseConnectionOptions>(
		options: ForRootOptions<ConnectionOptions>,
	): DynamicModule {
		const arrOptions = getArrayOptions<ConnectionOptions>(options);

		const connectionsProviders: Array<Provider> = arrOptions.map(opt => ({
			provide: getConnectionToken(opt.options.name),
			useFactory: async () => {
				const connection = new (opt.class as SymbiosisPluginClass)(opt.options);

				await connection.load();

				if (opt.validate) {
					await connection.validate();
				}

				await connection.connect();

				return connection;
			},
		}));

		const connectionsOptions: Provider = {
			provide: SYMBIOSIS_MODULE_OPTIONS,
			useValue: arrOptions.map(opt => opt.options),
		};

		return {
			module: SymbiosisCoreModule,
			providers: [...connectionsProviders, connectionsOptions],
			exports: [...connectionsProviders],
		};
	}

	public async onApplicationShutdown() {
		const connections = this.options.map(opt =>
			this.moduleRef.get<BaseConnection>(getConnectionToken(opt.name)),
		);

		try {
			await Promise.all(connections.map(con => con?.close()));
		} catch (e: any) {
			Logger.cliError(e?.message);
		}
	}
}
