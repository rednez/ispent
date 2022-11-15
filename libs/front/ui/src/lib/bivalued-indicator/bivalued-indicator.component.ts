import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ispent-bivalued-indicator',
  templateUrl: './bivalued-indicator.component.html',
  styleUrls: ['./bivalued-indicator.component.scss'],
})
export class BiValuedIndicatorComponent implements OnInit {
  @Input() primaryAmount = 0;
  @Input() secondaryAmount = 0;
  @Input() primaryColor = '#4dd22f';
  @Input() secondaryColor = '#f61212';

  primaryLineWidth = 0;
  secondaryLineWidth = 0;

  ngOnInit(): void {
    if (
      !this.primaryAmount ||
      (this.primaryAmount && this.primaryAmount < this.secondaryAmount)
    ) {
      this.primaryLineWidth = 0;
      this.secondaryLineWidth = 100;
    } else {
      this.secondaryLineWidth =
        this.secondaryAmount / (this.primaryAmount / 100);
      this.primaryLineWidth = 100 - this.secondaryLineWidth;
    }
  }

  setPrimaryLineStyle() {
    return {
      width: this.primaryLineWidth + '%',
      backgroundColor: this.primaryColor,
    };
  }

  setSecondaryLineStyle() {
    return {
      width: this.secondaryLineWidth + '%',
      backgroundColor: this.secondaryColor,
      borderRadius:
        this.secondaryAmount >= this.primaryAmount ? '4px' : '4px 0 0 4px',
    };
  }
}
