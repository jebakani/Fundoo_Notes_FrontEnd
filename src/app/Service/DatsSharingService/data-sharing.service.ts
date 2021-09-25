import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private statusSource = new BehaviorSubject(false); // set default status
  currentStatus = this.statusSource.asObservable();


  changeStatus(status: boolean) {
    this.statusSource.next(status)
  }
}
