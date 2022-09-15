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
  },
  {
    path: 'batches',
    loadChildren: () => import('./academic/batches/batches.module').then( m => m.BatchesPageModule)
  },
  {
    path: 'classes/:id',
    loadChildren: () => import('./academic/classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'students/:year/:id',
    loadChildren: () => import('./academic/students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'student-profile/:id',
    loadChildren: () => import('./profile/student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./faculty/teachers/teachers.module').then( m => m.TeachersPageModule)
  },
  {
    path: 'teacher-profile/:id',
    loadChildren: () => import('./profile/teacher-profile/teacher-profile.module').then( m => m.TeacherProfilePageModule)
  },
  {
    path: 'staff-profile/:id',
    loadChildren: () => import('./profile/staff-profile/staff-profile.module').then( m => m.StaffProfilePageModule)
  },
  {
    path: 'staffs',
    loadChildren: () => import('./faculty/staffs/staffs.module').then( m => m.StaffsPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
