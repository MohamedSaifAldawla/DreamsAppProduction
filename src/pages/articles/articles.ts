import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController    } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ArticlesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  loading: any;
  isLoggedIn: boolean = false;
  public responseData : any;
  //public dataset : any;
  public userDetails : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,
   public loadingCtrl: LoadingController, private toastCtrl: ToastController,
   public translate: TranslateService) {
  

    this.articles();

  }

  articles(){ 
    //this.navCtrl.push(DreamsPage);
      this.showLoader();
      this.authService.Articles(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //this.dataset=this.responseData;
      //console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      //this.presentToast("Http Request Error...");
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
      // content: 'Loading articles ...'
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
