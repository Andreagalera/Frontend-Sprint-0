export class User {

    name: string;
    surname: string;
    username :string;
    password: string;
    email: string;
    age: string;
    picture: string;
    description: string;
    localization: string;


    constructor(email = '', name = '', age = '', username = '', password = '', surname = '', pictute = '', descirption = '', localization = '') {
        this.email = email;
        this.username=username;
        this.password=password;
        this.name=name;
        this.age=age;
        this.description=descirption;
        this.localization=localization;
        this.picture=pictute;
        this.surname=surname;
    }

}
