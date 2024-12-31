import { BaseModel } from "@/helpers/firestore/model/baseModel";

export default class Item implements BaseModel {
  constructor(
    id: string,
    description: string,
    quantity: number,
    value: number
  ) {
    this.id = id;
    this._description = description;
    this._quantity = quantity;
    this._value = value;
  }

  readonly id: string;
  private readonly _description: string;
  private readonly _quantity: number;
  private readonly _value: number;

  get description() {
    return this._description;
  }

  get quantity() {
    return this._quantity;
  }

  get value() {
    return this._value;
  }

  toJson() {
    return {
      id: this.id,
      description: this._description,
      quantity: this._quantity,
      value: this._value,
    };
  }
}
