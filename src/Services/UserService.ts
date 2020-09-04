import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class UserService{
baseUrl="/api";

    constructor(private http:HttpClient) { }
   
    tryLogin(login:String, password :string){
        return  this.http.get(this.baseUrl+"/user?login="+login+"&password="+password);
      }
}