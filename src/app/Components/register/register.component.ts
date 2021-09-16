import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegistrationForm!: FormGroup;
  hide = true;
  email: any;
  constructor( 
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
    ) 
    { }

  ngOnInit(): void {
    this.RegistrationForm=new FormGroup(
      {
        firstName : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{1}[A-Z a-z]{2,}'),Validators.minLength(3)]),
        lastName : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{1}[A-Z a-z]{2,}'),Validators.minLength(3)]),
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        cpassword :new FormControl('',[Validators.required])
      }
      );
  }
   
  Register()
  {
    this.userService.Register(this.RegistrationForm.value)
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
      }})
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000
    }); 
 } 
}


