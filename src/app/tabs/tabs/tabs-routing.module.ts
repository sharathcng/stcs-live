import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home-tab',
        loadChildren: () => import('../home-tab/home-tab.module').then(m => m.HomeTabPageModule)
      },
      {
        path: 'my-class-tab',
        loadChildren: () => import('../my-class-tab/my-class-tab.module').then(m => m.MyClassTabPageModule)
      },
      {
        path: 'account-tab',
        loadChildren: () => import('../account-tab/account-tab.module').then(m => m.AccountTabPageModule)
      },
      {
        path: 'attendance-tab',
        loadChildren: () => import('../attendance-tab/attendance-tab.module').then(m => m.AttendanceTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
