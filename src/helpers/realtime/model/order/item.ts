export default class Item {

    constructor(id:string, description: string, quantity: number, value: number) {
        this._id = id;
        this._description = description;
        this._quantity = quantity;
        this._value = value;
    }

    private readonly _id: string;
    private readonly _description: string;
    private readonly _quantity: number;
    private readonly _value: number;

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get quantity() {
        return this._quantity;
    }

    get value() {
        return this._value;
    }

}