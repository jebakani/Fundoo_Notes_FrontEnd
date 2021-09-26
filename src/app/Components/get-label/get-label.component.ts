import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/Service/DatsSharingService/data-sharing.service';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';

@Component({
  selector: 'app-get-label',
  templateUrl: './get-label.component.html',
  styleUrls: ['./get-label.component.scss']
})
export class GetLabelComponent implements OnInit {
  @Input() note:any;
  labels:any;
  label:any;
  constructor(
    private snackBar: MatSnackBar,
    private labelService:LabelserviceService,
    private statusdata:DataSharingService

  ) { }

  ngOnInit(): void {
    this.GetLabel();
    this.statusdata.currentStatus.subscribe((status: boolean) => 
    {
      if(status)
      {
        console.log(this.labels)
        this.statusdata.changeStatus(false);
        this.GetLabel();
      }
    })
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
  RemoveLabel(id:any)
  {
    this.labelService.removeLabel(id).subscribe(
      (result:any) => {
      this.openSnackBar(result.message , 'ok');

      this.statusdata.changeStatus(true);
       
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }
}
