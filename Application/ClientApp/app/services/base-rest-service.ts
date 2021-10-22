import { Observable } from "rxjs";
import { RestInterface } from "../interfaces/rest.interface";

export abstract class BaseRestService<Model,QueryModel> implements RestInterface<Model,QueryModel>{

    constructor(protected httpClient, protected url){
    }

    public getById(id:number):Observable<Model>{
       return this.httpClient.get(this.url + "/" + id);
    }

    public get(queryModel:QueryModel):Observable<QueryModel>{
        return this.httpClient.post(this.url + "/all", queryModel);
    }

    public create(model:Model):Observable<Model>{
        return this.httpClient.post(this.url, model);
    }

    public update(model:Model):Observable<Model>{
        return this.httpClient.put(this.url, model);
    }

    public delete(id:number):Observable<any>{
        return this.httpClient.delete(this.url + "/" + id);
    }

}