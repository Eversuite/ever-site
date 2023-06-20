export class Skin {
	private readonly _id: string;
	private readonly _name: string;
	private readonly _source: string;

	constructor(id: string, name: string, source: string) {
		this._id = id;
		this._name = name;
		this._source = source;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get source(): string {
		return this._source;
	}
}
