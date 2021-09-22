import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

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
    private NoteService:NoteServiceService,
    public dialog: MatDialog,
    
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
  openNoteDialog(note:any): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '50%',
      height:'50%',
      data: { note  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
