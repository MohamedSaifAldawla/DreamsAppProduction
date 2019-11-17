import { TabsPage } from './../tabs/tabs';
import { ITabsPage } from './../i-tabs/i-tabs';
import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, LoadingController, ToastController, Loading,Platform } from 'ionic-angular';
import { RegisterationPage } from '../../pages/registeration/registeration';
import { RestorePage } from '../../pages/restore/restore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { IDreamsPage } from '../../pages/i-dreams/i-dreams';
import { TranslateService } from '@ngx-translate/core';
import { LangPage } from '../../pages/lang/lang';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { HttpClient  } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  isLoggedIn: boolean = false;
  public responseData : any;
  public userDetails : any;
  public stats : any;
  userData = {"username":"","password":""};
  // userData = {"username":"moejozif","password":"123456"};
  // userData = {"username":"mohamed","password":"123456"};
  public lang:any;
  public visit : any;
  public fbData ={"name":"", "username": "","email":"","fb": "1","id":""};
  public twData ={"name":"", "username": "","email":"","fb": "1","id":""};
  public userProfile: any = null;

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider, 
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,public platform: Platform,
    public translate: TranslateService,private fb: Facebook,public http: HttpClient, private twitter: TwitterConnect,public afAuth: AngularFireAuth) {
  
  }

  ionViewCanEnter(){

    const dataa = localStorage.getItem("lan");
    this.lang = dataa;
    console.log(this.lang);
   
    if(localStorage.getItem('access_token')!=null &&
    localStorage.getItem('userData')!=null&&this.lang!=null){
      //console.log((localStorage.getItem('access_token')));
      //console.log((localStorage.getItem('userData')));
      this.Home();
      
      }
      else if(localStorage.getItem('userData')==null)
   {
    //localStorage.clear();
    //this.presentToast("error","you Must Login First");
    // if(this.lang==null){
    //     this.navCtrl.push(LangPage);
    //   }
      // else{
    // const root=this.app.getRootNav();
    // root.popToRoot();
    //   }
   }

  }

  // ionViewWillLeave(){
  //   this.platform.exitApp();
  // }
  
Home(){
  const data2 = JSON.parse(localStorage.getItem("visit"));
  this.visit = data2;

  const data = JSON.parse(localStorage.getItem("userData"));
  this.userDetails = data;
  
  //---------------------Interpreter-----------------------//
  if(this.userDetails.user_type==2)
  {
    this.Getdreams2();
    this.Get_stats();
   
}
//---------------------User-----------------------//
 if(this.userDetails.user_type==3)
  {
    //this.navCtrl.push(TabsPage);
    this.Getdreams();
}
// //---------------------visitor-----------------------//
// if(this.visit==4)
// {
//   this.articles();
//   this.navCtrl.push(TabsPage);
// }

}

login()
{
  localStorage.setItem('visit','0');
  //this.navCtrl.push(TabsPage);
  if(this.userData.username=='' && this.userData.password=='')
  {
    if(this.lang=='en')
    {
    this.presentToast("error","Please Enter Your Username And Password");
    }
    else if(this.lang=='ar')
      {
      this.presentToast("error","ادخل إسم المستخدم و كلمه السر");

      }
  }

  else if(this.userData.username=='')
  {
    if(this.lang=='en')
    {
    this.presentToast("error","Please Enter Your Username");
    }
    else if(this.lang=='ar')
      {
      this.presentToast("error","ادخل إسم المستخدم");

      }
  }
  else if(this.userData.password=='')
  {
    if(this.lang=='en')
    {
    this.presentToast("error","Please Enter Your password");
    }
    else if(this.lang=='ar')
      {
      this.presentToast("error","ادخل كلمه المرور");

      }
  }

  else if(this.userData.username!='' && this.userData.password!='')
  {
  this.showLoader();
  this.authService.Login(this.userData).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
   localStorage.setItem('access_token', this.responseData.access_token);
   this.loading.dismiss();
  this.GetUserDetails();
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
    
}

//====================================Facebook Login======================================//

loginFb(){
  this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) =>{
    if(res.status==='connected')
    {
      if(this.lang=='en')
      {
        this.presentToast("success","Connected");
      }
      else if(this.lang=='ar')
        {
          this.presentToast("success","متصل بالفيسبوك");
        }
      // console.log('Logged into Facebook!', res)
      this.GetDetails(res.authResponse.userID);
    }
    else{
      if(this.lang=='en')
      {
        this.presentToast("error","Failed");
      }
      else if(this.lang=='ar')
        {
          this.presentToast("error","فشل في الإتصال بالفيسبوك");
        }
    }
  })
  .catch(e => 
    this.presentToast("error",e.errorMessage)
    )
}

GetDetails(id){
  this.fb.api("/"+id+"/?fields=id,name,first_name,last_name,gender,email",
  ['public_profile']).then(res => {
    console.log(res);
    this.fbData.name=res.first_name;
    this.fbData.username=res.name;
    this.fbData.email=res.email;
    // this.fbData.email="fdhhd@dfg.com";
    this.fbData.id=id;
    // console.log( this.fbData);
    this.singup();
  }).catch(e =>{
    console.log(e);
  });
  }
//=========================================Twitter Login============================================//

twLogin(){

  this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
  .then(res => {
    if(res.user!=null)
    {
      if(this.lang=='en')
      {
        this.presentToast("success","Connected To Twitter");
      }
      else if(this.lang=='ar')
        {
          this.presentToast("success","متصل بتويتر");
        }
        console.log(res);
        this.twData.name=res.user.displayName;
        this.twData.username=res.additionalUserInfo.username;
        this.twData.email=res.user.email;
        this.twData.id=res.user.uid;
        console.log(this.twData);
        this.singuptw();
    }
    else if(res.user==null)
    {
      if(this.lang=='en')
      {
        this.presentToast("error","Error connecting to twitter");
      }
      else if(this.lang=='ar')
        {
          this.presentToast("error","فشل في الإتصال يتويتر");
        }
    }
  }).catch(ERROR =>{
        this.presentToast("error",JSON.stringify(ERROR .error));
  });

}

