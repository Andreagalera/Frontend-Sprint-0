import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import {ListUserComponent} from "./components/list-user/list-user.component";
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'user/signin', component: LoginComponent},
  { path: 'users', component: RegisterComponent },
  { path: 'listusers', component: ListUserComponent },
  { path: 'spotifylogin', component: LoginComponent },

  { path: '', redirectTo: 'user/signin', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
