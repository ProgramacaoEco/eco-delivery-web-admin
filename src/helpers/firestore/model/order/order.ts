import Address from "./address";
import { BaseModel } from "../baseModel";
import Item from "./item";

export default class Order implements BaseModel {
    constructor(id: string, orderIssuer: string, address: Address, items: Item[], phoneNumber: string, createdOn: Date) {
        this._id = id;
        this._address = address;
        this._orderIssuer = orderIssuer;
        this._items = items;
        this._phoneNumber = phoneNumber;
        this._createdOn = createdOn;
    }
    
    readonly _id: string;
    
    private readonly _orderIssuer: string;
    public get orderIssuer(): string {
        return this._orderIssuer;
    }
    
    
    private readonly _address: Address;
    public get address(): Address {
        return this._address;
    }
    
    
    private readonly _items: Item[];
    public get items(): Item[] {
        return this._items;
    }
    
    
    private readonly _phoneNumber: string;
    public get phoneNumber(): string {
        return this._phoneNumber;
    }

    private readonly _createdOn: Date;
    public get createdOn(): Date {
        return this._createdOn;
    }

    toJson() {
        return {}
    };
}