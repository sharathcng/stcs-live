import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceTabPageRoutingModule } from './attendance-tab-routing.module';

import { AttendanceTabPage } from './attendance-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceTabPageRoutingModule
  ],
  declarations: [AttendanceTabPage]
})
export class AttendanceTabPageModule {}
