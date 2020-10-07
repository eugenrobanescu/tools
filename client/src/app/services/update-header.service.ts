import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UpdateHeaderService {
  cartChange: EventEmitter<any> = new EventEmitter();
  authChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  emitUpdateDataCart() {
    this.cartChange.emit();
  }
  getUpdateDataCart() {
    return this.cartChange;
  }
  emitUpdateHeader() {
    this.authChange.emit();
  }
  getUpdateHeader() {
    return this.authChange;
  }
}
