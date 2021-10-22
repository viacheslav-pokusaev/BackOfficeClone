import { BaseQueryModel } from "./base-query.model";
import { Project } from "../project.model";

export class ProjectQueryModel extends BaseQueryModel<Project>{
    
    public NameContain: string;

    public UserId: number;

    public ClientId: number;
}