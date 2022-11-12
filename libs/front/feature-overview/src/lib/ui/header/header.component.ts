import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/yyyy',
  },
  display: {
    dateInput: 'MMM yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'ispent-overview-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HeaderComponent {
  @Output() dateChange = new EventEmitter<Date>();

  date = new FormControl(new Date());
  minDate = new Date('1991-01-01');
  maxDate = new Date();

  @ViewChild(MatDatepicker<Date>) private datePickerChild!: MatDatepicker<Date>;

  onSetMonth(date: Date) {
    this.date.setValue(date);
    this.dateChange.emit(date);
    this.datePickerChild.close();
  }
}
