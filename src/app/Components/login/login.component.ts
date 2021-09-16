import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControlDirective } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup
  constructor(
    private userService:UserServiceService) { }
  hide=true;
  ngOnInit(): void {
    this.LoginForm=new FormGroup(
      {
          email:new FormControl('',[Validators.required,Validators.email]),
          password:new FormControl('',[Validators.required])
      }
    );
  }
  
  Login()
  {
    this.userService.Login(this.LoginForm.value)
    .subscribe((result : any)=>
    {
       console.log(result);
      
    })
  }
}
