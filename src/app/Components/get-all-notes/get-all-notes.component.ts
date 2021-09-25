import { HttpErrorResponse } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/Service/DatsSharingService/data-sharing.service';
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
    private labelService:LabelserviceService,
    private snackBar: MatSnackBar,
    private statusdata:DataSharingService

  ) { }

  ngOnInit(): void {
    this.getNotes();

    this.statusdata.currentStatus.subscribe((status: boolean) => 
    {
      if(status==true)
      {
         this.getNotes();
         this.statusdata.changeStatus(false);
      }
      
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
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
      height:'auto',
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
      this.labels=result;
      return this.labels;
    })
  }

  pinNote(notesId:number)
  {
    this.NoteService.pinNotes(notesId).
    subscribe((result:any)=>
    {
      console.log(result);
      this.openSnackBar(result.message , 'ok');
      this.statusdata.changeStatus(true);
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
  RemoveRemainder(note:any)
  {
    this.NoteService.RemoveRemainder(note.notesId).
    subscribe((result:any)=>
    {
      console.log(result);
      this.openSnackBar(result.message , 'ok');
      this.statusdata.changeStatus(true);
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
