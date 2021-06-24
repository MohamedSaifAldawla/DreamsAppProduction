import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { InterpretorProfilePage } from '../../pages/interpretor-profile/interpretor-profile';
import { HomePage } from '../../pages/home/home';
import { TranslateService } from '@ngx-translate/core';

//import { ProfilePage } from '../../pages/profile/profile';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  loading: any;
  public isToggled: boolean;
  public responseData : any;
  public userDetails : any;
  userData = {"name":"","phone":"","birth":"","martial":"","gender":""};
  //public userDetails : any;
  public lang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    public translate: TranslateService) {

      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);

      const data = JSON.parse(localStorage.getItem("userData"));
      this.responseData = data;
      this.userData.martial=this.responseData.martial;
      this.userData.name=this.responseData.name;
      this.userData.phone=this.responseData.phone;
      this.userData.birth=this.responseData.birth;
      this.userData.martial=this.responseData.martial;
      this.userData.gender=this.responseData.gender;


      // if(this.responseData.martial==0)
      // {
      //   this.responseData.martial="Single";
      // }
      // else if(this.responseData.martial==1)
      // {
      //   this.responseData.martial="Married";
      // }
      // else if(this.responseData.martial==2)
      // {
      //   this.responseData.martial="Divorced";
      // }
      // else if(this.responseData.martial==3)
      // {
      //   this.responseData.martial="widewoed";
      // }

      // if(this.responseData.gender==0)
      // {
      //   this.responseData.gender="Male";
      // }
      // else if(this.responseData.gender==1)
      // {
      //   this.responseData.gender="FeMale";
      // }
      //console.log(data); 
  }
  
  inputs() {
    this.isToggled = !this.isToggled;
   } 

   ionViewWillEnter(){
    this.showLoader3();
   }

   UserEdite()
{
  console.log(this.userData);
  this.showLoader2();
  this.authService.UserEdite(localStorage.getItem("access_token"),this.userData).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
   this.loading.dismiss();
   if(this.lang=='en'){
    this.presentToast("success",this.responseData.message)
   }
   else if(this.lang=='ar'){
    this.presentToast("success","تم تحديث البيانات بنجاح")
   }
  
   this.showLoader3();
  //  this.GetUserDetails();
  //  const data = JSON.parse(localStorage.getItem("userData"));
  //  this.responseData = data;
  //  this.userData.martial=this.responseData.martial;
  //     this.userData.name=this.responseData.name;
  //     this.userData.phone=this.responseData.phone;
  //     this.userData.birth=this.responseData.birth;
  //     this.userData.martial=this.responseData.martial;
  //     this.userData.gender=this.responseData.gender;
   //this.navCtrl.push(ProfilePage);
    }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
    // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
    this.presentToast("error",err.error.message);
    //this.presentToast(err.message);
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
  this.presentToast("error",err.message);
  }); 
}
   //======================================Loaders========================================//
showLoader(){
  this.loading = this.loadingCtrl.create({
      // content: 'Loading...'
      content: ''
  });

  this.loading.present();
}

showLoader2(){
  if(this.lang=='en')
  {
  this.loading = this.loadingCtrl.create({
      content: 'Updating...'
  });
}
else if(this.lang=='ar')
  {
    this.loading = this.loadingCtrl.create({
      content: '... جاري تعديل البيانات'
  });
  }

  this.loading.present();
}

showLoader3(){
  if(this.lang=='en')
  {
  this.loading = this.loadingCtrl.create({
      content: 'Loading user info ...'
  });
}
else if(this.lang=='ar')
  {
    this.loading = this.loadingCtrl.create({
    content: '... جلب بيانات الحساب'
  });
  }

  this.GetUserDetails();
  const data = JSON.parse(localStorage.getItem("userData"));
   this.responseData = data;
   this.userData.martial=this.responseData.martial;
      this.userData.name=this.responseData.name;
      this.userData.phone=this.responseData.phone;
      this.userData.birth=this.responseData.birth;
      this.userData.martial=this.responseData.martial;
      this.userData.gender=this.responseData.gender;
  this.loading.present();
  setTimeout(()=>{
    this.loading.dismiss();
  },5000)
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
