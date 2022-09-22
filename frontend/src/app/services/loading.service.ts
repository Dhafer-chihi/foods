import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadidingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  showLoading() {
    this.isLoadidingSubject.next(true);
  }
  hideLoading() {
    this.isLoadidingSubject.next(false);
  }
  get isLoading() {
    return this.isLoadidingSubject.asObservable();
  }
}
