import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Service/NoteService/note-service.service';

@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
export class GetArchiveComponent implements OnInit {

  notes:any;
  constructor(
    private NoteService:NoteServiceService

  ) { }

  ngOnInit(): void {
    this.getArchieve();
  }
  getArchieve()
  {
    this.NoteService.getArchive()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
    });
  }
}
