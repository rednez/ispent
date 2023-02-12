import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorFormService {
  computeWithdrawalRate(
    operationAmount: number | string,
    withdrawalAmount: number | string
  ): number {
    const precision = 10000;
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

    return Math.round((wAmount / oAmount) * precision) / precision;
  }
}
