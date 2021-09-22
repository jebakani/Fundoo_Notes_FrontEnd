import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-get-remainder',
  templateUrl: './get-remainder.component.html',
  styleUrls: ['./get-remainder.component.scss']
})
export class GetRemainderComponent implements OnInit {

  notes:any
  constructor(
    private NoteService:NoteServiceService
  ) { }

  ngOnInit(): void {
    this.getRemainder()
  }
 
  getRemainder()
  {
    this.NoteService.getRemainder()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
    });
  }
}
