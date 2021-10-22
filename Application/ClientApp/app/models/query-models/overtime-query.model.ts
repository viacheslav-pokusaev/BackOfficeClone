import { BaseQueryModel } from "./base-query.model";
import { Overtime } from "../overtime.model";

export class OvertimeQueryModel extends BaseQueryModel<Overtime>{
    public  CommentContain: string;

    public UserId: number;
}