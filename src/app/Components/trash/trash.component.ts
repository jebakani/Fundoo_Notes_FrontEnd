import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes!:any;
  constructor(
    private NoteService:NoteServiceService
  ) { }

  ngOnInit(): void {
    this.getTrash();
  }
  getTrash()
  {
    this.NoteService.GetTrash()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
    });
  }
}
