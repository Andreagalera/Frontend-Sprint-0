import { Component, OnInit, Input } from '@angular/core';
//import {Http} from '@angular/Http';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { ProvidersFeature } from '@angular/core/src/render3';
declare var M: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers:[UserService]
})
export class ListUserComponent implements OnInit {

  user: User;
  @Input() users;

  constructor(private userService: UserService ) { 


  }

  ngOnInit() {

    this.getUsersList();
  }

  getUsersList(){
    this.userService.getUsers()
    .subscribe(res =>{
      this.userService.user= res as User[];
      console.log(res);
    });
  }
  editUser(user: User){
    this.userService.selectedUser = user;
  }
  deleteUser(_id: string, form: NgForm){
    if(confirm('Are you sure you want to delete it?')) {
      this.userService.deleteUser(_id)
        .subscribe(res => {
          this.getUsersList();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.selectedUser = new User();
    }
  }
}
