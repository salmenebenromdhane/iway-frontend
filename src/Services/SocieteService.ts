import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Societe } from 'src/Models/Societe';
import { Administrateur } from 'src/Models/Administrateur';
@Injectable({
    providedIn: 'root'
  })
export class SocieteService{
baseUrl="/api/base";
user:Societe=new Societe();
admin:Administrateur=new Administrateur();
 headers = new Headers();
    constructor(private http:HttpClient) {
     
     }
   
    register(societe:Societe,adr){
        return  this.http.post(this.baseUrl+"/AjoutSociete?address="+adr,societe);
      }
    login(email:String,rne:String,role:String,address:any,s:Societe){
        return  this.http.post("/api/authenticate?username="+email+"&password="+rne+"&role="+role+"&address="+address,s,{responseType: 'text'});
    }
    DemanderAutorisation(adresse:string,tel:number,cin:number,nom:string,prenom:string,societe:Societe){
      
    
       this.user=JSON.parse(localStorage.getItem('User'))
       console.log(this.user)
       let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
         'Authorization': 'Bearer '+this.user.token
    }); 
    let options = {
     headers: httpHeaders
 };
      return  this.http.post(this.baseUrl+"/DemanderAutorisation?adresse="+adresse+"&tel="+tel+"&cin="+cin+"&nom="+nom+"&prenom="+prenom,societe,options);
    }
    DemandesEncours(){
      this.admin=JSON.parse(localStorage.getItem('Admin'))
      let httpHeaders = new HttpHeaders({
       'Authorization': 'Bearer '+this.admin.token
  }); 
  let options = {
   headers: httpHeaders
};
      return  this.http.get(this.baseUrl+"/DemandesEncours",options);
    }
    repondreDemande(societe:any,reponse:String){
      this.admin=JSON.parse(localStorage.getItem('Admin'))
      let httpHeaders = new HttpHeaders({
       'Authorization': 'Bearer '+this.admin.token
  }); 
  let options = {
   headers: httpHeaders
};
      return  this.http.post(this.baseUrl+"/repondreDemande?reponse="+reponse,societe,options);
    }
}