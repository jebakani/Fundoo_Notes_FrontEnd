import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  icon="view_list";
  userName="";
  email="";
  value="side";
  opened=true;
  isExpanded=false;
  constructor(
    private router: Router
  ) { }
  
  ngOnInit(): void {

    var data=localStorage.getItem('UserDataFundoo')!;
    this.email=JSON.parse(data).Email;
    this.userName=JSON.parse(data).FirstName+ " " +JSON.parse(data).LastName;
  }
  LogOut()
  {
    localStorage.removeItem('UserDataFundoo');
    this.router.navigateByUrl('/login');
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
