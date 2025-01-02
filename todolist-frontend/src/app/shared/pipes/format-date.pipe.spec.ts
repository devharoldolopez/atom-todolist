import { TestBed } from '@angular/core/testing';
import { FormatDatePipe } from './format-date.pipe';
import { DatePipe } from '@angular/common';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe],
    });
    const datePipe = TestBed.inject(DatePipe);
    pipe = new FormatDatePipe(datePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a date correctly', () => {
    const formattedDate = pipe.transform('2025-01-01 12:34:56');
    expect(formattedDate).toBe('01/01/2025 12:34:56');
  });
});
