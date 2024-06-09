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
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { GraduateProfileComponent } from './graduate-profile/graduate-profile.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { InboxComponent } from './inbox/inbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { AcceptedAppointmentsComponent } from './accepted-appointments/accepted-appointments.component';
import { PendingAppointmentsComponent } from './pending-appointments/pending-appointments.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';

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
    JobsListComponent,
    GraduateProfileComponent,
    JobProfileComponent,
    AppointmentsComponent,
    InboxComponent,
    OutboxComponent,
    AcceptedAppointmentsComponent,
    PendingAppointmentsComponent,
    EmployerProfileComponent
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
