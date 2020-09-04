import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AdminService{
baseUrl="/api/admin";

    constructor(private http:HttpClient) { }
   
  
    login(email:String,mdp:String){
        return  this.http.get(this.baseUrl+"/login?email="+email+"&mdp="+mdp);
    }
  
}