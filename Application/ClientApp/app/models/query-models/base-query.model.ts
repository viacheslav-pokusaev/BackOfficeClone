export class BaseQueryModel<T>{
    
    public Skip:number;

    public Take?:number;

    public SortBy:string;

    public SortDescBy:string;

    public Result:T[];

    public TotalCount:number; 
}