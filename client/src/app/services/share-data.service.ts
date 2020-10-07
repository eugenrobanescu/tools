import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private dataSource = new BehaviorSubject([]);
  currentData = this.dataSource.asObservable();
  constructor() {}

  sendCategories(products: any) {
    this.dataSource.next(products);
  }
}
