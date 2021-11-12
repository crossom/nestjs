import {
	DynamicModule,
	Global,
	Inject,
	Module,
	OnApplicationShutdown,
	Provider,
} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import {
	BaseConnection,
	BaseConnectionOptions,
	Logger,
} from "@techmmunity/symbiosis";
import { SYMBIOSIS_MODULE_OPTIONS_ARRAY } from "./symbiosis.constants";
import { SymbiosisPluginClass } from "./types/symbiosis";
import { getConnectionToken } from "./utils/get-connection-token";

@Global()
@Module({})
export class SymbiosisCoreModule implements OnApplicationShutdown {
	public constructor(
		@Inject(SYMBIOSIS_MODULE_OPTIONS_ARRAY)
		private readonly options: Array<BaseConnectionOptions>,
		private readonly moduleRef: ModuleRef,
	) {}

	public static forRoot<ConnectionOptions extends BaseConnectionOptions>(
		// eslint-disable-next-line @typescript-eslint/naming-convention
		ConnectionClass: any,
		options?: ConnectionOptions,
	): DynamicModule {
		/**
		 * Must defined a array of options, because have to
		 * get the name of the connections to close it
		 * (Symb supports multiples connections)
		 */
		const symbiosisModuleOptions: Provider = {
			provide: SYMBIOSIS_MODULE_OPTIONS_ARRAY,
			useFactory: (optionsProvider?: Array<BaseConnectionOptions>) => [
				...(optionsProvider || []),
				options,
			],
			inject: [SYMBIOSIS_MODULE_OPTIONS_ARRAY],
		};

		const connectionProvider: Provider = {
			provide: getConnectionToken(options?.name),
			useFactory: async () => {
				const connection = new (ConnectionClass as SymbiosisPluginClass)(
					options,
				);

				await connection.load();
				await connection.connect();

				return connection;
			},
		};

		return {
			module: SymbiosisCoreModule,
			providers: [connectionProvider, symbiosisModuleOptions],
			exports: [connectionProvider],
		};
	}

	public async onApplicationShutdown() {
		const connections = this.options.map(conOpt =>
			this.moduleRef.get<BaseConnection>(getConnectionToken(conOpt.name)),
		);

		try {
			await Promise.all(connections.map(con => con?.close()));
		} catch (e: any) {
			Logger.cliError(e?.message);
		}
	}
}
