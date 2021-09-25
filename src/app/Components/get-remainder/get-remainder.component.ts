import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/Service/DatsSharingService/data-sharing.service';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-get-remainder',
  templateUrl: './get-remainder.component.html',
  styleUrls: ['./get-remainder.component.scss']
})
export class GetRemainderComponent implements OnInit {

  notes:any
  constructor(
    private NoteService:NoteServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private statusdata:DataSharingService
  ) { }

  ngOnInit(): void {
    this.getRemainder();
    this.statusdata.currentStatus.subscribe((status: boolean) => 
    {
      if(status)
      {
        this.statusdata.changeStatus(false);
        this.getRemainder();

      }
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }
  getRemainder()
  {
    this.NoteService.getRemainder()
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
    this.statusdata.changeStatus(true);
    
 })
    this.ngOnInit();
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
  }
}
