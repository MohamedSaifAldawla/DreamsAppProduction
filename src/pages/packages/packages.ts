import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController,Platform  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AddPage } from '../../pages/add/add';
import { TranslateService } from '@ngx-translate/core';
import { RegisterationPage } from '../../pages/registeration/registeration';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { ApplePay } from '@ionic-native/apple-pay';
/**
 * Generated class for the PackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//const Dreams ='com.bos.dreamsinterpreter2.1';

@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html',
})
export class PackagesPage {

  loading: any;
  public responseData : any;
  public visit : any;
  products : [];
  purchased = 0;
  public lang:any;

  items:any =[{label: 'Package 1',amount:4.99}];
  shippingMethods: any = [
    {
      identifier: 'NextDay',
      label: 'NextDay',
      detail: 'Arrives tomorrow by 5pm.',
      amount: 3.99
    }];
  merchantIdentifier: string = 'merchant.com.bos.dreamsinterpreter2merchant';
  merchantCapabilities: any = ['3ds', 'debit', 'credit'];
  currencyCode: string = 'US';
  countryCode: string = 'US';
  supportedNetworks: any= ['visa', 'masterCard'];
  billingAddressRequirement: any = ['name', 'email', 'phone'];
  shippingAddressRequirement: any = 'none';
  shippingType: string = "shipping";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,
   public loadingCtrl: LoadingController, private toastCtrl: ToastController,
   public translate: TranslateService,private iap: InAppPurchase, public platform: Platform,private applePa: ApplePay) {

    const data = JSON.parse(localStorage.getItem("visit"));
    this.visit = data;

    this.Get_packages();

    //for ios only
   //this.getProducts();

  }
  async applePay(){
     await this.applePa.canMakePayments().then((message) => {
      console.log(message);
      // Apple Pay is enabled. Expect:
      // 'This device can make payments.'
      this.presentToast("success","This device can make payments.");

    }).catch((error) => {
      console.log(error);
      this.presentToast("error",error);

      // There is an issue, examine the message to see the details, will be:
      // 'This device cannot make payments.''
      // 'This device can make payments but has no supported cards'
    });
  }

  async payWithApplePay() {
    // try {
    //   const applePayTransaction = await this.applePa.makePaymentRequest({
    //     items : this.items,
    //     merchantIdentifier: this.merchantIdentifier,
    //     currencyCode: this.currencyCode,
    //     countryCode: this.countryCode,
    //     billingAddressRequirement: this.billingAddressRequirement
    //   });

    //   const transactionStatus = await completeTransactionWithMerchant(applePayTransaction);
    //   await this.applePa.completeLastTransaction(transactionStatus);
    // } catch {
    //   // handle payment request error
    //   // Can also handle stop complete transaction but these should normally not occur
    // }

    // // only if you started listening before
    // await this.applePa.stopListeningForShippingContactSelection();


    try {
      let order: any = {
        items: this.items,
        shippingMethods: this.shippingMethods,
        merchantIdentifier: this.merchantIdentifier,
        currencyCode: this.currencyCode,
        countryCode: this.countryCode,
        billingAddressRequirement: this.billingAddressRequirement,
        shippingAddressRequirement: this.shippingAddressRequirement,
        shippingType: this.shippingType,
        merchantCapabilities: this.merchantCapabilities,
        supportedNetworks: this.supportedNetworks
      }
      this.applePa.makePaymentRequest(order).then(message => {
        console.log(message);
        this.applePa.completeLastTransaction('success');
      }).catch((error) => {
        console.log(error);
        this.presentToast("error",error);
        this.applePa.completeLastTransaction('failure');
      });

    } catch{
      // handle payment request error
      // Can also handle stop complete transaction but these should normally not occur
    }


 }

  // getProducts(){
  //     this.iap
  //     .getProducts(['com.bos.dreamsinterpreter2.prod2'])
  //     .then((products) => {
  //     //JSON.stringify(products);
  //     console.log(products);
  //     //this.products=products;
  //   })
  //   .catch((err) => {
  //     console.log(JSON.stringify(err));
  //     this.presentToast("error",err);
  //   });
  // }

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
      if(err){
        if(this.lang=='en')
        {
          this.presentToast("error","Your Token is Expired, Login Again or check your connection ...!");
        }
        else if(this.lang=='ar')
          {
            this.presentToast("error","انتهت مده صلاحيه الجلسه ,الرجاء الدخول مجددا او تفقد اتصال الشبكه"); 
          }
        this.loading.dismiss();
      }
      
      // this.presentToast("Http Request Error...");
      // this.presentToast("error",err.message);  
      else if(err.status=401)
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
