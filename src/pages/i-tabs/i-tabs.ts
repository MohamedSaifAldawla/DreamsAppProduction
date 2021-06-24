import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { App, NavController, LoadingController, ToastController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { NotificationsPage } from '../notifications/notifications';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { InterpretorProfilePage } from '../../pages/interpretor-profile/interpretor-profile';
import { IHomePage } from '../../pages/i-home/i-home';
import { IDreamsPage } from '../../pages/i-dreams/i-dreams';
import { ProfilePage } from '../profile/profile';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePage } from '../../pages/language/language';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ITabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-i-tabs',
  templateUrl: 'i-tabs.html',
})
export class ITabsPage {

  loading: any;
  public responseData : any;
  public userDetails : any;
  public userDreams : any;
  public lang:any;

  //tab1Root = IHomePage;
  //tab3Root = ContactPage;
  // tab4Root = NotificationsPage;
  tab1Root = InterpretorProfilePage;
  tab2Root = IDreamsPage;
  tab3Root = ProfilePage;
  tab4Root = LanguagePage;

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,public translate: TranslateService,public alertCtrl: AlertController) {

      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);
      
      this.GetUserDetails();
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data;

    const data2 = JSON.parse(localStorage.getItem("userDreams"));
      this.userDreams = data2;
  }


  Getdreams(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.Dreams(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
     // console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      //this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
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

   GetUserDetails(){ 
    this.authService.UserDetails(localStorage.getItem("access_token")).then((result) => { 
    this.userDetails= result;
    //console.log(this.userDetails); 
    localStorage.setItem('userData',JSON.stringify(this.userDetails));
    }, (err) => { 
    console.log(err); 
   // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
   if(err.status=401)
    {
      this.presentToast("error",err.error.error);
    }
    else{
      this.presentToast("error",err.message);
    }
    }); 
  }

  logout(){
    this.showConfirm();
}

  Exit(){
     // console.log(localStorage.getItem("access_token"));
    this.showLoader();
    this.authService.Exit(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      console.log(this.responseData); 
      this.loading.dismiss();
      if(this.lang=='en'){
        this.presentToast("success",this.responseData.message)
      }
      else if(this.lang=='ar'){
        this.presentToast("success","تم تسجيل الخروج بنجاح")
      }
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
      // this.presentToast("error",err.error.message);
      if(err.status=401)
  {
    this.presentToast("error",err.error.error);
  }
  else{
    this.presentToast("error",err.message);
  }
      }); 

    //localStorage.clear();
    localStorage.removeItem('access_token');
    localStorage.removeItem('userData');
    // const root=this.app.getRootNav();
    // root.popToRoot();

    this.navCtrl.push(LoginPage);

      }
//======================================Alert===============================================//

showConfirm() {
  if(this.lang=='en'){
    const confirm = this.alertCtrl.create({
      title: 'Confirm Loggout ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //console.log('Yes clicked');
            this.Exit();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  else if(this.lang=='ar'){
    const confirm = this.alertCtrl.create({
      title: ' تسجيل الخروج من التطبيق ؟',
      buttons: [
        {
          text: 'لا',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'نعم',
          handler: () => {
            //console.log('Yes clicked');
            this.Exit();
          }
        }
      ]
    });
    confirm.present();
  }
  
}

// logout(){
//   this.showLoader();
//   this.authService.Exit(localStorage.getItem("access_token")).then((result) => { 
//     this.responseData= result;
//     console.log(this.responseData); 
//     this.loading.dismiss();
//     this.presentToast("success","Successfully logged out")
//     }, (err) => { 
//     console.log(err); 
//     this.loading.dismiss();
//     // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
//     // this.presentToast("error",err.message);  
//     if(err.status=401)
// {
//   this.presentToast("error",err.error.error);
// }
// else{
//   this.presentToast("error",err.message);
// }
//   }); 

 
//   //localStorage.clear();
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('userData');
//   // const root=this.app.getRootNav();
//   // root.popToRoot();

//   this.navCtrl.push(LoginPage);
//     }
  
//========================================Loaders========================================//
showLoader(){
  this.loading = this.loadingCtrl.create({
      content: 'Logging Out ...'
  });

  this.loading.present();
}


showLoader2(){
  this.loading = this.loadingCtrl.create({
      content: 'Loading user info ...'
  });

  this.loading.present();
}

showLoader3(){
  this.loading = this.loadingCtrl.create({
      content: 'Loading...'
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
