import { DynamicModule, Global, Module } from "@nestjs/common";
import { BaseConnectionOptions } from "@techmmunity/symbiosis";
import { SymbiosisPluginClass } from "./types/symbiosis";
import { getConnectionToken } from "./utils/get-connection-token";

@Global()
@Module({})
export class SymbiosisCoreModule {
	public static forRoot<ConnectionOptions extends BaseConnectionOptions>(
		// eslint-disable-next-line @typescript-eslint/naming-convention
		ConnectionClass: any,
		options?: ConnectionOptions,
	): DynamicModule {
		const connectionProvider = {
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
			providers: [connectionProvider],
			exports: [connectionProvider],
		};
	}
}
