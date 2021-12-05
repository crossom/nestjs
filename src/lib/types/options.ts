export interface SingleForRootOptions<ConnectionOptions> {
	class: any;
	validate?: boolean;
	options: ConnectionOptions;
}

export type ArrayForRootOptions<ConnectionOptions> = Array<
	SingleForRootOptions<ConnectionOptions>
>;

export type ForRootOptions<ConnectionOptions> =
	| ArrayForRootOptions<ConnectionOptions>
	| SingleForRootOptions<ConnectionOptions>;
