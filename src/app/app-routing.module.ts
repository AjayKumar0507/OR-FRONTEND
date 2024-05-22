import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobsComponent } from './jobs/jobs.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddJobComponent } from './add-job/add-job.component';
import { EmployersListComponent } from './employers-list/employers-list.component';
import { GraduatesListComponent } from './graduates-list/graduates-list.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';

const routes: Routes = [

  {path:'',component:WelcomeComponent},
  {path:'login',component:LogInComponent},
  {path:'signup',component:SignUpComponent},
  {path:'footer',component:FooterComponent},
  {path:'job-application',component:JobApplicationComponent},
  {path:'jobs',component:JobsComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'add-job',component:AddJobComponent},
  {path:'employers-list',component:EmployersListComponent},
  {path:'graduates-list',component:GraduatesListComponent},
  {path:'employer-jobs',component:EmployerJobsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
