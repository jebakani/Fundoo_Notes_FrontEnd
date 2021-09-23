import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../httpServices/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorserviceService {

  constructor(
    private httpService:HttpServiceService
  ) { }
  getCollaborator(noteId:any)
  {
    return this.httpService.get(`${environment.baseurl}/api/GetCollaborator?noteId=${noteId}`,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  AddCollaborator(data:any)
  {
    var param=
    {
      NoteId:data.noteId,
      EmailId:data.email

    }
    return this.httpService.post(`${environment.baseurl}/api/AddCollaborator`,param,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  RemoveCollaborator(colId:any)
  {
    return this.httpService.post(`${environment.baseurl}/api/RemoveCollaborator?collaboratorId=${colId}`,null,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
}
