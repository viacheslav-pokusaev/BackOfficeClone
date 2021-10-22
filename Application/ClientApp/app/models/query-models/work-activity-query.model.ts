import { BaseQueryModel } from "./base-query.model";
import { WorkActivity } from "../work-activity.model" 

export class WorkActivityQueryModel extends BaseQueryModel<WorkActivity>{
    public  CommentContain: string;

    public  NameContain: string;
}