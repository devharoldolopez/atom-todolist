import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalData } from "../interfaces/modal-data.interface";


@Injectable({ providedIn: 'root' })
export class ModalService<T> {
  private isVisibleSubject = new BehaviorSubject<ModalData<T|null>>({
    visible:false
  });

  isVisible$ = this.isVisibleSubject.asObservable();

  open(data:T|null): void {
    this.isVisibleSubject.next({
      visible:true,
      data
    });
  }

  close(): void {
    this.isVisibleSubject.next({
      visible: false
    });
  }

}