import Address from "./address";
import { BaseModel } from "@/helpers/firestore/model/baseModel";
import Item from "./item";
import { OrderStatus } from "../../enum/order-status";

export default class Order implements BaseModel {
  constructor(
    id: string,
    isViewed: boolean,
    orderIssuer: string,
    address: Address,
    items: Item[],
    phoneNumber: string,
    createdOn: Date,
    status: OrderStatus
  ) {
    this.id = id;
    this._isViewed = isViewed;
    this._address = address;
    this._orderIssuer = orderIssuer;
    this._items = items;
    this._phoneNumber = phoneNumber;
    this._createdOn = createdOn;
    this._status = status;
  }

  readonly id: string;

  private readonly _orderIssuer: string;
  public get orderIssuer(): string {
    return this._orderIssuer;
  }

  private _isViewed: boolean;

  public get isViewed(): boolean {
    return this._isViewed;
  }

  public set isViewed(isViewed: boolean) {
    this._isViewed = isViewed;
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

  private readonly _status: OrderStatus;
  public get status(): OrderStatus {
    return this._status;
  }

  toJson() {
    return {
      id: this.id,
      isViewed: this._isViewed,
      orderIssuer: this._orderIssuer,
      address: this._address.toJson(),
      items: this._items.map((item) => item.toJson()),
      phoneNumber: this._phoneNumber,
      createdOn: this._createdOn.toISOString(),
      status: this._status,
    };
  }
}
