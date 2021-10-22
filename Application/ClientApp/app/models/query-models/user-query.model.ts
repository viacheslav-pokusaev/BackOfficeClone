import { BaseQueryModel } from "./base-query.model";
import { User } from "../user.model" 

export class UserQueryModel extends BaseQueryModel<User>{
    public  CommentContain:string;
    public  FirstNameContain:string;
    public  LastNameContain:string;
    public  EmailContain:string;
    public  PhoneContain:string;
}