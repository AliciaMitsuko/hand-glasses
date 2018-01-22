class Coordinate {
    _id:string;
    latitude: Number;
    longitude: Number;
    date: Date;

    constructor(
    ){
        this.latitude = 0;
        this.longitude = 0;
        this.date = new Date()
    }
}

export default Coordinate;
