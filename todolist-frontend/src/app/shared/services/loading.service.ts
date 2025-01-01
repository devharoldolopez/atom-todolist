import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CommonConstants } from "../../constants/general/app.constants";

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(CommonConstants.FALSE_VALUE);
  loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(CommonConstants.TRUE_VALUE);
  }

  hide(): void {
    this.loadingSubject.next(CommonConstants.FALSE_VALUE);
  }
}