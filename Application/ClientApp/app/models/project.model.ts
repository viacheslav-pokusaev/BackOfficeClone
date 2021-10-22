import { Client } from "./client.model";
import { User } from "./user.model";
import { UserProfileProject } from "./user-profile-project.model";

export class Project {
    Id: number

    Name: string

    DateBegin: Date;

    DateEnd: Date;

    EmploeeCount: number;

    ClientId: number;

    OrganizationName: string;

    Emploees: Array<UserProfileProject>;

    EmploeesAvatars: Array<string>;

    EmploeesPositions:  Array<string>;

    Comment: string;

    Client: Client;
}