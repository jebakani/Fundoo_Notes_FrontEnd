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
  hide=true;
  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ResetPassword = new FormGroup(
      {
        email:new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        cpassword :new FormControl('',[Validators.required])
      }
    )
  }

   ResetPasswords()
   { 
    this.userService.ResetPasswords(this.ResetPassword.value)
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
      if(!error.error.status){            
        this.openSnackBar(error.error.message , '');
      } else
      {
        this.openSnackBar('Unsuccessfull , Try again!' , '');
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
