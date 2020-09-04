import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';
import { Prospect } from 'src/Models/Prospect';
import { Societe } from 'src/Models/Societe';
import { Administrateur } from 'src/Models/Administrateur';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency:any;
  user :Societe=new Societe();
  admin:Administrateur=new Administrateur()
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService) { 
    this.settings = this.appSettings.settings; 
  } 

  ngOnInit() {
    this.admin=JSON.parse(localStorage.getItem('Admin'))
    this.user=JSON.parse(localStorage.getItem('User'))

    this.currency = this.currencies[0];
    this.flag = this.flags[0];    
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }
  logOut(){
    localStorage.clear();
    location.replace('/')
  }

  

}
