import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-get-all-notes',
  templateUrl: './get-all-notes.component.html',
  styleUrls: ['./get-all-notes.component.scss']
})
export class GetAllNotesComponent implements OnInit {

  notes:any;
  pinNote:any;
  isPinned=false;
  constructor(
    private NoteService:NoteServiceService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }
  
  getNotes()
  {
    this.NoteService.getNotes()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
    });
  }
}
