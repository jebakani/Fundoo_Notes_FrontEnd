import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/Service/DatsSharingService/data-sharing.service';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  deleteicon:boolean=false
  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private labelService:LabelserviceService,
    private snackBar: MatSnackBar,
    private statusdata:DataSharingService

  ) { }

  ngOnInit(): void {
    console.log(this.data.labels)
    this.statusdata.currentStatus.subscribe((status: boolean) => 
    {
      if(status==true)
      {
        this.statusdata.changeStatus(false);
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
  onClickDeleteLabel(label:any)
  {
     this.labelService.DeleteLabel(label.labelId).
     subscribe((result:any)=>
     {
       console.log(result);
     });
     this.statusdata.changeStatus(true);
     this.ngOnInit();
  }
  onClickCreateLabel(label:any)
  {
    this.labelService.create(label.name).
    subscribe((result:any)=>
    {
      console.log(result);
    });
     this.data.name="";
     this.statusdata.changeStatus(true);

  }
  onNoClick(): void {
    if(this.data.name!=null)
    {
      this.onClickCreateLabel(this.data);
    }
    this.dialogRef.close();
  }
  editLabel(label:any)
  {
    this.labelService.editLabel(label,label.labelName).
    subscribe((result:any)=>
    {
      console.log(result);
    });
    this.statusdata.changeStatus(true);
  }
}
