import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {

  data1=JSON.parse(localStorage.getItem('UserDataFundoo')!);
  owner=this.data1.Email;
  ownername=this.data1.FirstName+" "+this.data1.LastName;
  constructor(  
    public dialogRef: MatDialogRef<AddCollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data.id);
  }
}
