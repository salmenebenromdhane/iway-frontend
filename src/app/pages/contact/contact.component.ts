import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { SocieteService } from 'src/Services/SocieteService';
import { MatStepper, MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { EmployeService } from 'src/Services/EmployeService';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  admin:any;
 singleDemand:boolean;
 demande:any;
  responsable:any;
  effectif=[];
  nbDemandes=0
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
 ELEMENT_DATA: any[] = [];
  dataSource = [];
  constructor(public formBuilder: FormBuilder,public router:Router, public snackBar: MatSnackBar,private employeService : EmployeService, private societeService:SocieteService,private appService:AppService) { }
  listeDemandes:any=[]
  ngOnInit() {
    this.admin=JSON.parse(localStorage.getItem('Admin'))
    console.log(this.admin)
    if(this.admin==null){
      this.router.navigateByUrl('/')
    }
    this.singleDemand=true;
    this.societeService.DemandesEncours().subscribe(res=>{this.listeDemandes=JSON.parse(JSON.stringify(res))},
    e=>{},()=>{this.dataSource=this.listeDemandes;this.nbDemandes=this.dataSource.length;})
    
  }
  DetailsDemande(demande:any){
   
    this.effectif=demande.listeEmployes

this.employeService.TrouverResponsable(demande.id).subscribe(res=>{this.responsable=JSON.parse(JSON.stringify(res))},e=>{},()=>{
  this.singleDemand=false;
  this.demande=demande
})
  
}
repondreDemande(rep:string){
this.societeService.repondreDemande(this.demande,rep).subscribe(res=>{},e=>{},()=>{this.ngOnInit();
  this.snackBar.open('Votre réponse a été envoyé au destinataire!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
})
}
  

}
