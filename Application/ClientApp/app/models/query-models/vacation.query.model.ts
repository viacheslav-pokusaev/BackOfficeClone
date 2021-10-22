import { BaseQueryModel } from "./base-query.model";
import { Vacation } from "../vacation.model" 

export class VacationQueryModel extends BaseQueryModel<Vacation>{
    public  CommentContain: string;

    public UserId: number;
}