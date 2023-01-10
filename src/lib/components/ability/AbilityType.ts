export class Property {
	Time: number;
	Value: number;

	constructor(time: number, value: number) {
		this.Time = time;
		this.Value = value;
	}
}

export class Ability {
	private readonly _id: string;
	private readonly _name: string;
	private readonly _description: string;
	private readonly _source: string;
	private readonly _slot: string;
	private readonly _properties: Map<string, Property[]>;

	constructor(
		id: string,
		name: string,
		description: string,
		source: string,
		slot: string,
		properties: Map<string, Property[]>
	) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._source = source;
		this._slot = slot;
		this._properties = properties;
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

	get source(): string {
		return this._source;
	}
	get slot(): string {
		return this._slot;
	}

	get properties(): Map<string, Property[]> {
		return this._properties;
	}
}
