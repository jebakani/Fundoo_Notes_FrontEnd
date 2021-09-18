import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  icon="view_list"
  constructor() { }

  ngOnInit(): void {
  }
 
  toggleIcon()
  {
     if(this.icon=="view_list")
     {
         this.icon="grid_view";
     }
     else
     {
       this.icon="view_list";
     }
  }
}
