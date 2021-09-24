import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../httpServices/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class LabelserviceService {

  constructor(
    private httpService:HttpServiceService
  ) { }
  
  getAlllabel()
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
    return this.httpService.get(`${environment.baseurl}/api/GetLabelForUser?userId=${user}`,true,
    {
      headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
    });
  }
  getLabelNotes(labelid:number)
  {
    var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
  return this.httpService.get(`${environment.baseurl}/api/GetNotesByLabel?labelId=${labelid}&UserId=${user}`,true,
  {
    headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
  });
}
GetLabelForNotes(noteId:number)
{
return this.httpService.get(`${environment.baseurl}/api/GetLabelByNoteId?noteId=${noteId}`,true,
{
  headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
});
}
 DeleteLabel(labelid:number)
 {
  var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;

  return this.httpService.delete(`${environment.baseurl}/api/DeleteLabel?labelid=${labelid}&userid=${user}`,true,
  {
    headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
  });
 }
 UpdateLabel(label:any)
 {
  var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
   
    var param=
    {
      LabelName:label.labelName,
      UserId:user,
      NoteId:label.noteId
    }
    
  return this.httpService.put(`${environment.baseurl}/api/UpdateLabel`,param,true,
  {
    headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
  });
 }
 create(label:any)
 {
  var user = JSON.parse(localStorage.getItem('UserDataFundoo')!).id;
   
    var param=
    {
      LabelName:label,
      UserId:user
    }
    
  return this.httpService.post(`${environment.baseurl}/api/CreateLabel`,param,true,
  {
    headers: {Authorization:"Bearer "+JSON.parse(localStorage.getItem('UserDataFundoo')!).Token}
  });
 }
}
