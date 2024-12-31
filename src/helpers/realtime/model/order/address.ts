export default class Address {
  constructor(
    address: string,
    number: string,
    apt: string,
    neighborhood: string,
    reference: string,
    postalCode: string
  ) {
    this._address = address;
    this._apt = apt;
    this._neighborhood = neighborhood;
    this._number = number;
    this._reference = reference;
    this._postalCode = postalCode;
  }

  private readonly _address: string;
  public get address(): string {
    return this._address;
  }

  private readonly _number: string;
  public get number(): string {
    return this._number;
  }

  private readonly _neighborhood: string;
  public get neighborhood(): string {
    return this._neighborhood;
  }

  private readonly _reference: string;
  public get reference(): string {
    return this._reference;
  }

  private readonly _apt: string;
  public get apt(): string {
    return this._apt;
  }

  private readonly _postalCode: string;
  public get postalCode(): string {
    return this._postalCode;
  }

  toJson() {
    return {
      address: this._address,
      number: this._number,
      neighborhood: this._neighborhood,
      reference: this._reference,
      apt: this._apt,
      postalCode: this._postalCode,
    };
  }
}
