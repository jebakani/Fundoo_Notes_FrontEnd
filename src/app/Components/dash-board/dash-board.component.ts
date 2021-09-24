import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LabelserviceService } from 'src/app/Service/LabelService/labelservice.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';

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
  name: any;
  constructor(
    private router: Router,
    private labelService:LabelserviceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
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
  openDialog(): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '450px',
      height: 'auto',
      data: {
            labels:this.labels,
            name:this.name
          }
    });
  }
}
