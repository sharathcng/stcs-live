import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyClassTabPageRoutingModule } from './my-class-tab-routing.module';

import { MyClassTabPage } from './my-class-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyClassTabPageRoutingModule
  ],
  declarations: [MyClassTabPage]
})
export class MyClassTabPageModule {}
