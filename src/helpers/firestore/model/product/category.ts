import { BaseModel } from "../baseModel";

export class Category implements BaseModel {
  constructor(id: string, name: string, pictureUrl: string) {
    this.id = id;
    this._name = name;
    this._pictureUrl = pictureUrl;
  }

  readonly id: string;

  readonly _name: string;
  public get name(): string {
    return this._name;
  }

  readonly _pictureUrl: string;
  public get pictureUrl(): string {
    return this._pictureUrl;
  }

  toJson() {
    return {
      id: this.id,
      pictureUrl: this._pictureUrl,
      name: this._name,
    };
  }
}
