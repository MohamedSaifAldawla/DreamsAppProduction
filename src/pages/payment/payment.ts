import { DreamsPage } from './../dreams/dreams';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public responseData : any;
  public package : any;
  public dream : any;
  loading: any;
  public id : any;
  public lang:any;

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider
    , public loadingCtrl: LoadingController, private toastCtrl: ToastController,private theInAppBrowser: InAppBrowser,
    public translate: TranslateService) {

      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);

    const data = JSON.parse(localStorage.getItem("packageData"));
    this.package = data;
    console.log(this.package);

    const data2 = JSON.parse(localStorage.getItem("Dream"));
    this.dream = data2;
    console.log(this.dream);
    
    this.id=this.dream.id;
  }


  tapPay(id){
    this.showLoader();
    this.authService.tapPay(localStorage.getItem("access_token"),id)
    .then((result) => { 
    this.responseData= result;
    console.log(this.id);
    console.log(this.responseData); 
    this.openWithInAppBrowser(this.responseData.Dream);
    this.loading.dismiss();
    }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
    // this.presentToast("err");
   // this.presentToast("error",err.message);
   if(err.status=401)
   {
     this.presentToast("error",JSON.stringify(err.error.errors));
   }
   else{
     this.presentToast("error",err.message);
   }
    }); 
  }
  
  payPal(id){
    this.showLoader();
    this.authService.payPal(localStorage.getItem("access_token"),id)
    .then((result) => { 
    this.responseData= result;
    console.log(this.id);
    //console.log(this.responseData); 
    this.openWithInAppBrowser(this.responseData.Dream);
    if(this.responseData.message=='Approved')
    {
      this.navCtrl.push(DreamsPage);
    }
    else{
      this.navCtrl.push(DreamsPage);
    }
    this.loading.dismiss();
    }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
    // this.presentToast("err");
   // this.presentToast("error",err.message);
   if(err.status=401)
   {
     this.presentToast("error",JSON.stringify(err.error.errors));
   }
   else{
     this.presentToast("error",err.message);
   }
    }); 
  }


public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
}  


   
//--------------------------------------Loaders--------------------------------------//
showLoader(){
  if(this.lang=='en'){
    this.loading = this.loadingCtrl.create({
      content: 'Sending, Please Wait ...'
  });
  }
  else if(this.lang=='ar'){
    this.loading = this.loadingCtrl.create({
      content: '... جاري الإرسال ,الرجاء الإنتظار'
  });
  }


  this.loading.present();
}

showLoader2(){
  if(this.lang=='en'){
    this.loading = this.loadingCtrl.create({
      content: 'Getting Dream Details'
  });
  }
  else if(this.lang=='ar'){
    this.loading = this.loadingCtrl.create({
      content: '... جلب بيانات الحلم'
  });
  }
  
  this.loading.present();
  setTimeout(()=>{
    this.loading.dismiss();
    this.navCtrl.push(PaymentPage);
  },5000)
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
