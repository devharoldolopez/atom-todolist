import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: Date | string): string | null {
    return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm:ss');
  }

}
