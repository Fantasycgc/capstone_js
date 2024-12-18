export class Product {
  constructor(
    _id,
    _name,
    _price,
    _screen,
    _blackcamera,
    _frontcamera,
    _img,
    _description,
    _type
  ) {
    (this.id = _id),
      (this.name = _name),
      (this.price = _price),
      (this.screen = _screen),
      (this.blackcamera = _blackcamera),
      (this.frontcamera = _frontcamera),
      (this.img = _img),
      (this.description = _description),
      (this.type = _type);
  }
}
