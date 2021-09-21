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
        UserId:user.id
    }
    return this.httpService.post(`${environment.baseurl}/api/AddNotes`,param,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
}