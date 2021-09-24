import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data.labels)
    
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
     this.ngOnInit();
  }
  onClickCreateLabel(label:any)
  {
    this.labelService.create(label.name).
    subscribe((result:any)=>
    {
      console.log(result);
    });
     this.data.name=""
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
  }
}
