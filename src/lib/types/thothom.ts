import type {
	BaseConnectionOptions,
	BaseConnection,
} from "@techmmunity/symbiosis";

export interface ThothOMPluginClass {
	new (options?: BaseConnectionOptions): BaseConnection;
}
