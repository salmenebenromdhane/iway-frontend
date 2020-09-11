import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { EmployeService } from 'src/Services/EmployeService';
import * as $ from "jquery";
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
user:any
responsable:any={"nom":"","prenom":"","adresse":""};
effectif:any=[];
  constructor(public appService:AppService, private employeService: EmployeService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('User'))
    console.log(this.user)
    this.effectif=this.user.listeEmployes
    console.log(this.effectif)
    this.employeService.TrouverResponsable(this.user.id).subscribe(res=>{this.responsable=JSON.parse(JSON.stringify(res))},e=>{},()=>{
     console.log("responsable")
     console.log(this.responsable.nom)
    })
      
  }

  Imprimer(){
      
      $('#print').find(':input').each(function(){
        console.log
        $(this).attr("value",$(this).val().toString()); 
      })
      
      var printContents = document.getElementById('print').innerHTML;

    
      var $printerDiv = $('<div class="printContainer"></div>'); // create the div that will contain the stuff to be printed
      $printerDiv.html(printContents); // add the content to be printed
      $('body').append($printerDiv).addClass("printingContent"); // add the div to body, and make the body aware of printing (we apply a set of css styles to the body to hide its contents)
  
        window.print(); // call print
        $printerDiv.remove(); // remove the div
      
    
      $('body').removeClass("printingContent");
   
  }


}