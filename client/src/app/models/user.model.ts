import {userRoleEnum} from '../../environments/environment';


class User {
    _id:string;
    username: string;
    firstname: string;
    lastname: string;
    roles: userRoleEnum;
    email: string;
    password: string;
    date: Date;

    constructor(
    ){
        this.username = "";
        this.firstname = "";
        this.lastname = "";
        this.roles = userRoleEnum.CLIENT;
        this.email = "";
        this.password = "";
        this.date = new Date()
    }
}

export default User;
