import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceTabPage } from './attendance-tab.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceTabPageRoutingModule {}
