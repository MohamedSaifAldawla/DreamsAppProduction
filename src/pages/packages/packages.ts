import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,Platform  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AddPage } from '../../pages/add/add';
import { TranslateService } from '@ngx-translate/core';
import { RegisterationPage } from '../../pages/registeration/registeration';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
/**
 * Generated class for the PackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//const Dreams ='com.bos.dreamsinterpreter.Dream';

@IonicPage()
@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html',
})
export class PackagesPage {

  loading: any;
  public responseData : any;
  public visit : any;
  products : any;
  purchased = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,
   public loadingCtrl: LoadingController, private toastCtrl: ToastController,
   public translate: TranslateService,private iap: InAppPurchase, public platform: Platform) {

    const data = JSON.parse(localStorage.getItem("visit"));
    this.visit = data;

    this.Get_packages();

    //for ios only
   //this.getProducts();

  }

  getProducts(){
  //  this.platform.ready().then(()=>{
  //     this.iap.getProducts([DreamsKey]).then((products) => {
  //     console.log(products);
  //     this.products=products;
  //   })
  // })
  
  //   .catch(err => {
  //     console.log(err);
  //   });

  this.iap
 .getProducts(['Dream'])
 .then((products) => {
   console.log(products);
 })
 .catch((err) => {
   console.log(err);
 });
  }

  


  // buy(){
  //   this.iap.buy().then((data)=> {
  //   console.log(data);

  // })
  // .catch((err)=> {
  //   console.log(err);
  // });
  // }

  //purchaseCheck(id){
    //if(id===DreamsKey)
  //}

  Get_packages(){ 
      this.showLoader();
      this.authService.Packages(localStorage.getItem("access_token")).then((result) => { 
      this.responseData= result;
      //console.log(this.responseData); 
      this.loading.dismiss();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Http Request Error...");
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

   Get_package(id){
     //this.buy();
    if(this.visit==4)
    {
      this.navCtrl.push(RegisterationPage);
    }
    else{
    this.showLoader2();
    this.authService.Package_info(localStorage.getItem("access_token"),id)
    .then((result) => { 
    console.log(result); 
    localStorage.setItem('packageData',JSON.stringify(result));
    this.loading.dismiss();
    this.navCtrl.push(AddPage);
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
   }




//----------------------------Loaders---------------------------------------//
showLoader(){
  this.loading = this.loadingCtrl.create({
      // content: 'Loading Packages...'
      content: ''
  });

  this.loading.present();
}

showLoader2(){
  this.loading = this.loadingCtrl.create({
      // content: 'Loading Package Information...'
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
