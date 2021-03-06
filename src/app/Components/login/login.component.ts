import { HttpErrorResponse } from '@angular/common/http';
import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControlDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup
  constructor(
    private userService:UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router) { }
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
       this.openSnackBar(result.message , '');
       var param=
       {
           id:result.data.id,
           FirstName:result.data.firstName,
           LastName:result.data.lastName,
           Email:result.data.email,
           Token:result.resultMassage
       }
       localStorage.setItem('UserDataFundoo',JSON.stringify(param));
       this.router.navigateByUrl('/login');
    },
      (error:HttpErrorResponse) => { 
      if(!error.error.status){            
         this.openSnackBar(error.error.message , '');
      }
      else
      {
        this.openSnackBar('Unsuccessfull , Try again!' , '');
      }
      
   })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000
    }); 
 } 
}
