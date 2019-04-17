import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  validation_messages: any;

  constructor(private userService: UserService, private router: Router,  private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)]))
    })

  }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2275019405888323',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


    this.validation_messages = {
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Email must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Password must be valid' },
        { type: 'pattern', message: 'Huston, we have a problem' },
      ]
    }
  }

  login() {
        console.log("Hola");
          console.log(this.loginForm.value.email);
          console.log("Form:"+this.loginForm.value);
          let user = new User(null, null, null, null, this.loginForm.value.email, null, null, null, this.loginForm.value.password, null);
         /* user.email = this.loginForm.value.email;
          user.password= this.loginForm.value.password;*/
          console.log("user" +user);
          this.userService.signin(user)
            .subscribe(
              res => {
                console.log(res);
                /* let token = res['token'];
                localStorage.setItem('token', token); */
               // this.router.navigateByUrl("/users");

               
              },
              err => {
                console.log(err);
                this.handleError(err);
              });
        }

        
       

 /*  private handleError(err: HttpErrorResponse) {
    if (err.status == 500) {
      alert(err);
    } else if (err.status == 404) {
      alert('The user does not exist');
    }
  } */

  private handleError(err: HttpErrorResponse) {
    if (err.status == 500) {
      this.loginForm.get('password').setErrors({error: true});
    } else if (err.status == 404) {
      this.loginForm.get('password').setErrors({valid: true});
    }
  }
  submitLogin(){
    console.log("submit login to facebook");
    //FB.login();
    FB.login((response)=>
        {
          console.log("hola");
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            console.log(response.authResponse);
            /* let token = res['token'];
            localStorage.setItem('token', token); */
            this.router.navigateByUrl("/listusers");
            
           }
           else
           {
           console.log('User login failed');
         }
      });
  }
  
}
