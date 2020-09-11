import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { UserService } from 'src/Services/UserService';
import { Prospect } from 'src/Models/Prospect';
import { AppService } from 'src/app/app.service';
import { Societe } from 'src/Models/Societe';
import { SocieteService } from 'src/Services/SocieteService';
import { AdminService } from 'src/Services/AdminService';
import { Administrateur } from 'src/Models/Administrateur';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user : Societe= new Societe();
  roles=[];

  admin:Administrateur=new Administrateur();
  countries = [];
  ministeres = [];
  secteursActivites = [];
  societe:Societe=new Societe(); 
  objectLog:any;
  notfound:string
  constructor(public formBuilder: FormBuilder,private adminService:AdminService, public societeService:SocieteService, public appService: AppService, public router:Router, public snackBar: MatSnackBar,private us:UserService) { }

  ngOnInit() {

    this.roles=this.appService.getRoles();
    this.countries = this.appService.getCountries();
    this.ministeres=this.appService.getMinisteres();
    this.secteursActivites=this.appService.getSecteursActivites();
    this.loginForm = this.formBuilder.group({
      'rne':['',Validators.required],
      'role':['',Validators.required],
      'email': ['', Validators.compose([Validators.required, emailValidator])],

    });

    this.registerForm = this.formBuilder.group({
      'nbTotal':['',Validators.required],
      'secteur':['',Validators.required],
      'ministere':['',Validators.required],
      'governorat':['',Validators.required],
      'adresse':['',Validators.required],
      'raisonSociale':['',Validators.required],
      'matriculeFiscale':['',Validators.required],
      'rne':['',Validators.required],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
    });

  }

  public onLoginFormSubmit(values:any):void {
this.notfound="sss"
    if (this.loginForm.valid ) {

      if(values.role.name==='Société'){

        this.societeService.login(values.email,values.rne,'Societe',values.email,this.societe).subscribe(
          res=>{
            //console.log(res)
         if(res==="nf") {
           
           this.notfound=res
          
          }
else{
  var us=JSON.parse(JSON.stringify(res))
  this.user=JSON.parse(us);

}
           },
          e=>{console.log(e)},
          ()=>{
            console.log(this.notfound)
            if(this.user.id===undefined || this.notfound==="nf")
            this.snackBar.open('Vérifiez Email/RNE!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 6000 });
          else {
            localStorage.setItem('User',JSON.stringify(this.user));
          
             location.replace('/')
          }   
          })
      }
      else if(values.role.name==='Administrateur'){
        console.log(values.role.name)
        this.societeService.login(values.email,values.rne,'Administrateur',values.email,this.societe).subscribe(
          res=>{
            var a=JSON.parse(JSON.stringify(res));
            this.admin=JSON.parse(a);
            if(res==="nf") {
           
              this.notfound=res
             
             }
          },
          e=>{},
          ()=>{
            console.log()
            if(this.admin.id===undefined || this.notfound==="nf") {
            console.log(this.admin)
            this.snackBar.open('Vérifiez Email/Mot de passe!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 6000 });
          
          }
          else {
            localStorage.setItem('Admin',JSON.stringify(this.admin));
            location.replace('/')
          }   
          })
      }
  
    }
  }

  public onRegisterFormSubmit(values:any):void {

    
    if (this.registerForm.valid) {

      this.societe.adresse=values.adresse;
      this.societe.effectifTotal=values.nbTotal;
      this.societe.email=values.email;
      this.societe.governorat=values.governorat.name;
      this.societe.matriculeFiscale=values.matriculeFiscale;
      this.societe.ministereDeTutuelle=values.ministere.name;
      this.societe.rasionSociale=values.raisonSociale;
      this.societe.rne=values.rne;
      this.societe.secteurActivite=values.secteur.name;
      this.societeService.login('','','',values.email,this.societe).subscribe(res=>{},e=>{},()=>{
        this.registerForm.reset()
         this.snackBar.open('Inscription terminée avec succès!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
     
       })
     /*this.societeService.register(this.societe,values.email).subscribe(res=>{},e=>{},()=>{
       this.registerForm.reset()
        this.snackBar.open('Inscription terminée avec succès!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
    
      })*/
    }
  }

}
