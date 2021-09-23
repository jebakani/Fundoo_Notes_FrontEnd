import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-get-all-notes',
  templateUrl: './get-all-notes.component.html',
  styleUrls: ['./get-all-notes.component.scss']
})
export class GetAllNotesComponent implements OnInit {

  notes:any;
  isPinned=false;
  labels:any;

  constructor(
    private NoteService:NoteServiceService,
    public dialog: MatDialog,
    private labelService:LabelserviceService
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
      width: '40%',
      height:'30%',
      data: { note  },
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getlabel(noteId:number):any
  {
    this.labelService.GetLabelForNotes(noteId).
    subscribe((result:any)=>
    {
      console.log(result);
      return result
    })
  }
}
