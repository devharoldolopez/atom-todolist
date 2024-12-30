import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  open(): void {
    this.isVisibleSubject.next(true);
  }

  close(): void {
    this.isVisibleSubject.next(false);
  }

}