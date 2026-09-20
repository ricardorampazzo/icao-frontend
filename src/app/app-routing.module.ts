import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesPageComponent } from './features/modules/modules-page.component';
import { LessonsPageComponent } from './features/lessons/lessons-page.component';
import { CoursesPageComponent } from './features/courses/courses-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

const routes: Routes = [
{ path: '', component: HomeComponent },

{ path: 'login', component: LoginComponent, canActivate: [guestGuard] },

{ path: 'courses', component: CoursesPageComponent, canActivate: [authGuard] },

// antes: courses/:courseCode/modules
{ path: 'courses/:courseId/modules', component: ModulesPageComponent, canActivate: [authGuard] },

{ path: 'modules/:moduleId', component: LessonsPageComponent, canActivate: [authGuard] },

{ path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
