import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { IDreamsInfoPage } from '../../pages/i-dreams-info/i-dreams-info';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the IDreamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-i-dreams',
  templateUrl: 'i-dreams.html',
})
export class IDreamsPage {

  loading: any;
  responseData : any;
  public id : any;
  public lang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    public translate: TranslateService) {

      
      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);

      this.GetAll()
  }


  //------------------------------------GetSolved----------------------------------------------//

  GetAll(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.I_All(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
      console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Connection timed out, please check your internet or login again...");
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

  //------------------------------------GetSolved----------------------------------------------//

  GetSolved(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.I_Solved(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
      console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Connection timed out, please check your internet or login again...");
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

   //------------------------------------GetPending----------------------------------------------//

   GetPending(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.I_Pending(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
      console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      //this.presentToast("Connection timed out, please check your internet or login again...");
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

   //------------------------------------info----------------------------------------------//

   info(id){

    this.showLoader2();
      this.authService.Dream_info(localStorage.getItem("access_token"),id)
      .then((result) => { 
      //this.responseData= result;
      console.log(result); 
      localStorage.setItem('dreamData',JSON.stringify(result));
      this.loading.dismiss();
      this.navCtrl.push(IDreamsInfoPage);
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Connection timed out, please check your internet or login again...");
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



   //------------------------------------Loaders----------------------------------------------//

showLoader(){
  this.loading = this.loadingCtrl.create({
      // content: 'Loading dreams...'
      content: ''
  });

  this.loading.present();
}

showLoader2(){
  if(this.lang=='en'){
    this.loading = this.loadingCtrl.create({
      content: 'Loading dream info...'
  });
  }
  else if(this.lang=='ar'){
    this.loading = this.loadingCtrl.create({
      content: '... جلب بيانات الحلم'
  });
  }

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
