import { Component } from '@angular/core';
import { App,NavController, LoadingController, ToastController  } from 'ionic-angular';
import { DreamsPage } from '../../pages/dreams/dreams';
import { AddPage } from '../../pages/add/add';
import { HelpPage } from '../../pages/help/help';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { ArticlesPage } from '../../pages/articles/articles';
import { PackagesPage } from '../../pages/packages/packages';
import { IHomePage } from '../../pages/i-home/i-home';
import { TranslateService } from '@ngx-translate/core';
import { RegisterationPage } from '../../pages/registeration/registeration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;
  public responseData : any;
  public userDetails : any;
  public userDreams : any;
  public Articles : any;
  public visit : any;


  constructor(public app:App,public navCtrl: NavController, public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    public translate: TranslateService) {
    
    
      const data = JSON.parse(localStorage.getItem("userDreams"));
      this.userDreams = data;

      const data2 = JSON.parse(localStorage.getItem("articles"));
      this.Articles = data2;

      const data3 = JSON.parse(localStorage.getItem("visit"));
      this.visit = data3;

  }

  doRefresh(refresher) {
    this.authService.DreamsCount(localStorage.getItem("access_token")).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
    localStorage.setItem('userDreams',JSON.stringify(this.responseData));
    this.userDreams=this.responseData;
  }, (err) => { 
    console.log(err); 
   if(err.status=401)
    {
      this.presentToast("error",err.error.message);
    }
    else{
      this.presentToast("error",err.message);
    }
    }); 

    this.authService.ArticlesCount(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      console.log(this.responseData); 
      localStorage.setItem('articles',JSON.stringify(this.responseData));
      this.Articles = this.responseData;
      }, (err) => { 
      console.log(err); 
      if(err.status=401)
      {
        this.presentToast("error",err.error.error);
      }
      else{
        this.presentToast("error",err.message);
      }
     
    }); 

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }

   logout(){
    this.showLoader();
    this.authService.Exit(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      console.log(this.responseData); 
      this.loading.dismiss();
      this.presentToast("success","Successfully logged out")
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

    localStorage.clear();
    const root=this.app.getRootNav();
    root.popToRoot();
      }

dreams(){
  if(this.visit==4)
  {
    this.navCtrl.push(RegisterationPage);
  }
  else{
   this.navCtrl.push(DreamsPage);
  }
}

add(){ this.navCtrl.push(PackagesPage); }

articles(){this.navCtrl.push(ArticlesPage);}

help(){ this.navCtrl.push(HelpPage); }


 Getdreams(){ 
  //this.navCtrl.push(DreamsPage);
    // this.showLoader();
    this.authService.Dreams(localStorage.getItem("access_token")).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
    localStorage.setItem('userDreams',JSON.stringify(this.responseData));
    // this.loading.dismiss();
    }, (err) => { 
    console.log(err); 
    if(err.status=401)
    {
      this.presentToast("error",err.error.error);
    }
    else{
      this.presentToast("error",err.message);
    }
  }); 
 }

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
