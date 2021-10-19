<div align="center">

<img src="https://github.com/techmmunity/symbiosis/raw/master/resources/logo.gif" width="300" height="300">

# Techmmunity - Symbiosis NestJS

<a href="https://github.com/techmmunity/eslint-config">
	<img src="https://img.shields.io/badge/style%20guide-Techmmunity-01d2ce?style=for-the-badge" alt="Style Guide: Techmmunity">
</a>
<a href="https://www.codefactor.io/repository/github/techmmunity/symbiosis-nestjs">
	<img src="https://www.codefactor.io/repository/github/techmmunity/symbiosis-nestjs/badge?style=for-the-badge" alt="CodeFactor">
</a>
<a href="https://coveralls.io/github/techmmunity/symbiosis-nestjs?branch=master">
	<img src="https://img.shields.io/coveralls/github/techmmunity/symbiosis-nestjs/master?style=for-the-badge" alt="Coveralls">
</a>
<a href="https://github.com/techmmunity/symbiosis-nestjs/actions/workflows/coverage.yml">
	<img src="https://img.shields.io/github/workflow/status/techmmunity/symbiosis-nestjs/Collect%20Coverage?label=tests&logo=github&style=for-the-badge" alt="Tests">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/symbiosis-nestjs">
	<img src="https://img.shields.io/npm/v/@techmmunity/symbiosis-nestjs.svg?color=CC3534&style=for-the-badge" alt="Npm">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/symbiosis-nestjs">
	<img src="https://img.shields.io/npm/dw/@techmmunity/symbiosis-nestjs.svg?style=for-the-badge" alt="Downloads">
</a>

<br>
<br>

</div>

A NestJs wrapper for [@techmmunity/symbiosis](https://github.com/techmmunity/symbiosis).

## Installation

With Yarn:

```sh
yarn add @techmmunity/symbiosis @techmmunity/symbiosis-nestjs
```

With NPM:

```sh
npm i --save @techmmunity/symbiosis @techmmunity/symbiosis-nestjs
```

## Usage

```ts
// app.module.ts

import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import {
	DynamodbConnection,
	DynamodbConnectionConfig,
} from "@techmmunity/symbiosis-dynamodb";

@Module({
	imports: [
		SymbiosisModule.forRoot<DynamodbConnectionConfig>(DynamodbConnection, {
			// ...
			entities: [UserEntity],
			databaseConfig: {
				// ...
			},
		}),
	],
})
export class AppModule {}
```

```ts
// user.module.ts

import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";

@Module({
	imports: [SymbiosisModule.forFeature([UserEntity])],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
```

```ts
// user.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { Repository } from "@techmmunity/symbiosis";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>
	) {}

	findOne(id: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				id,
			},
		});
	}

	async remove(id: string): Promise<void> {
		await this.userRepository.delete({
			where: {
				id,
			},
		});
	}
}
```

## How to contribute?

All the details about contributing to the project are [described here](https://github.com/techmmunity/symbiosis-nestjs/blob/master/CONTRIBUTING.md).

## Documentation
