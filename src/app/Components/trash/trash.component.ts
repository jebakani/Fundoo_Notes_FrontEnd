import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/Service/DatsSharingService/data-sharing.service';
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
    private snackBar: MatSnackBar,
    private statusdata: DataSharingService

  ) { }

  ngOnInit(): void {
    this.getTrash();
    this.statusdata.currentStatus.subscribe((status: boolean) => 
    {
      if(status)
      {
        this.statusdata.changeStatus(false);
      }
    })
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
      this.statusdata.changeStatus(true);
       
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
      this.statusdata.changeStatus(true);
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
      this.statusdata.changeStatus(true);
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
