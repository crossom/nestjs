import type {
	BaseConnectionOptions,
	BaseConnection,
} from "@techmmunity/symbiosis";

export interface SymbiosisPluginClass {
	new (options?: BaseConnectionOptions): BaseConnection;
}
