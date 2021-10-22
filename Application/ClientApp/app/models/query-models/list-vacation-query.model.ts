import { ListVacation } from "../list-vacation.model";
import { BaseQueryModel } from "./base-query.model";

export class ListVacationQueryModel extends BaseQueryModel<ListVacation>{
    userId: number;
}