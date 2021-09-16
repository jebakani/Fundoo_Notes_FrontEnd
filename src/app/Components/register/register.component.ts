import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router} from '@angular/router';

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
    public snackBar: MatSnackBar,
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
        cpassword :new FormControl('',[Validators.required,Validators.pattern('234')])
      }
      );
  }

  Register()
  {
    this.userService.Register(this.RegistrationForm.value)
    .subscribe((result : any)=>
    {
       console.log(result);
       if(result.status==true)
       {
          this.openSnackBar(result.message , '');
          this.router.navigateByUrl('/login');
       } 
       else
       {
         this.openSnackBar(result.message,'');
       }
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000
    }); 
 } 
}


