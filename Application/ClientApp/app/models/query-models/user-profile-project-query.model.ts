import { BaseQueryModel } from "./base-query.model";
import { UserProfileProject } from "../user-profile-project.model";

export class UserProfileProjectQueryModel extends BaseQueryModel<UserProfileProject>{
    
    public ProjectId: number;

    public UserProfileId: number;
}