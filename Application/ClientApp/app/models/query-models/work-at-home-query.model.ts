import { BaseQueryModel } from "./base-query.model";
import { WorkAtHome } from "../work-at-home.model";

export class WorkAtHomeQueryModel extends BaseQueryModel<WorkAtHome>{
    public  CommentContain: string;

    public UserId: number;
}