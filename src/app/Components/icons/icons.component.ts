import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  email: string | undefined;
  colur=false;
  isArchive =false;
  note:any
  archive='archive_outline'
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCollaboratorComponent, {
      width: '30%',
      height:'40%',
      data: {email: this.email,
          }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }
  arrayOfColors = [
    [
      { color: "white", name: "white" },
      { color: "red", name: "red" },
      { color: "rgb(255, 153, 0)", name: "orange" },
      { color: "rgb(200, 232, 104)", name: "yellow" },
    ],
    [
      
      { color: "rgb(97, 191, 82)", name: "green" },
      {color:"rgb(185, 247, 238)",name:"teal"},
      { color: "rgb(153, 221, 255)", name: "light blue" },
      { color: "darkblue", name: "darkblue" },
     
    ],
    [

      { color: "purple", name: "purple" },
      { color: "deeppink", name: "pink" },
      { color: " brown", name: "brown" },
      { color: "slategray", name: "grey" },
    
     
    ]
  ]
}
