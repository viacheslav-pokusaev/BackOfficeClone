import { BaseQueryModel } from "./base-query.model";
import { Client } from "../client.model";

export class ClientQueryModel extends BaseQueryModel<Client>{
    
    public  FirstNameContain:string;

    public  LastNameContain:string;

    public  EmailContain:string;

    public  PhoneContain:string;

    public UserId: number;
}