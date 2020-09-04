import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Societe } from 'src/Models/Societe';
import { SocieteService } from 'src/Services/SocieteService';
import { last } from 'rxjs/operators';
import { Router, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  ministeres = [];
  secteursActivites = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  nbEmploye=['1'];
  listeEmployes=[];
  msg:string;

  user:Societe=new Societe()
  societe:Societe=new Societe()
  constructor(public appService:AppService,public snackBar: MatSnackBar,private elementRef: ElementRef,public societeService:SocieteService, public formBuilder: FormBuilder,private router :Router) { }

  ngOnInit() {

    this.user=JSON.parse(localStorage.getItem('User'))
    if(this.user==null) this.router.navigateByUrl('/')
    //console.log(this.user[0])
    if(this.user.etatDemande==='En cours'){
    this.router.navigateByUrl('/')
      this.snackBar.open('Votre demande est en cours de traitement!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 6000 });
         
    }
   
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.ministeres=this.appService.getMinisteres();
    this.secteursActivites=this.appService.getSecteursActivites();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({


      effectifmobilise:['',Validators.required],


    
    });
    this.deliveryForm = this.formBuilder.group({

      nom:['',Validators.required],
      prenom:['',Validators.required],
      adresse:['',Validators.required],
      cin:['',Validators.required],
      tel:['',Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
    
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
         });
  }

  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;    
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

  }

  ajouterEmploye(){
    this.nbEmploye.push('1');
  }
  RetirerEmploye(){
    if(this.nbEmploye.length>=2)
    this.nbEmploye.splice(this.nbEmploye.length-1);

  }
  EnvoyerDemande(plan){
  var resNom=[];
  var resPrenom=[];
  var resCin=[]
   this.listeEmployes=[]
   if(plan==='V'){

     resNom= this.elementRef.nativeElement.querySelectorAll('.nomv');
     resPrenom= this.elementRef.nativeElement.querySelectorAll('.prenomv');
     resCin= this.elementRef.nativeElement.querySelectorAll('.cinv');
   }
   else if(plan==='H'){

     resNom= this.elementRef.nativeElement.querySelectorAll('.nom');
     resPrenom= this.elementRef.nativeElement.querySelectorAll('.prenom');
     resCin= this.elementRef.nativeElement.querySelectorAll('.cin');
   }

    for(let i=0;i<this.nbEmploye.length;i++){
      
      var ln=resNom[i].value
      var fn=resPrenom[i].value
      var num=resCin[i].value

      var obj={
        nom:ln,
        prenom:fn,
        cin:num
      };
      this.listeEmployes.push(obj);
    }
   
    this.societe=this.user;


    this.societe.listeEmployes=this.listeEmployes;

    this.societe.nbEffectifMobilise=this.billingForm.controls.effectifmobilise.value
    var nomResponsable=this.deliveryForm.controls.nom.value
    var prenomResponsable=this.deliveryForm.controls.prenom.value
    var adresseResponsable=this.deliveryForm.controls.adresse.value
    var telResponsable=this.deliveryForm.controls.tel.value
    var cinResponsable=this.deliveryForm.controls.cin.value
    this.societeService.DemanderAutorisation(adresseResponsable,
      telResponsable,
      cinResponsable,
      nomResponsable,
      prenomResponsable,
     this.societe).subscribe(res=>{this.msg=res.toString()},e=>{console.log(e)},()=>{
      this.snackBar.open("Demande d'autorisation envoyée avec succès", '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
       this.user.etatDemande='En cours';
       localStorage.setItem('User',JSON.stringify(this.user));
     })
   
  }
 
}
