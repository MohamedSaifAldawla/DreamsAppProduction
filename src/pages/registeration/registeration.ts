import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { log } from 'util';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';

/**
 * Generated class for the RegisterationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;


@Component({
  selector: 'page-registeration',
  templateUrl: 'registeration.html',
})
export class RegisterationPage {

  loading: any;
  responseData : any;
   userData = {"name": "", "username": "","email": "","password": "","password_confirmation": "","fb": "100"};
   passwordType: string = 'password';
   passwordIcon: string = 'eye-off';
  public lang:any;

  public fbData ={"name":"", "username": "","email":"","fb": "1","id":""};
  public twData ={"name":"", "username": "","email":"","fb": "1","id":""};
  public apData ={"name":"", "username": "","email":"","fb": "1","id":""};

  public userDetails : any;
  public visit : any;
  public apple:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    public translate: TranslateService,private fb: Facebook,public afAuth: AngularFireAuth,
    public signInWithApple: SignInWithApple) {
  }

  ionViewCanEnter(){

    const dataa = localStorage.getItem("lan");
    this.lang = dataa;
    console.log(this.lang);

    localStorage.getItem('apple_data');
    this.apple=JSON.parse(localStorage.getItem('apple_data'));
    console.log(this.apple);
    
  }

  login2()
  {
    this.navCtrl.push(LoginPage);
  }

  showPass(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    //this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  singup2()
  {
    this.showLoader5();
      this.authService.postData(this.userData).then((result) => { 
      this.responseData= result;
        console.log(this.responseData); 
      //localStorage.setItem('userData',this.responseData);
      this.loading.dismiss();
    //     this.presentToast("success",this.responseData.Message);

      // this.presentToast("User Registerd Successfully")
      if(this.lang=='en')
      {
        this.presentToast("success",this.responseData.message);
        //this.presentToast("success","Registerd Successfully, Check your email to activate your account")
      }
     else if(this.lang=='ar')
      {
        //this.presentToast("success","تم التسجيل ,الرجاء التحقق من الإيميل لتفعيل الحساب")
        this.presentToast("success",this.responseData.message2);

      }
      this.navCtrl.push(LoginPage);
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("Please Enter Valid Data...");
     //this.presentToast("error",err.error.message);
      this.presentToast("error",JSON.stringify(err.error.errors));
      }); 
  }




  //====================Social===================================//

  Home(){
    const data2 = JSON.parse(localStorage.getItem("visit"));
    this.visit = data2;
  
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data;
    
  //---------------------User-----------------------//
   if(this.userDetails.user_type==3)
    {
      
      this.Getdreams();
  }
  
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
      if(this.lang=='en')
      {
        this.presentToast("error",err.error.error3);
      
      }
      else if(this.lang=='ar')
        {
          this.presentToast("error",err.error.error4);      
        }
    }
    // else{
    //   this.presentToast("error",err.message);
    // }
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
    console.log(res);
    this.twData.name=res.user.displayName;
    this.twData.username=res.additionalUserInfo.username;
    this.twData.email=res.user.email;
    this.twData.id=res.user.uid;
    console.log(this.twData);
    this.singuptw();
    }
    if(this.lang=='en')
      {
      this.presentToast("error","Error connecting to twitter");        
      }
      else if(this.lang=='ar')
        {
      this.presentToast("error","فشل في الإتصال مع تويتر");         
        }
  
  }).catch(ERROR =>{
        this.presentToast("error",JSON.stringify(ERROR .error));
  });

}
//=========================================Apple Login============================================//

signinwithapple()
{
  if(localStorage.getItem('apple_data')!=null)
{
  // this.apple=localStorage.getItem('apple_data');
  this.apData.name=this.apple.name;
  this.apData.username=this.apple.username;
  this.apData.email=this.apple.email;
  this.apData.fb= '1';
  this.apData.id=this.apple.id;
  console.log(this.apData);
  this.singupapple();
}

else if(localStorage.getItem('apple_data')==null)
{
  cordova.plugins.SignInWithApple.signin(
    { requestedScopes: [0, 1] },
    (succ)=>{
    console.log(succ);
    //alert(JSON.stringify(succ))
    this.apData.name=succ.fullName.givenName;
    this.apData.username=succ.fullName.familyName;
    this.apData.email=succ.email;
    this.apData.id=succ.user;
    console.log(this.apData);
    this.singupapple();

    },
    function(err){
      if(this.lang=='en')
      {
        this.presentToast("error","Error connecting to Apple");
      }
      else if(this.lang=='ar')
        {
          this.presentToast("error","فشل في الإتصال مع أبل");
        }
    // console.error(err)
    // console.log(JSON.stringify(err))
    }
    )
}
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

singupapple()
{
    localStorage.setItem('visit','0');
    this.showLoader4();
    this.authService.postData(this.apData).then((result) => { 
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
  
  showLoader4(){
  
    this.loading = this.loadingCtrl.create({
        content: ''
    });
  
    this.loading.present();
  }

showLoader5(){
  if(this.lang=='en')
  {
  this.loading = this.loadingCtrl.create({
      content: 'Registering User...'
  });
}
else if(this.lang=='ar')
{
  this.loading = this.loadingCtrl.create({
    content: '... تسجيل المستخدم'
});
}

  this.loading.present();
}

presentToast(type,msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
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
