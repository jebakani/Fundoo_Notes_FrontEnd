import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { CreateNoteComponent } from './Components/create-note/create-note.component';


var data =localStorage.getItem('forgetpassword');
var usertoken=data==null?' ':JSON.parse(data).token;

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:`reset-password/${usertoken}`,component:ResetPasswordComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'dashboard',component:DashBoardComponent},
  {path:'createNote',component:CreateNoteComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
