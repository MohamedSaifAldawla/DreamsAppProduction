import { Component } from '@angular/core';

import { LangPage } from '../lang/lang';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { App, NavController, LoadingController, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { NotificationsPage } from '../notifications/notifications';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePage } from '../../pages/language/language';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  loading: any;
  public responseData : any;
  public userDetails : any;
  public userDreams : any;
  public Articles : any;
  public lang:any;
  public visit : any;


  
  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = ContactPage;
  tab4Root = NotificationsPage;
  tab5Root = LanguagePage;


  constructor(public app:App, public navCtrl: NavController,
    public authService:AuthServiceProvider,
   public loadingCtrl: LoadingController, private toastCtrl: ToastController,
   public alertCtrl: AlertController,public translate: TranslateService) {

    const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);
      
     this.GetUserDetails();
    const data3 = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data3;

    const data4 = JSON.parse(localStorage.getItem("visit"));
      this.visit = data4;

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
      // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
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
    console.log(this.userDetails); 
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

//========================================Loaders========================================//
showLoader(){
  this.loading = this.loadingCtrl.create({
      //content: 'Logging Out ...'
      content: ''
  });

  this.loading.present();
}


showLoader2(){
  this.loading = this.loadingCtrl.create({
      // content: 'Loading user info ...'
      content: ''
  });

  this.loading.present();
}

showLoader3(){
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
