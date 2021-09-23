import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';

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
  getnotes="Notes";
  labels:any;
  opened=true;
  noteLabel:any;
  isExpanded=false;
  constructor(
    private router: Router,
    private labelService:LabelserviceService
  ) { }
  
  ngOnInit(): void {

    var data=localStorage.getItem('UserDataFundoo')!;
    this.email=JSON.parse(data).Email;
    this.userName=JSON.parse(data).FirstName+ " " +JSON.parse(data).LastName;
    this.GetLabel();
  }
  LogOut()
  {
    localStorage.removeItem('UserDataFundoo');
    this.router.navigateByUrl('/login');
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
