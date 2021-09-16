import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpServices/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private httpService:HttpServiceService) { }

  Register(data:any)
  {
    const params={
      FirstName:data.firstName,
      LastName:data.lastName,
      Email:data.email,
      Password:data.password
    }
    return this.httpService.post(`${environment.baseurl}/api/User/register`,params);
  }

  Login(data:any)
  {
    const params={
      EmailId:data.email,
      Password:data.password
    }
    return this.httpService.post(`${environment.baseurl}/api/User/login`,params);
  }
  ForgetPassword(data:any)
  {
      const email=data.email
    return this.httpService.post(`${environment.baseurl}/api/User/forgetPassword?email=${email}`);
  }
  ResetPasswords(data:any)
  {
    const params={
      EmailId:data.email,
      NewPassword:data.password
    }
    return this.httpService.put(`${environment.baseurl}/api/User/resetPassword`,params);
  }
}
