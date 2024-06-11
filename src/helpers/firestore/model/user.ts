export class User implements BaseModel {
  constructor(id: string, email: string, userName: string) {
    this._id = id;
    this._email = email;
    this._userName = userName;
  }

  _id: string;
  private _email: string;
  private _userName: string;

  get email() {
    return this._email;
  }

  get userName() {
    return this._userName;
  }
}
