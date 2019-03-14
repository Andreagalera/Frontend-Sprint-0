export class User {
    email: string;
    firstname: string;
    lastname: string;
    username :string;
    password: string;

    constructor(email = '', firstname = '', lastname = '', username = '', password = '') {
        this.email = email;
        this.firstname=firstname;
        this.lastname=lastname;
        this.username=username;
        this.password=password;
    }

}
