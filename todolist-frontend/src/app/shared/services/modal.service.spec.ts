import { TestBed } from "@angular/core/testing";
import { ModalService } from "./modal.service";

describe('ModalService', () => {

  let modalService: ModalService<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ModalService]
    });

    modalService = TestBed.inject(ModalService);
  });

  it('should create an instance', () => {
    expect(modalService).toBeTruthy();
  });

  it('should open', () => {
    modalService.open('test');
    modalService.isVisible$.subscribe({
      next: (modalData) => {
        expect(modalData.visible).toBeTruthy();
        expect(modalData.data).toBe('test');
      }
    })
  });

  it('should close', () => {
    modalService.close();
    modalService.isVisible$.subscribe({
      next: (modalData) => {
        expect(modalData.visible).toBeFalsy();
      }
    })
  });
});