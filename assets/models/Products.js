export class Products {
    constructor(_name, _price, _screen, _blackcamera, _frontcamera, _img, _description, _type) {
        this.name = _name,
            this.price = _price,
            this.screen = _screen,
            this.blackcamera = _blackcamera,
            this.froncamera = _frontcamera,
            this.img = _img,
            this.description = _description,
            this.type = _type
    }
    // calculateDiscount = () => {

    //     return (this.price*0.05)
    // }
}