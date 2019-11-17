import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController   } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DreamInfoPage } from '../../pages/dream-info/dream-info';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the DreamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dreams',
  templateUrl: 'dreams.html',
})
export class DreamsPage {

  loading: any;
  isLoggedIn: boolean = false;
  public responseData : any;
  public userDetails : any;
  public id : any;
  public lang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController, public translate: TranslateService) {
  
      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);
      
      this.Getdreams();

    }
//------------------------------------Getdreams----------------------------------------------//

  Getdreams(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.Dreams(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
     // console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Your Token is Expired...");
      //this.presentToast("error",err.message);
      if(err.status=401)
    {
      this.presentToast("error",err.error.error);
    }
    else{
      this.presentToast("error",err.message);
    }
      }); 
   }

//------------------------------------GetSolved----------------------------------------------//

   GetSolved(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.Solved(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
     // console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Your Token is Expired...");
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

   //------------------------------------GetPending----------------------------------------------//

   GetPending(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.Pending(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
     // console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Your Token is Expired...");
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


    //------------------------------------GetPay----------------------------------------------//

    GetPay(){ 
      //this.navCtrl.push(DreamsPage);
        this.showLoader();
        this.authService.nonPayed(localStorage.getItem("access_token")).then((result) => { 
        this.responseData= result;
        //this.dataset=this.responseData;
       // console.log(this.responseData); 
        this.loading.dismiss();
        }, (err) => { 
        console.log(err); 
        this.loading.dismiss();
        // this.presentToast("Your Token is Expired...");
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

//------------------------------------info----------------------------------------------//

   info(id){

    this.showLoader2();
      this.authService.Dream_info(localStorage.getItem("access_token"),id)
      .then((result) => { 
      //this.responseData= result;
      console.log(result); 
      localStorage.setItem('userData',JSON.stringify(result));
      this.loading.dismiss();
      this.navCtrl.push(DreamInfoPage);
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Your Token is Expired...");
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
