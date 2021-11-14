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
import { SYMBIOSIS_MODULE_OPTIONS } from "./symbiosis.constants";
import { ForRootOptions } from "./types/options";
import { SymbiosisPluginClass } from "./types/symbiosis";
import { getArrayOptions } from "./utils/get-array-options";
import { getConnectionToken } from "./utils/get-connection-token";

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
