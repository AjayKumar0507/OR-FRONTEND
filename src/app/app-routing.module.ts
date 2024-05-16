import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobsComponent } from './jobs/jobs.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddJobComponent } from './add-job/add-job.component';

const routes: Routes = [

  {path:'',component:WelcomeComponent},
  {path:'login',component:LogInComponent},
  {path:'signup',component:SignUpComponent},
  {path:'footer',component:FooterComponent},
  {path:'job-application',component:JobApplicationComponent},
  {path:'jobs',component:JobsComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'add-job',component:AddJobComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
