import { Component } from '@angular/core';
import {App, NavController, LoadingController, ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DreamsPage } from '../../pages/dreams/dreams';
import { HelpPage } from '../../pages/help/help';
import { IDreamsPage } from '../../pages/i-dreams/i-dreams';

/**
 * Generated class for the IHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-i-home',
  templateUrl: 'i-home.html',
})
export class IHomePage {

  loading: any;
  isLoggedIn: boolean = false;
  public responseData : any;
  public userDetails : any;
  public userDreams : any;
  public stats : any;

  constructor(public app:App,public navCtrl: NavController, public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

      const data = JSON.parse(localStorage.getItem("userDreams"));
      this.userDreams = data;
   //this.Getdreams();
   this.Get_stats();


   // console.log(JSON.parse(JSON.stringify(localStorage.getItem("access_token")))); 
  }

  ionViewCanEnter(){

    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
   }
   else if(localStorage.getItem("token"))
   {
    this.isLoggedIn = false;
    localStorage.clear();
    const root=this.app.getRootNav();
    root.popToRoot();
   }
  }

  dreams(){ 
    this.navCtrl.push(IDreamsPage);
   }

   Get_stats(){ 
    this.authService.stats(localStorage.getItem("access_token")).then((result) => { 
    this.stats= result;
    localStorage.setItem('userStats',JSON.stringify(this.stats));
    console.log(this.stats);
    }, (err) => { 
    console.log(err); 
    // this.presentToast("error",err.message);
    if(err.status=401)
    {
      this.presentToast("error",err.error.error);
    }
    else{
      this.presentToast("error",err.message);
    }
    }); 
  }

  help(){ this.navCtrl.push(HelpPage); }
  
  
  
  //Loaders
  showLoader(){
    this.loading = this.loadingCtrl.create({
        // content: 'Loading...'
        content: ''
    });
  
    this.loading.present();
  }
  
  presentToast(type,msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      cssClass:type,
      // dismissOnPageChange: true
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  

}
