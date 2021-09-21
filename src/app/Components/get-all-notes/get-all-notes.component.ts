import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-get-all-notes',
  templateUrl: './get-all-notes.component.html',
  styleUrls: ['./get-all-notes.component.scss']
})
export class GetAllNotesComponent implements OnInit {

  notes=[];
  title:String | undefined;
  description: String | undefined;
  constructor(
    private NoteService:NoteServiceService
  ) { }

  ngOnInit(): void {
  }
  
  getNotes()
  {
    this.NoteService.getNotes()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
    });
  }
}
