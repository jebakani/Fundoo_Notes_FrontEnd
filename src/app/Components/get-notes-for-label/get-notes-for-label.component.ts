import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-get-notes-for-label',
  templateUrl: './get-notes-for-label.component.html',
  styleUrls: ['./get-notes-for-label.component.scss']
})
export class GetNotesForLabelComponent implements OnInit {

 @Input() labels:any
 notes:any
  constructor(
    private labelService:LabelserviceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private NoteService:NoteServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.labels)
    this.getLabel();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
  getLabel()
  {
    console.log(this.labels)
    this.labelService.getLabelNotes(this.labels.labelId)
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
      height:'auto',
      data: { note  },
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  RemoveRemainder(note:any)
  {
    this.NoteService.RemoveRemainder(note.notesId).
    subscribe((result:any)=>
    {
      console.log(result);
      this.openSnackBar(result.message , 'ok');
    },
    (error:HttpErrorResponse) => { 
    if(!error.error.status){            
       this.openSnackBar(error.error.message , '');
    }
    else
    {
      this.openSnackBar('Unsuccessfull , Try again!' , '');
    }
    
 })
    this.ngOnInit();
  }
}
