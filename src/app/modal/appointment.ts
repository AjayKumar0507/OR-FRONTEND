import { Role } from "./role";

export class Appointment {
    jobId !: number;
    fullName !: string;
    email !: string;
    phoneNo !: string;
    college !: string;
    collegeAddress !: string;
    yearOfPassing !: string;
    percentage !: string;
    skills !: string;
    project !: string;
    resume !: null;
    rolea !: Role
}
