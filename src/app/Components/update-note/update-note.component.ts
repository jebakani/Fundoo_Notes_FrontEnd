import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private NoteService:NoteServiceService
    ) { }
  ngOnInit(): void {
  }
  updateNote()
  {
    console.log(this.data.note);
    this.NoteService.updateNote(this.data.note).subscribe((result:any)=>
    {
      console.log(result);
    });
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  autogrow(){
    let  textArea = document.getElementById("textarea")!;       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
