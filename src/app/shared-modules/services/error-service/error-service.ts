// loader.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private error = new Subject<boolean>();
  hasError = this.error.asObservable();

  constructor() { }

  triggerHasError() {
    this.error.next(true);
  }

  triggerHasNoError() {
    this.error.next(false);
  }
}
