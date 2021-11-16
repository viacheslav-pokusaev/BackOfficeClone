import { MonthActivityEditModel } from "../month-activity-models/month-activity-edit.model";
import { BaseQueryModel } from "./base-query.model";


export class MonthActivityEditQueryModel extends BaseQueryModel<MonthActivityEditModel>{
    public CommentContain: string;

    public UserId: number;
}