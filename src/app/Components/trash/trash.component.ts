import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes!:any;
  constructor(
    private NoteService:NoteServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTrash();
  }

  getTrash()
  {
    this.NoteService.GetTrash()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
   });
  }
  EmptyTrash()
  {
    this.NoteService.EmptyTrash()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
      this.openSnackBar(result.message , 'ok');

       this.ngOnInit();
    });
  }
  deleteForever(note:any)
  {
    this.NoteService.Deletetrash(note.notesId)
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
      this.openSnackBar(result.message , 'ok');

       this.ngOnInit();
    });
  }
  restore(note:any)
  {
    this.NoteService.Restore(note.notesId)
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
      this.openSnackBar(result.message , 'ok');

       this.ngOnInit();
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }
}
