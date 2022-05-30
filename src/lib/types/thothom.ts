import type {
	BaseConnectionOptions,
	BaseConnection,
} from "@thothom/core";

export interface ThothOMPluginClass {
	new (options?: BaseConnectionOptions): BaseConnection;
}
