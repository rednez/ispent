import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActionsService,
  CategoryService,
  CurrencyService,
  GroupService,
  CreateOperationGQL,
  CurrenciesGQL,
  CurrenciesGroupsGQL,
  DeleteOperationGQL,
  GroupsGQL,
  OperationGQL,
  UpdateOperationGQL,
} from '@ispent/front/data-access';
import { MockProvider } from 'ng-mocks';

import { EditorPageService } from './editor-page.service';

describe('EditorPageService', () => {
  let service: EditorPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(ActionsService),
        MockProvider(CurrenciesGroupsGQL),
        MockProvider(OperationGQL),
        MockProvider(DeleteOperationGQL),
        MockProvider(UpdateOperationGQL),
        MockProvider(CreateOperationGQL),
        MockProvider(CurrenciesGQL),
        MockProvider(GroupsGQL),
        MockProvider(CurrencyService),
        MockProvider(GroupService),
        MockProvider(CategoryService),
        MockProvider(MatSnackBar),
        MockProvider(MatDialog),
      ],
    });
    service = TestBed.inject(EditorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
