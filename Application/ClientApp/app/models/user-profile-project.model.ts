import { User } from "./user.model";
import { Project } from "./project.model";

export class UserProfileProject {

    Id: number;

    FirstName: string;

    LastName: string;

    UserProfileId: number;

    Position: string;

    ProjectId: number;

    ProjectName: string;

    DateStartWork: Date;

    DateFinishWork: Date;

    Status: string;

    Comment: string;
}