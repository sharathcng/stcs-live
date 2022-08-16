import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyClassTabPage } from './my-class-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MyClassTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyClassTabPageRoutingModule {}
