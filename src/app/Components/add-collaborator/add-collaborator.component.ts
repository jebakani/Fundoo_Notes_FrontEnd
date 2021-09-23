import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorserviceService } from 'src/app/Service/CollaboratorService/collaboratorservice.service';

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {

  data1=JSON.parse(localStorage.getItem('UserDataFundoo')!);
  owner=this.data1.Email;
  ownername=this.data1.FirstName+" "+this.data1.LastName;
  collaboratorList:any;
  constructor(  
    public dialogRef: MatDialogRef<AddCollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private collaboratorservice:CollaboratorserviceService
    ) { }

  ngOnInit(): void {
    this.getCollaborator(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getCollaborator(data:any)
  {
    this.collaboratorservice.getCollaborator(data.noteId)
    .subscribe((result : any)=>
    {
       console.log(result);
       this.collaboratorList=result.data;
       console.log(this.collaboratorList);
    });
  }
  Addcollaborator()
  {
    this.collaboratorservice.AddCollaborator(this.data)
    .subscribe((result : any)=>
    {
       console.log(result);
    this.ngOnInit();
      this.data.email="";
    });
  }
  Removecollaborator(col:any)
  {
    console.log(col);
    this.collaboratorservice.RemoveCollaborator(col.colId).subscribe((result:any)=>
    {
      console.log(result);
      this.ngOnInit();
    });
  
  }
}
