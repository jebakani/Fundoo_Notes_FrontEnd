import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  hide=true;
  ngOnInit(): void {
  }

}
