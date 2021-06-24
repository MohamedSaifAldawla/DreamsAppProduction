import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController,Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  loading: any;
  public lang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,public platform: Platform,
   public translate: TranslateService,public authService:AuthServiceProvider) {
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

  // dir(){
  //   if(this.platform.isRTL){
  //     this.translate.use('en');
  //    // this.platform.setDir('ltr',true);
  //   }
  //   else{
  //     this.translate.use('ar');
  //    // this.platform.setDir('rtl',true); 
  //   }
  // }

  //--------------------------------------Loaders--------------------------------------//
showLoader(){
  this.loading = this.loadingCtrl.create({
    content: ''
});
this.loading.present();
setTimeout(()=>{
  this.loading.dismiss();
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
