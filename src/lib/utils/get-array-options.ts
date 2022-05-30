import { ThothError } from "@thothom/core";

import type { ArrayForRootOptions, ForRootOptions } from "../types/options";

export const getArrayOptions = <T>(
	options: ForRootOptions<T>,
): ArrayForRootOptions<T> => {
	if (!options) {
		throw new ThothError({
			origin: "THOTHOM",
			code: "MISSING_PARAM",
			message: "Invalid connection options",
			details: [
				"`options` is a required parameter to `forRoot` method of `ThothOMModule`",
			],
		});
	}

	if (Array.isArray(options)) {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (options.length < 1) {
			throw new ThothError({
				origin: "THOTHOM",
				code: "MISSING_PARAM",
				message: "Invalid connection options",
				details: [
					"At least one options must be specified at the array `options` (`forRoot` method of `ThothOMModule`)",
				],
			});
		}

		if (options.some(opt => !opt.class)) {
			throw new ThothError({
				origin: "THOTHOM",
				code: "MISSING_PARAM",
				message: "Invalid connection class",
				details: [
					"`class` is a required property of `options` (`forRoot` method of `ThothOMModule`)",
				],
			});
		}

		return options;
	}

	if (!options.class) {
		throw new ThothError({
			origin: "THOTHOM",
			code: "MISSING_PARAM",
			message: "Invalid connection class",
			details: [
				"`class` is a required property of `options` (`forRoot` method of `ThothOMModule`)",
			],
		});
	}

	return [options];
};
