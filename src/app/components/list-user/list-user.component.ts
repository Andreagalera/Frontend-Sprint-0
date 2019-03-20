import { Component, OnInit, Input } from '@angular/core';
//import {Http} from '@angular/Http';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { ProvidersFeature } from '@angular/core/src/render3';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers:[UserService]
})
export class ListUserComponent implements OnInit {
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
}
