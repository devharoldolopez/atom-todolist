import { TestBed } from "@angular/core/testing";
import { LoadingService } from "./loading.service";

describe('LoadingService', () => {

  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });

    loadingService = TestBed.inject(LoadingService);
  });

  it('should create an instance', () => {
    expect(new LoadingService()).toBeTruthy();
  });


  it('should show', () => {
    loadingService.show();
    loadingService.loading$.subscribe({
      next: (isLoading) => {
        expect(isLoading).toBeTruthy();
      }
    })
  });

  it('should hide', () => {
    loadingService.hide();
    loadingService.loading$.subscribe({
      next: (isLoading) => {
        expect(isLoading).toBeFalsy();
      }
    })
  });
});