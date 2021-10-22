import { BaseQueryModel } from "./base-query.model";
import { SickDay } from "../sick-day.model" 

export class SickDayQueryModel extends BaseQueryModel<SickDay>{
    public  CommentContain: string;

    public UserId: number;
}