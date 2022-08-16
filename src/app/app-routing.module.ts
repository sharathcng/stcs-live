import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  // {
  //   path: '',
  //   redirectTo: 'splash',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./faculty/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs/tabs.module').then( m => m.TabsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
