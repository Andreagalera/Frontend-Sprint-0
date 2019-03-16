import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  user: User[];
  environment: EnvironmentService;

  constructor( private http: HttpClient) {
    this.selectedUser = new User();
    this.environment = new EnvironmentService();
   }
   signup(user: User) {
    return this.http.post(this.environment.urlUser + "user", user)
  }
  signin(user: User)  {
   return this.http.post(this.environment.urlUser + "/user/signin", user)
  }

  getUsers(){
    return this.http.get(this.environment.urlUser + "/users")
    
  }

 /*  putUser( user: User){
    return this.http.put(this.environment.urlUser + `/${user.id}`, user)
  }

  deleteUser(user: User){
    return this.http.delete(this.environment.urlUser + `/${user.id}`, user)
  } */


}
