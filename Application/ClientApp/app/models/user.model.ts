import { UserProfileProject } from "./user-profile-project.model";

export class User {
    UserProfileId: number;

    DateBirthday: Date; 

    DateBeginWork?: Date;

    DateBeginTrialWork?: Date;

    Comment: string;

    ApplicationUserId: number;

    FirstName: string;

    LastName: string;

    Email: string;

    Phone: string;

    Password: string;

    Role: string;

    Skype: string;

    CountAvailableVacationDay: number;

    ProjectsCount: number;

    Avatar: string;

    ResidentialAddress: string;

    Skills: string;

    Hobbies: string;

    Wishes: string;
}