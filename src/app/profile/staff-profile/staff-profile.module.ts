import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffProfilePageRoutingModule } from './staff-profile-routing.module';

import { StaffProfilePage } from './staff-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffProfilePageRoutingModule
  ],
  declarations: [StaffProfilePage]
})
export class StaffProfilePageModule {}
