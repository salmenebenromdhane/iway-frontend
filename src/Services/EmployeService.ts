import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Societe } from 'src/Models/Societe';
import { Administrateur } from 'src/Models/Administrateur';
@Injectable({
    providedIn: 'root'
  })
export class  EmployeService{
baseUrl="/api/base";
user:Societe=new Societe();
admin:Administrateur=new Administrateur();
 headers = new Headers();
    constructor(private http:HttpClient) { }
    
    TrouverResponsable(id:number){
        this.user=JSON.parse(localStorage.getItem('User'))
        if(this.user==null){
            this.admin=JSON.parse(localStorage.getItem('Admin'))
            let httpHeaders = new HttpHeaders({
                'Authorization': 'Bearer '+this.admin.token
           }); 
           var options = {
            headers: httpHeaders
           };
        }
        else{
            let httpHeaders = new HttpHeaders({
                'Authorization': 'Bearer '+this.user.token
           }); 
           var options = {
            headers: httpHeaders
           };
        }
    
        return  this.http.get(this.baseUrl+"/TrouverResponsable?id="+id,options);
    }
   
}