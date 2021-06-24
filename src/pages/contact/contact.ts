import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController, ToastController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  loading: any;
  public contactData ={"email":"","body": ""};
  public responseData : any;
  public lang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public translate: TranslateService, public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  ionViewCanEnter(){

    const dataa = localStorage.getItem("lan");
    this.lang = dataa;
    console.log(this.lang);
  }

  send()
  {
    console.log(this.contactData); 
    this.showLoader();
    this.authService.Contact(localStorage.getItem("access_token"),this.contactData).then((result) => { 
      this.responseData= result;
      console.log(this.responseData); 
     this.loading.dismiss();
     if(this.lang=='en')
    {
      this.presentToast("success","Message Send Successfully")
    }
   else if(this.lang=='ar')
    {
      this.presentToast("success","تم إرسال الرساله بنجاح")

    }
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
      if(err.status=401)
      {
        this.presentToast("error",err.error.error);
      }
      else{
        this.presentToast("error",err.message);
      }
      //this.presentToast("error",err.error.message);
      }); 
    }
  


//Loaders
  showLoader(){

    this.loading = this.loadingCtrl.create({
        content: ''
    });
  
    this.loading.present();
  }
  
  presentToast(type,msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
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
