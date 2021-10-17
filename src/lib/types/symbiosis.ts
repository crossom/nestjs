import type { BaseConnectionOptions, Connection } from "@techmmunity/symbiosis";

export interface SymbiosisPluginClass {
	new (options: BaseConnectionOptions): Connection;
}
