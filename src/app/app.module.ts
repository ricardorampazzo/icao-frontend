// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// >>> suas páginas
import { HomeComponent } from './home/home.component';
import { ModulesPageComponent } from './features/modules/modules-page.component';
import { LessonsPageComponent } from './features/lessons/lessons-page.component';
import { CoursesPageComponent } from './features/courses/courses-page.component';

// >>> Angular Material necessários pelo Home
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptor } from './interceptors/auth.interceptor';
// (se o Home usar mat-card, importe também MatCardModule, etc.)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModulesPageComponent,
    LessonsPageComponent,
    CoursesPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    // >>> Material do Home
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
