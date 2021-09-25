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

  ResetPassword!: FormGroup
  hide = true;
  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ResetPassword = new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        cpassword: new FormControl('', [Validators.required])
      }
    )
  }

  ResetPasswords() {
      var email = JSON.parse( localStorage.getItem('forgetpassword')!).email;
      this.userService.ResetPasswords(email, this.ResetPassword.value)
        .subscribe((result: any) => {
          console.log(result);
          this.openSnackBar(result.message, '');
          if (result.status == true) {
            this.router.navigateByUrl('/login');
            localStorage.removeItem('forgetpassword');
          }

        },
          (error: HttpErrorResponse) => {
            if (!error.error.status) {
              this.openSnackBar(error.error.message, '');
            } else {
              this.openSnackBar('Unsuccessfull , Try again!', '');
            }
          }
        )
    localStorage.removeItem('forgetpassword');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
