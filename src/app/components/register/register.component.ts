import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {passValidator} from "./validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  validation_messages: any;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])),

        /* surname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,10}$/)])), */
          
        username: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,10}$/)])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),
      
     /* age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])),

      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])),

      localization: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])), */

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)])),

      confirmPassword: ['', passValidator]
    }
  )
  }
  confirmPasswword: string;
  ngOnInit() {

    this.getUsersList();
    this.validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      /* 'surname': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ], */
      'username': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'unique', message: 'Email must be unique'} ,
        { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
     /*  'age': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      'description': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      'localization': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ], */
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ],
      'confirmPassword': [
        { type: 'required', message: 'Password is required and both must match' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ]
    }
  }

  
  register() {
    console.log("Hola");
  console.log(this.registerForm.value);
    let user = new User(null, this.registerForm.value.name,null, this.registerForm.value.username, this.registerForm.value.email, null, null, null, this.registerForm.value.password, this.registerForm.value.confirmPassword);
    console.log(user);
    this.userService.signup(user)
      .subscribe(
        res => {
          console.log(res);
          this.getUsersList();
          /* let token = res['token'];
          localStorage.setItem('token', token); */
          //this.router.navigateByUrl("/signin");
        },
        err => {
          this.registerForm.get("email").setErrors({unique: true});
        });
  }


  getUsersList(){
      this.userService.getUsers()
      .subscribe(res =>{
        this.userService.user= res as User[];//un arreglo de users
        console.log(res);
      });
    }

  }
