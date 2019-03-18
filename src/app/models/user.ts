export class User {

    name: string;
    surname: string;
    username :string;
    email: string;
    age: string;
    description: string;
    localization: string;
    password: string;
    //picture: string;
    passwordrepeat: string;
    
    


    constructor(name = '',surname = '',username = '', email = '',  age = '', descirption = '', localization = '', password = '', passwordrepeat = '') {
        this.name=name;
        this.surname=surname; 
        this.username=username;
        this.email = email;
        this.age=age;
        this.description=descirption;
        this.localization=localization;
        this.password=password;
        this.passwordrepeat=passwordrepeat;
       //this.picture=pictute;
        
    }

}
