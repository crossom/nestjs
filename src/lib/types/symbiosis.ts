import type { BaseConnectionOptions, Connection } from "@techmmunity/symbiosis";

export interface SymbiosisConnectionClass<
	ModuleOptions extends BaseConnectionOptions,
> extends Connection {
	new (options: ModuleOptions): Connection;
}
