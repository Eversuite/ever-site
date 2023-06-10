export class Hero {
	private readonly _id: string;
	private readonly _name: string;
	private readonly _description: string;
	private readonly _role: string;
	private readonly _stance_map: Map<number, string>;

	constructor(
		id: string,
		name: string,
		description: string,
		role: string,
		stance_map: Map<number, string>
	) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._role = role;
		this._stance_map = stance_map;
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

	get role(): string {
		return this._role;
	}

	get stance_map(): Map<number, string> {
		return this._stance_map;
	}
}
