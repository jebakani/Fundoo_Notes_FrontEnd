import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegistrationForm!: FormGroup;
  hide = true;
  email: any;
  constructor() { }

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
}


function password(password: any): ValidatorFn {
  throw new Error('Function not implemented.');
}

