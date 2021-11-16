import { MonthActivityModel } from "./month-activity-model";

export class MonthActivityViewModel{
    monthActivityModels: Array<Array<MonthActivityModel>>;
    sheets: Array<string>;
    isEmpty: boolean;
    errorMessage: string;
}