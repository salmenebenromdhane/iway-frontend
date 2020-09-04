import { Operator } from "./Operator";

export class Prospect{
    id : number;
    disabled : boolean;
    registerDate : Date;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    phone : number;
    customer : boolean;
    claimsprospects : [];
    basketprospects : [];
    operator : Operator;
    purchases : [];
    bills : [];
    confirmed : boolean;

    
}