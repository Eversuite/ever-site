export class Hero
{
    private readonly _id: string
    private readonly _name: string
    private readonly _description: string
    private readonly _role: string

    constructor(id: string, name: string, description: string, role: string) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._role = role;
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
}