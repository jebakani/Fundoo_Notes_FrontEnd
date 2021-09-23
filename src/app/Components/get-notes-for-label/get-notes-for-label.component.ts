import { Component, Input, OnInit } from '@angular/core';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';

@Component({
  selector: 'app-get-notes-for-label',
  templateUrl: './get-notes-for-label.component.html',
  styleUrls: ['./get-notes-for-label.component.scss']
})
export class GetNotesForLabelComponent implements OnInit {

 @Input() labels:any
 notes:any
  constructor(
    private labelService:LabelserviceService
  ) { }

  ngOnInit(): void {
    this.getLabel();
  }
  getLabel()
  {
    console.log(this.labels)
    this.labelService.getLabelNotes(this.labels.labelId)
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
    });
  }
}
