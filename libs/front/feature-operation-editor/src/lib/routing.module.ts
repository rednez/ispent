import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPageComponent } from './editor-page/editor-page.component';

const routes: Routes = [
  {
    path: 'new',
    component: EditorPageComponent,
    title: 'New Operation',
  },
  {
    path: ':id',
    component: EditorPageComponent,
    title: 'Edit Operation',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
