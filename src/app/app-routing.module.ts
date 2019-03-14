import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'api/signin', component: LoginComponent},
  { path: 'api/signup', component: RegisterComponent },
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
