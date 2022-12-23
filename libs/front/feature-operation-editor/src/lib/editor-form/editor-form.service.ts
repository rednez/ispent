import { Injectable } from '@angular/core';
import { isNaN, round } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class EditorFormService {
  computeWithdrawalRate(
    operationAmount: number | string,
    withdrawalAmount: number | string
  ): number {
    const oAmount =
      typeof operationAmount === 'string'
        ? parseFloat(operationAmount)
        : operationAmount;
    const wAmount =
      typeof withdrawalAmount === 'string'
        ? parseFloat(withdrawalAmount)
        : withdrawalAmount;

    if (isNaN(oAmount) || isNaN(wAmount) || !oAmount) {
      return 0;
    }

    return round(wAmount / oAmount, 4);
  }
}
