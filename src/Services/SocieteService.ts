import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Societe } from 'src/Models/Societe';
@Injectable({
    providedIn: 'root'
  })
export class SocieteService{
baseUrl="/api/base";

    constructor(private http:HttpClient) { }
   
    register(societe:Societe){
        return  this.http.post(this.baseUrl+"/AjoutSociete",societe);
      }
    login(email:String,rne:String){
        return  this.http.get(this.baseUrl+"/login?email="+email+"&rne="+rne);
    }
    DemanderAutorisation(adresse:string,tel:number,cin:number,nom:string,prenom:string,societe:Societe){
      return  this.http.post(this.baseUrl+"/DemanderAutorisation?adresse="+adresse+"&tel="+tel+"&cin="+cin+"&nom="+nom+"&prenom="+prenom,societe,{responseType: 'text'});
    }
    DemandesEncours(){
      return  this.http.get(this.baseUrl+"/DemandesEncours");
    }
    repondreDemande(societe:any,reponse:String){
      return  this.http.post(this.baseUrl+"/repondreDemande?reponse="+reponse,societe);
    }
}