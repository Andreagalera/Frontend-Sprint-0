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
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])),

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
      'username': [
        { type: 'required', message: 'Username is required' },
        { type: 'pattern', message: 'Username must be unic' },
        { type: 'pattern', message: 'Username must be admin' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'It must be valid' },
        { type: 'pattern', message: 'It must conatain a number' },
      ]
    }
  }

  login() {
        console.log("Hola");
          console.log(this.loginForm.value.username);
          console.log("Form:"+this.loginForm.value);
          let user = new User(null, null, null, this.loginForm.value.username, null, null, null, null, this.loginForm.value.password, null);
         /* user.email = this.loginForm.value.email;
          user.password= this.loginForm.value.password;*/
          console.log("user" +user);
          this.userService.signin(user)
            .subscribe(
              res => {
                console.log(res);
                /* let token = res['token'];
                localStorage.setItem('token', token); */
               this.router.navigateByUrl("/listusers");

               
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
      console.log("entra")
      confirm('User incorrect')
      this.loginForm.get('password').setErrors({error: true});
    } else if (err.status == 404) {
      console.log("entrada")
      confirm('Password incorrect')
      this.loginForm.get('password').setErrors({valid: true});
    }
    else if  (err.status == 401) {
      console.log("salida")
      confirm('Unauthorized')
      this.loginForm.get('username').setErrors({valid: true});
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
