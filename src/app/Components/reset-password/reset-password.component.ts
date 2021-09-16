import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPassword!:FormGroup
  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ResetPassword = new FormGroup(
      {
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        cpassword :new FormControl('',[Validators.required])
      }
    )
  }

   ResetPasswords()
   { 
    this.userService.Register(this.ResetPassword.value)
    .subscribe((result : any)=>
    {
       console.log(result);
       this.openSnackBar(result.message , '');
       if(result.status==true)
       {
          this.router.navigateByUrl('/login');
       } 
       
    },
    (error:HttpErrorResponse) => { 
      if(error.status==400){            
        this.openSnackBar(error.error.message , '');
      }
   }
    )
   }
  
   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000
    }); 
  }
}
