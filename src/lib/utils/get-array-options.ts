export const getArrayOptions = <T>(options?: any): Array<T> => {
	if (!options) return [{} as T];

	if (Array.isArray(options)) {
		/**
		 * Checks if is an empty array
		 */
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return options.length < 1 ? [{} as T] : options;
	}

	return [options];
};
