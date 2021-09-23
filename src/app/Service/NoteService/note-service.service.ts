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
        Archieve:data.archive,
        UserId:user.id,
        Color:data.color
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
  getArchive()
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
    return this.httpService.get(`${environment.baseurl}/api/GetArchive?userId=${user}`,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  getRemainder()
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
    return this.httpService.get(`${environment.baseurl}/api/GetRemainder?userId=${user}`,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  colorNote(noteid:number,color:string)
  {
    console.log(noteid);
    console.log(color);
    return this.httpService.put(`${environment.baseurl}/api/UpdateColor?noteId=${noteid}&color=${color}`,null,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  setArchive(noteid:number)
  {
    return this.httpService.put(`${environment.baseurl}/api/MoveToArchieve?noteId=${noteid}`,null,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  unarchive(noteid:number)
  {
    return this.httpService.put(`${environment.baseurl}/api/UnArchive?noteId=${noteid}`,null,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  updateNote(data:any)
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!);
    const param= 
    {
      Title :data.title,
        Description:data.description,
        Notes:data.note.notesId
    }
    return this.httpService.put(`${environment.baseurl}/api/UpdateNote`,param,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  MoveToTrash(noteid:number)
  {
    return this.httpService.put(`${environment.baseurl}/api/MoveToTrash?noteId=${noteid}`,null,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
}
