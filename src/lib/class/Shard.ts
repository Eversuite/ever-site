import type { Property } from '$lib/class/Property';

export class Shard {
	private readonly _id: string;
	private readonly _name: string;
	private readonly _description: string;
	private readonly _properties: Map<string, Property[]>;

	constructor(id: string, name: string, description: string, properties: Map<string, Property[]>) {
		this._id = id;
		this._name = name;
		this._description = description;
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

	get properties(): Map<string, Property[]> {
		return this._properties;
	}
}
