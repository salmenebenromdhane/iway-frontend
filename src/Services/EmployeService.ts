import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Societe } from 'src/Models/Societe';
@Injectable({
    providedIn: 'root'
  })
export class  EmployeService{
baseUrl="/api/base";

    constructor(private http:HttpClient) { }
   
    TrouverResponsable(id:number){
        return  this.http.get(this.baseUrl+"/TrouverResponsable?id="+id);
    }
   
}