singup()
{
    localStorage.setItem('visit','0');
    this.showLoader4();
    this.authService.postData(this.fbData).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
    this.loading.dismiss();
    if(this.responseData.access_token!=null)
    {
      localStorage.setItem('access_token', this.responseData.access_token);
      this.GetUserDetails();
    }
    else if(this.responseData.access_token==null)
    {
    if(this.lang=='en')
    {
      this.presentToast("success","Registerd Successfully, Check your email to activate your account")
    }
   else if(this.lang=='ar')
    {
      this.presentToast("success","تم التسجيل ,الرجاء التحقق من الإيميل لتفعيل الحساب")

    }
  }
    }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
    this.presentToast("error",err.error.message);
    this.presentToast("error",JSON.stringify(err.error.errors));
    }); 
}

singuptw()
{
    localStorage.setItem('visit','0');
    this.showLoader4();
    this.authService.postData(this.twData).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
    this.loading.dismiss();
    if(this.responseData.access_token!=null)
    {
      localStorage.setItem('access_token', this.responseData.access_token);
      this.GetUserDetails();
    }
    else if(this.responseData.access_token==null)
    {
    if(this.lang=='en')
    {
      this.presentToast("success","Registerd Successfully, Check your email to activate your account")
    }
   else if(this.lang=='ar')
    {
      this.presentToast("success","تم التسجيل ,الرجاء التحقق من الإيميل لتفعيل الحساب")

    }
  }
    }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
    this.presentToast("error",err.error.message);
    this.presentToast("error",JSON.stringify(err.error.errors));
    }); 
}

//============================================================================================//

visitor(id)
{
  localStorage.setItem('visit',id);
  this.articles();
  this.navCtrl.push(TabsPage);
  console.log(id);
}

GetUserDetails(){ 
  this.authService.UserDetails(localStorage.getItem("access_token")).then((result) => { 
  this.userDetails= result;
  console.log(this.userDetails); 
  localStorage.setItem('userData',JSON.stringify(this.userDetails));
  this.articles();
  this.Home();
  }, (err) => { 
  console.log(err); 
  // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
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

Get_stats(){ 
  this.showLoader();
  this.authService.stats(localStorage.getItem("access_token")).then((result) => { 
  this.stats= result;
  localStorage.setItem('userStats',JSON.stringify(this.stats));
  console.log(this.stats);
  this.loading.dismiss();
  this.showLoader3();
  }, (err) => { 
  console.log(err); 
  this.loading.dismiss();
  //this.presentToast("error",err.message);
  if(err.status=401)
    {
      this.presentToast("error",err.error.message);
    }
    else{
      this.presentToast("error",err.message);
    }
  }); 
}

Getdreams(){ 
  this.showLoader();
    this.authService.DreamsCount(localStorage.getItem("access_token")).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
    localStorage.setItem('userDreams',JSON.stringify(this.responseData));
    this.loading.dismiss();
    this.showLoader2();
  }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
   // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
   //this.presentToast("error",err.message);
   if(err.status=401)
    {
      this.presentToast("error",err.error.message);
    }
    else{
      this.presentToast("error",err.message);
    }
    }); 
 }

 Getdreams2(){ 
  this.authService.I_All(localStorage.getItem("access_token")).then((result) => { 
  this.responseData= result;
  console.log(this.responseData); 
  localStorage.setItem('userDreams',JSON.stringify(this.responseData));
}, (err) => { 
  console.log(err); 
  // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
  //this.presentToast("error",err.message);
  if(err.status=401)
    {
      this.presentToast("error",err.error.message);
    }
    else{
      this.presentToast("error",err.message);
    }
  }); 
}
 articles(){ 
    // this.showLoader();
    this.authService.ArticlesCount(localStorage.getItem("access_token")).then((result) => { 
    this.responseData= result;
    console.log(this.responseData); 
    localStorage.setItem('articles',JSON.stringify(this.responseData));
    // this.loading.dismiss();
    }, (err) => { 
    console.log(err); 
    // this.presentToast("Your Token is Expired, Login Again or check your connection ...!");
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

rigester()
{
  this.navCtrl.push(RegisterationPage);
}

restore()
{
  this.navCtrl.push(RestorePage);
}

//Loaders
showLoader(){
  if(this.lang=='en')
  {
  this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
  });
  }
  else if(this.lang=='ar')
  {
    this.loading = this.loadingCtrl.create({
      content: '... جاري التحقق من البيانات'
  });
  }

  this.loading.present();
}

showLoader2(){
  if(this.lang=='en')
  {
  this.loading = this.loadingCtrl.create({
      content: 'Logging in...'
  });
}
  else if(this.lang=='ar')
  {
    this.loading = this.loadingCtrl.create({
      content: '... تسجيل الدخول'
  });
  }
  this.loading.present();
  setTimeout(()=>{
    this.loading.dismiss();
    this.navCtrl.push(TabsPage);
  },3000)
}

showLoader3(){
  if(this.lang=='en')
  {
  this.loading = this.loadingCtrl.create({
      content: 'Logging in...'
  });
}
  else if(this.lang=='ar')
  {
    this.loading = this.loadingCtrl.create({
      content: '... تسجيل الدخول'
  });
  }

  this.loading.present();
  setTimeout(()=>{
    this.loading.dismiss();
    this.navCtrl.push(ITabsPage);
  },3000)
}

showLoader4(){

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
