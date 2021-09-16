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
      this.userService.ForgetPassword(this.ForgetPasswordForm.value)
      .subscribe((result : any)=>
      {
         console.log(result);
         this.openSnackBar(result.message,'');
      })
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 5000
      }); 
}
}
