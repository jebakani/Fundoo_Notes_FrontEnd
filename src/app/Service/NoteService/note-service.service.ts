import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../httpServices/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor(private httpService:HttpServiceService) { }

  createNote(data:any)
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!);
    const param= 
    {
        Title :data.title,
        Description:data.desc,
        Pin:data.pin,
        UserId:user.id
    }
    return this.httpService.post(`${environment.baseurl}/api/AddNotes`,param,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }

  getNotes()
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
    return this.httpService.get(`${environment.baseurl}/api/GetNotes?userId=${user}`,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
}
