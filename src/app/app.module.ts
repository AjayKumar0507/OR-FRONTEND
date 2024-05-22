import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddJobComponent } from './add-job/add-job.component';
import { EmployersListComponent } from './employers-list/employers-list.component';
import { GraduatesListComponent } from './graduates-list/graduates-list.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    NavBarComponent,
    FooterComponent,
    JobsComponent,
    JobApplicationComponent,
    WelcomeComponent,
    AddJobComponent,
    EmployersListComponent,
    GraduatesListComponent,
    EmployerJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
