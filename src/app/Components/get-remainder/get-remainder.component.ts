import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getRemainder()
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
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
      height:'30%',
      data: { note  },
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
