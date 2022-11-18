import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  selector: 'ispent-month-date-picker',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        readonly
        [min]="minDate"
        [max]="maxDate"
        [matDatepicker]="dp!"
        [formControl]="date"
      />
      <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
      <mat-datepicker #dp startView="year" (monthSelected)="onSetMonth($event)">
      </mat-datepicker>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthDatePickerComponent {
  @Input() label = '';
  @Output() changeDate = new EventEmitter<Date>();

  @ViewChild(MatDatepicker<Date>) private datePickerChild!: MatDatepicker<Date>;

  date = new FormControl(new Date());
  minDate = new Date('1991-08-24');
  maxDate = new Date();

  onSetMonth(date: Date) {
    this.date.setValue(date);
    this.changeDate.emit(date);
    this.datePickerChild.close();
  }
}
