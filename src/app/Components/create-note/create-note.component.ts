import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  NoteForm!:FormGroup
  create=false;
  data="remaindermenu";
  isPinned=false;
  email: string | undefined;
  notecolor: 'white' | undefined;
  @ViewChild(IconsComponent) icon: any;

  constructor(
    private noteService:NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
     this.NoteForm=new  FormGroup(
     {
      title: new FormControl(),
      desc:new FormControl(),
  });
}
  createNote()
  {
    var data={
      title : this.NoteForm.value.title,
      desc :this.NoteForm.value.desc,
      archive:this.icon.isArchive,
      pin:this.isPinned,
      color:this.icon.notecolor
    }
    console.log(data.archive);
    console.log(data.color)
  this.noteService.createNote(data).subscribe
  ((result:any)=>{
  this.openSnackBar(result.message , '');
  console.log(result);
  this.NoteForm.reset();
  this.create=false
  }
  );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      verticalPosition:'bottom',
      horizontalPosition:'start',
      duration: 2000
    }
    );
  }
  autogrow(){
    let  textArea = document.getElementById("textarea")!;       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

}
