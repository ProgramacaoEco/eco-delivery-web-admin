export interface BaseModel {
  _id: string;
  toJson: () => Object;
}
