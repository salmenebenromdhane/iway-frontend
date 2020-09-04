import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Category, Product } from './app.models';

export class Data {
    constructor(public categories: Category[],
                public compareList: Product[],
                public wishList: Product[],
                public cartList: Product[],
                public totalPrice: number,
                public totalCartCount: number) { }
}

@Injectable()
export class AppService {
    public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null, //totalPrice,
        0 //totalCartCount
    )
    public url = "assets/data/";
    constructor(public http:HttpClient, public snackBar: MatSnackBar) { }
    
    public getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.url + 'categories.json');
    }
   
    public getProducts(type): Observable<Product[]>{        
        return this.http.get<Product[]>(this.url + type + '-products.json');
    }

    public getProductById(id): Observable<Product>{
        return this.http.get<Product>(this.url + 'product-' + id + '.json');
    }

    public getBanners(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'banners.json');
    }

    public addToCompare(product:Product){
        let message, status;
        if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to comparison list.'; 
            status = 'error';     
        }
        else{
            this.Data.compareList.push(product);
            message = 'The product ' + product.name + ' has been added to comparison list.'; 
            status = 'success';  
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToWishList(product:Product){
        let message, status;
        if(this.Data.wishList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to wish list.'; 
            status = 'error';     
        }
        else{
            this.Data.wishList.push(product);
            message = 'The product ' + product.name + ' has been added to wish list.'; 
            status = 'success';  
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    } 

    public addToCart(product:Product){
        let message, status;        
       
        this.Data.totalPrice = null;
        this.Data.totalCartCount = null;

        if(this.Data.cartList.filter(item=>item.id == product.id)[0]){ 
            let item = this.Data.cartList.filter(item=>item.id == product.id)[0];
            item.cartCount = product.cartCount;  
        }
        else{           
            this.Data.cartList.push(product);
        }        
        this.Data.cartList.forEach(product=>{
            this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
            this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
        });

        message = 'The product ' + product.name + ' has been added to cart.'; 
        status = 'success';          
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public resetProductCartCount(product:Product){
        product.cartCount = 0;
        let compareProduct = this.Data.compareList.filter(item=>item.id == product.id)[0];
        if(compareProduct){
            compareProduct.cartCount = 0;
        };
        let wishProduct = this.Data.wishList.filter(item=>item.id == product.id)[0];
        if(wishProduct){
            wishProduct.cartCount = 0;
        }; 
    }

    public getBrands(){
        return [  
            { name: 'aloha', image: 'assets/images/brands/aloha.png' },
            { name: 'dream', image: 'assets/images/brands/dream.png' },  
            { name: 'congrats', image: 'assets/images/brands/congrats.png' },
            { name: 'best', image: 'assets/images/brands/best.png' },
            { name: 'original', image: 'assets/images/brands/original.png' },
            { name: 'retro', image: 'assets/images/brands/retro.png' },
            { name: 'king', image: 'assets/images/brands/king.png' },
            { name: 'love', image: 'assets/images/brands/love.png' },
            { name: 'the', image: 'assets/images/brands/the.png' },
            { name: 'easter', image: 'assets/images/brands/easter.png' },
            { name: 'with', image: 'assets/images/brands/with.png' },
            { name: 'special', image: 'assets/images/brands/special.png' },
            { name: 'bravo', image: 'assets/images/brands/bravo.png' }
        ];
    }
    public getMinisteres(){
        return [ 
            {name: 'Ministère de la défense nationale'}, 
            {name: "Ministère de l'éducation"},
            {name: "Ministère de la formation professionnelle et de l'emploi"},
            {name: "Ministère de l'enseignement supérieur et de la recherche scientifique"},
            {name: 'Ministère des finances'},
            {name: "Ministère des de l'intérieur"},
            {name: 'Ministère de la justice'},
            {name: 'Présidence du Governement'},
            {name: 'Ministère des affaires religieuses'},
            {name: 'Ministère de la santé'},
            {name: 'Ministère des affaires sociales'},
            {name: 'Ministère du commerce'},
            {name: 'Ministère des affaires culturelles'},
            {name: "Ministère de l'agriculture, de la pêche maritime et des ressources hydrauliques"},
            {name: "Ministère de l'environnement"},
            {name: 'Ministère des affaires locales'},
            {name: "Ministère de la femme, de la famille, de l'enfance et des personnes âgées"},
            {name: 'Ministère des technologies de la communication et de la transformation digitale'},
            {name: 'Ministère des affaires étrangères'},
            {name: "Ministère du développement, de l'investissement et de la coopération internationale"},
            {name: "Ministère du tourisme et de l'artisanat"},
            {name: "Ministère des affaires de la jeunesse et des sports"},
            {name: "Ministère de l'énergie, des mines et de la transition énergitique"},
            {name: "Ministère de l'équimepent-Ponts et Chaussées"},
            {name: "Ministère équipement - Batiments Civils - Bureaux d'études et de contrôle technique"},
            {name: "Ministère_Transport Terrestre"},
            {name: "Ministère_Transport Maritime"},
            {name: "Ministère de l'industrie et PME - Industries Agroalimentaires"},
            {name: "Ministère de l'industrie et PME - Industries Manufacturières"},
            {name: "Ministère de l'industrie et PME - Textile & Habillement"},
            {name: "Ministère de l'industrie et PME - API"},
        ]
    }
    public getSecteursActivites(){
        return [
            {name: "Activités agricoles"},
            {name: "Activités de services administratifs et de soutien"},
            {name: "Activités financières et d'assurances"},
            {name: "Activités immobilières"},
            {name: "Activités spécialisées scientifiques et techniques"},
            {name: "Arts, spectacles et activités récréatives"},
            {name: "Autres activités de service"},
            {name: "Commerce et réparation d'automobiles et motocycles"},
            {name: "Construction"},
            {name: "Enseignement"},
            {name: "Hébergement et restauration"},
            {name: "Industries extractives (minéraux bruts et autres)"},
            {name: "Industries manufacturières"},
            {name: "Information et communication"},
            {name: "Activités de l'économie de l'eau dans les secteurs non agricoles"},
            {name: "Activités de pêche et d'aquaculture"},
            {name: "Activités de prmière transformation de produits agricoles et de pêche et de leur conditionnement"},
            {name: "Activités de services liés à l'agriculture"},
            {name: "Activités de services liés à la pêche"},
            {name: "Production et distribution d'électricité, de gaz, de vapeur et air conditionné"},
            {name: "Santé humaine et action sociale"},
            {name: "Transport et entreposage"},
        ]
    }
    public getRoles(){
        return [
            {name:"Administrateur"},{name:"Société"}
        ]
    }
    public getCountries(){
        return [ 
            {name: 'Tunis'}, 
            {name: 'Ariana'},
            {name: 'Ben Arous'},
            {name: 'Mannouba'},
            {name: 'Bizete'},
            {name: 'Béja'},
            {name: 'Gabès'},
            {name: 'Gafsa'},
            {name: 'Jendouba'},
            {name: 'Kairouan'},
            {name: 'Kasserine'},
            {name: 'Kébili'},
            {name: 'Le kéf'},
            {name: 'Mahdia'},
            {name: 'Medenine'},
            {name: 'Monastir'},
            {name: 'Nabeul'},
            {name: 'Sfax'},
            {name: 'Sidi Bouzid'},
            {name: 'Siliana'},
            {name: 'Sousse'},
            {name: 'Tataouine'},
            {name: 'Tozeur'},
            {name: 'Zaghouan'},

            
        ]
    }

    public getMonths(){
        return [
            { value: '01', name: 'January' },
            { value: '02', name: 'February' },
            { value: '03', name: 'March' },
            { value: '04', name: 'April' },
            { value: '05', name: 'May' },
            { value: '06', name: 'June' },
            { value: '07', name: 'July' },
            { value: '08', name: 'August' },
            { value: '09', name: 'September' },
            { value: '10', name: 'October' },
            { value: '11', name: 'November' },
            { value: '12', name: 'December' }
        ]
    }

    public getYears(){
        return ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030" ]
    }

    public getDeliveryMethods(){
        return [
            { value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
            { value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
            { value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' }
        ]
    }

} 