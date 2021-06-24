import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController,Platform } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { TranslateService } from '@ngx-translate/core';
import { AddPage } from '../../pages/add/add';
import { ProfilePage } from '../../pages/profile/profile';
import { InterpretorProfilePage } from '../../pages/interpretor-profile/interpretor-profile';
import { ITabsPage } from '../../pages/i-tabs/i-tabs';
import { DreamInfoPage } from '../../pages/dream-info/dream-info';
import { DreamsPage } from '../../pages/dreams/dreams';
import { PaymentPage } from '../../pages/payment/payment';
import { ContactPage } from '../../pages/contact/contact';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lang',
  templateUrl: 'lang.html',
})
export class LangPage {

  loading: any;
  public lang:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public loadingCtrl: LoadingController, private toastCtrl: ToastController,public platform: Platform,
    public translate: TranslateService,public authService:AuthServiceProvider) {

      if (window.indexedDB) {
        console.log("I'm in WKWebView!");
     } else {
        console.log("I'm in UIWebView");
     }

  }

  ionViewCanEnter(){
    const dataa = localStorage.getItem("lan");
    this.lang = dataa;
    console.log(this.lang);

    if(this.lang!=null){
      this.translate.use(this.lang);
        this.navCtrl.push(LoginPage);
    }
  }
  arabic(){
    // this.authService.langar();
    this.translate.use('ar');
    localStorage.setItem('lan','ar');
    this.showLoader();
  }

  english(){
    // this.authService.langen();
    this.translate.use('en');
    localStorage.setItem('lan','en');
    this.showLoader();
  }

  //--------------------------------------Loaders--------------------------------------//
showLoader(){
  this.loading = this.loadingCtrl.create({
    content: ''
});
this.loading.present();
setTimeout(()=>{
  this.loading.dismiss();
  this.navCtrl.push(LoginPage);
},3000)

}

presentToast(type,msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 10000,
    position: 'top',
    cssClass:type,
    // dismissOnPageChange: true
  });

  toast.onDidDismiss(() => {
  });

  toast.present();
}


}
