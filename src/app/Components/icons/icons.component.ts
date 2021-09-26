import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';
import { DataSharingService } from 'src/app/Service/DatsSharingService/data-sharing.service';

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
  execute=false;
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
    private labelService:LabelserviceService,
    private statusdata: DataSharingService

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
    this.statusdata.currentStatus.subscribe((status: boolean) => 
    {
      if(status)
      {
        this.statusdata.changeStatus(false);
      }
    });
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
      { color: "rgb(242, 139, 130)", name: "red" },
      { color: "rgb(251, 188, 4)", name: "orange" },
      { color: "rgb(255, 244, 117)", name: "yellow" },
    ],
    [
      
      { color: "rgb(204, 255, 144)", name: "green" },
      {color:"rgb(167, 255, 235)",name:"teal"},
      { color: "rgb(203, 240, 248)", name: "light blue" },
      { color: "rgb(174, 203, 250)", name: "darkblue" },
     
    ],
    [

      { color: "rgb(215, 174, 251)", name: "purple" },
      { color: "rgb(253, 207, 232)", name: "pink" },
      { color: "rgb(230, 201, 168)", name: "brown" },
      { color: "rgb(232, 234, 237)", name: "grey" },
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
        this.statusdata.changeStatus(true);

      });
        
    }
    else
    {
      this.noteService.unarchive(this.note.notesId).subscribe((result : any) =>{
        console.log(result)
        this.openSnackBar(result.message , 'ok');
        this.statusdata.changeStatus(true);

      },
      (error:HttpErrorResponse) => { 
      if(!error.error.status){            
         this.openSnackBar(error.error.message , '');
         this.statusdata.changeStatus(true);

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
      console.log(this.notecolor);
      this.statusdata.changeStatus(true);
    }
    else
    {
    console.log(this.note,color)
    this.noteService.colorNote(this.note.notesId,color).subscribe((result:any) =>{
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
 });
  }
  }
  MoveToTrash()
  {
    this.noteService.MoveToTrash(this.note.notesId).subscribe((result : any) =>{
      console.log(result)
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
    
 });
  }
  onFileChanged(event:any) {
    var files: File = event.target.files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload =(event:any)=>{
      this.image = event.target.result;
      const formData = new FormData();
      formData.append('image', files,files.name);
      this.file = formData;
      console.log(this.note.notesId);
      this.AddImage();
  }
    
  }
  AddImage()
  {
    console.log(this.note.notesId)
    this.noteService.AddImage(this.note.notesId,this.file).
    subscribe((result:any)=>{
    console.log(result);
    this.statusdata.changeStatus(true);
    this.execute=false;
    });
  }
  AddImage1(){
    if(this.execute == true){
      return;
    }
    this.execute = true;

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
         this.statusdata.changeStatus(true);
 
     }
     else
     {
      this.noteService.AddRemainder(this.note.notesId,remainderstr).
      subscribe((result:any)=>{
        console.log(result);
        this.statusdata.changeStatus(true);

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
    this.statusdata.changeStatus(true);

  }
  addExistinglabellabel(label:any)
  {
    this.labelService.addExistinglabel(label,this.note.notesId).subscribe(
      (result:any) => {
        console.log(result);
    });
    this.labelname="";
    this.statusdata.changeStatus(true);

  }
}
