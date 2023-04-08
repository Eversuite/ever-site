export class Talent {
	private readonly _id: string;
	private readonly _name: string;
	private readonly _description: string;
	private readonly _hero: string;
	private readonly _category: string;
	private readonly _tier: number;

	constructor(
		id: string,
		name: string,
		description: string,
		hero: string,
		category: string,
		tier: number
	) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._hero = hero;
		this._category = category;
		this._tier = tier;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get hero(): string {
		return this._hero;
	}
	get category(): string {
		return this._category;
	}
	get tier(): number {
		return this._tier;
	}
}
