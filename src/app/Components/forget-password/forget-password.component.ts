import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  ForgetPasswordForm!:FormGroup
  IsWait=false;
  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ForgetPasswordForm=new FormGroup
    (
      {
        email:new FormControl('',[Validators.required,Validators.email])
      }
    );
  }
    ForgetPassword()
    {
      this.IsWait=true;
      this.userService.ForgetPassword(this.ForgetPasswordForm.value)
      .subscribe((result : any)=>
      {
        const param=
        {
          email:result.data,
          token:result.result
        }
         console.log(result);
         this.openSnackBar(result.message,'');
         localStorage.setItem("forgetpassword",JSON.stringify(param));
         var res=localStorage.getItem('forgetpassword');
         if(res!=null)
         {
           console.log(JSON.parse(res).email)
         }
      }, 
      (error:HttpErrorResponse) => { 
        if(error.status==400){            
          this.openSnackBar(error.error.message , '');
        }
      else
    {
      this.openSnackBar("Try again!" , '');

    }})
       
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 5000
      }); 
}
}
