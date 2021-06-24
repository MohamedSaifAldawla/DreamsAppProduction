import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { StatusBar } from '@ionic-native/status-bar';
import { DreamsPage } from './../dreams/dreams';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the DreamInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dream-info',
  templateUrl: 'dream-info.html',
})
export class DreamInfoPage {
  
  public responseData : any;
  loading: any;
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
    private statusBar: StatusBar,public translate: TranslateService) {

      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);

    const data = JSON.parse(localStorage.getItem("userData"));
    this.responseData = data;


  }

  tapPay(id){
    this.showLoader();
    this.authService.tapPay(localStorage.getItem("access_token"),id)
    .then((result) => { 
    this.responseData= result;
    console.log(id);
    console.log(this.responseData); 
    this.openWithCordovaBrowser(this.responseData.Dream);
    //this.theInAppBrowser.create(this.responseData.Dream,'_system');
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
      if(this.lang=='en')
      {
        this.presentToast("error","Your Token is Expired, Login Again or check your connection ...!");
      }
      else if(this.lang=='ar')
        {
          this.presentToast("error","انتهت مده صلاحيه الجلسه ,الرجاء الدخول مجددا او تفقد اتصال الشبكه"); 
        }
    }
    }); 
  }
  
  payPal(id){
    this.showLoader();
    this.authService.payPal(localStorage.getItem("access_token"),id)
    .then((result) => { 
    this.responseData= result;
    console.log(id);
    //console.log(this.responseData); 
    this.openWithCordovaBrowser(this.responseData.Dream);
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
     if(this.lang=='en')
     {
       this.presentToast("error","Your Token is Expired, Login Again or check your connection ...!");
     }
     else if(this.lang=='ar')
       {
         this.presentToast("error","انتهت مده صلاحيه الجلسه ,الرجاء الدخول مجددا او تفقد اتصال الشبكه"); 
       }
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
    //this.navCtrl.push(PaymentPage);
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
