class Localization {
    _id:string;
    name: string;
    coords: Coordinates;
    date: Date;

    constructor(
    ){
        this.name = "";
        this.coords = new Coordinates();
        this.date = new Date()
    }
}

export default Localization;
