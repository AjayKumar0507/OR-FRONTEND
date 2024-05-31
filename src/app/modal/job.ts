import { Role } from "./role";

export class Job {
    jobName !: string;
    jobType !: string;
    jobDescription !: string;
    jobSalary !: string;
    company !: string;
    jobLocation !: string;
    jobVacancy !: string;
    roles !: Role
}
