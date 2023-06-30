
export class Build {
	private readonly _id: string;
	private readonly _urlID: string;
	private readonly _title: string;
	private readonly _hero: string;
	private readonly _author: string;
	private readonly _abilties: string[];
	private readonly _shards: string[];
	private readonly _consumables: string;
	private readonly _gameVersion: string;

	constructor(
		id: string,
		urlID: string,
		title: string,
		hero: string,
		author: string,
		abilties: string[],
		shards: string[],
		consumables: string,
		gameVersion: string
	) {
		this._id = id;
		this._urlID = urlID;
		this._title = title;
		this._hero = hero;
		this._author = author;
		this._abilties = abilties;
		this._shards = shards;
		this._consumables = consumables;
		this._gameVersion = gameVersion;
	}

	get id(): string {
		return this._id;
	}

	get urlID(): string {
		return this._urlID;
	}

	get title(): string {
		return this._title;
	}

	get hero(): string {
		return this._hero;
	}

	get author(): string {
		return this._author;
	}

	get abilties(): string[] {
		return this._abilties;
	}
	get shards(): string[] {
		return this._shards;
	}

	get consumables(): string {
		return this._consumables;
	}

	get gameVersion(): string {
		return this._gameVersion;
	}
}
