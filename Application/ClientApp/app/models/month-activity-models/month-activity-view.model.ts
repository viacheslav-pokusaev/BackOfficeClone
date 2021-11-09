import { MonthActivityModel } from "./month-activity-model";

export class MonthActivityViewModel{
    MonthActivityModels: Array<Array<MonthActivityModel>>;
    Sheets: Array<string>;
    IsEmpty: boolean;
    IsAll:boolean;
}