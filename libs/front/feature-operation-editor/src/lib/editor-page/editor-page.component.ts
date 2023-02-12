import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Currency, Group, Operation } from '@ispent/front/data-access';
import { Subject, takeUntil } from 'rxjs';
import { SubmitEventData } from '../editor-form/editor-form.component';
import { EditorPageService } from './editor-page.service';

@Component({
  templateUrl: './editor-page.component.html',
})
export class EditorPageComponent implements OnInit, OnDestroy {
  operationId: number | null = null;
  groups: Group[] = [];
  currencies: Currency[] = [];
  operation?: Operation;
  private onDestroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: EditorPageService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.operationId = paramId ? parseInt(paramId) : null;
    this.loadData();

    this.service
      .onCreateCurrency$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();

    this.service.onCreateGroup$().pipe(takeUntil(this.onDestroy$)).subscribe();

    this.service
      .onCreateCategory$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  loadData() {
    this.service
      .fetchCurrenciesGroups()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ groups, currencies }) => {
        this.groups = groups;
        this.currencies = currencies;
      });

    if (this.operationId) {
      this.service
        .fetchOperation(this.operationId)
        .subscribe((operation) => (this.operation = operation));
    }
  }

  goBack() {
    this.location.back();
  }

  onClickDelete(id: number) {
    this.service.deleteOperation(id).subscribe(() => {
      this.goBack();
    });
  }

  onClickSubmit(data: SubmitEventData) {
    this.service.upsertOperation(data).subscribe(() => {
      this.goBack();
    });
  }

  createCurrency() {
    this.service.createCurrency();
  }

  createGroup() {
    this.service.createGroup();
  }

  createCategory(params: { parentGroupId: number }) {
    this.service.createCategory(params);
  }
}
