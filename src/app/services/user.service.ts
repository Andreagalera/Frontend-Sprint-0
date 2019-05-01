import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs';

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
    return this.http.post(this.environment.urlUser + "/users", user)
  }
  signin(user: User)  {
   return this.http.post(this.environment.urlUser + "/signInAdmin", user)
  }

  getUsers(){
    return this.http.get(this.environment.urlUser + "/users")

  }
  getUsersList(){
    return this.http.get(this.environment.urlUser + "/listusers")
  }

   putUser( user: User){
    return this.http.put(this.environment.urlUser + "/users", user)
  }

  deleteUser(_id: string){
    return this.http.delete(this.environment.urlUser + `/users/${_id}`)
  }
  getUsersDetail(_id: string): Observable<User>{
    return this.http.get<User>(this.environment.urlUser +`/users/info/${_id}`);

  }


}
