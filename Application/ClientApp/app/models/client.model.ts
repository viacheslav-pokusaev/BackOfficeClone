import { ContactPerson } from "./contact-person.model";
import { Project } from "./project.model";

export class Client {
    Id : number;

    OrganizationName: string;

    Description: string;

    ProjectsCount: number;

    ProjectId: number;

    ProjectsNames: Array<string>;

    ContactPersons: Array<ContactPerson>;

    Comment: string;

    Project: Project;
}