import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  email: string | undefined;
  colur=false;
  notecolor='#fafafa';
  isArchive:any;
  image=false;
  remainder!:string
  file: any;
  labels: any;
  labelname!:string
  ;
  dateAndTime!:string;
  public date = new Date();
  pickers:boolean=false;
  archive='archive_outline';
  constructor(
    public dialog: MatDialog,
    private noteService:NoteServiceService,
    private snackBar: MatSnackBar,
    private labelService:LabelserviceService
  ) { }
  @Input() create!:any;
 @Input() note:any;
 id!:number;
  ngOnInit(): void {

    if(this.create)
    {
       this.isArchive=false;
    }
    else
    {
      this.isArchive=this.note.archieve;
    }
    this.GetLabel();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCollaboratorComponent, {
      width: '30%',
      height:'auto',
      data: {
            noteId:this.note.notesId,
            email: this.email
          },
      panelClass: 'custom-col-dialogue'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }
  arrayOfColors = [
    [
      { color: "white", name: "white" },
      { color: "red", name: "red" },
      { color: "rgb(255, 153, 0)", name: "orange" },
      { color: "rgb(200, 232, 104)", name: "yellow" },
    ],
    [
      
      { color: "rgb(97, 191, 82)", name: "green" },
      {color:"rgb(185, 247, 238)",name:"teal"},
      { color: "rgb(153, 221, 255)", name: "light blue" },
      { color: "darkblue", name: "darkblue" },
     
    ],
    [

      { color: "purple", name: "purple" },
      { color: "deeppink", name: "pink" },
      { color: " brown", name: "brown" },
      { color: "slategray", name: "grey" },
    ]
  ]
  setArchive()
  {
    console.log(this.note);
    if(this.isArchive==true)
    {
    this.noteService.setArchive(this.note.notesId).subscribe((result : any) =>{
        console.log(result)
        this.openSnackBar(result.message , 'ok');
      });
        
    }
    else
    {
      this.noteService.unarchive(this.note.notesId).subscribe((result : any) =>{
        console.log(result)
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
      
   });
    }
  
  }
  setColor(color: any){
    if(this.note==null)
    {
      this.notecolor=color;
      console.log(this.notecolor)
    }
    else
    {
    console.log(this.note,color)
    this.noteService.colorNote(this.note.notesId,color).subscribe((result:any) =>{
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
    
 });
  }
  }
  MoveToTrash()
  {
    this.noteService.MoveToTrash(this.note.notesId).subscribe((result : any) =>{
      console.log(result)
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
    
 });
  }
  onFileChanged(event:any) {
    var files: File = event.target.files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload =(event:any)=>{
      this.image = event.target.result;
    console.log(files);
     const formData = new FormData();
      formData.append('image', files,files.name);
      console.log(formData);
      this.file = formData;
      this.AddImage();
  }
    
  }
  AddImage()
  {
    this.noteService.AddImage(this.note.notesId,this.file).
    subscribe((result:any)=>{
      console.log(result);
    });
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }
  setRemainder(remainderstr:string)
  {
     if(this.note==null)
     {
         this.remainder=remainderstr;
     }
     else
     {
      this.noteService.AddRemainder(this.note.notesId,remainderstr).
      subscribe((result:any)=>{
        console.log(result);
      });
     }
  }
  GetLabel()
  {
    this.labelService.getAlllabel().subscribe(
      (result:any) => {
        console.log(result);
        this.labels=result.data;
        console.log(this.labels);

    })
  }
  addlabel(label:any)
  {
    this.labelService.addlabel(label,this.note.notesId).subscribe(
      (result:any) => {
        console.log(result);
    });
    this.labelname="";
  }
  addExistinglabellabel(label:any)
  {
    this.labelService.addExistinglabel(label,this.note.notesId).subscribe(
      (result:any) => {
        console.log(result);
    });
    this.labelname="";
  }
}
