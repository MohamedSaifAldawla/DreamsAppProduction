import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform   } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { MediaPlugin } from '@ionic-native/media';
import { StatusBar } from '@ionic-native/status-bar';
import { MediaCapture,CaptureError } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { DreamsPage } from '../../pages/dreams/dreams';
import { PaymentPage } from '../../pages/payment/payment';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';

//const MEDIA_FILES_KEY = 'mediaFiles';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  recording: boolean = false;
  filePath: any ={};
  fileName: any ={};
  audio: MediaObject;
  //audio: MediaObject= this.media.create('path/to/file.mp3');
  audioList: any[] = [];
  mediaTimer: any;
  public setAudioPosition: any;

  mediaFiles = [];
  public isToggled: boolean;
  loading: any;
  public responseData : any;
  dreamData = {"dtype":"1","package":"","language":"0","age":"","body":"","gender":"0","social":"0","job":"0"};
  public sec: number=0.001;
  public myVar:any;
  public lang:any;
  public count:any;
  public i:any;
  public play = 0;


  constructor(public navCtrl: NavController, private transfer: FileTransfer, public navParams: NavParams, public authService:AuthServiceProvider, 
    public loadingCtrl: LoadingController, private toastCtrl: ToastController, private media: Media, private file: File, public platform: Platform,
    public translate: TranslateService,public alertCtrl: AlertController) {
  
      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);
      this.age();

      //console.log(localStorage.getItem("access_token")) ;
      const data = JSON.parse(localStorage.getItem("packageData"));
      this.responseData = data;
      //console.log(this.responseData);
      this.dreamData.package=this.responseData.id;
    }

   
      
    notify() {
      this.isToggled = !this.isToggled;
        
      } 

      txtCount(){
        if(this.count==-1|| this.count==0)
        {
          this.count=0;
        }
        if(this.dreamData.body.length < this.responseData.text)
        {
        this.count=this.responseData.text-this.dreamData.body.length;
        console.log(this.count);
        }
      }

    age(){
        
      for(let i = 1940; i <= 2015; i++){
         this.i=i;
         //console.log(this.i);
      } 
     }

    range(){console.log(this.dreamData.age);}

    ionViewDidLeave(){
      if(this.play==1)
      {
    this.audio.stop();    
      } 
    }
//------------------------------------ADD-DREAM----------------------------------------------//

  addD()
  {
    //console.log(this.dreamData);
    //this.audio.stop();
    if(this.dreamData.dtype=='1')
    {
      //console.log(this.dreamData);
      this.showLoader();
      this.authService.AddDream(localStorage.getItem("access_token"),
      this.dreamData).then((result) => { 
      this.responseData= result;
      console.log(this.responseData); 
      localStorage.setItem('Dream',JSON.stringify(this.responseData.Dream));
      console.log(this.responseData.Dream); 
      this.loading.dismiss();
      if(this.lang=='en')
      {
      this.presentToast("success","Dream Send Successfully");
      }
      else if(this.lang=='ar')
      {
      this.presentToast("success","تم إرسال الحلم بنجاح");

      }
      this.showLoader2();
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      // this.presentToast("err");
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
    else if(this.dreamData.dtype=='0')
    {
      //this.audio.stop();
      this.uploadFile();
      // this.navCtrl.push(DreamsPage);
    }
  }

//------------------------------------UPLOAD----------------------------------------------//

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
     loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'voice',
      fileName: this.fileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      httpMethod : 'Post',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
      'Accept': 'application/json'
      },
      
      //-------------------------------Params------------------------------------------//
      
      params :{ 
      'dtype':this.dreamData.dtype,
      'package':this.dreamData.package,
      'language':this.dreamData.language,
      'gender':this.dreamData.gender,
      'social':this.dreamData.social,
      'job':this.dreamData.job }
     
      
    }
    //console.log(this.dreamData);
     fileTransfer.upload(this.filePath, this.authService.apiUrl+'api/dreams', options)
    //  fileTransfer.upload(this.filePath, 'https://dreamsapp.net/api/dreams', options)
      .then((result) => {
      // console.log(data+" Created Successfully ");
      this.responseData=result;
     // console.log(result.response);
      loader.dismiss();
      localStorage.setItem('Dream',(this.responseData.response));
      console.log(this.responseData.response); 
      if(this.lang=='en')
      {
      this.presentToast("success","Dream Send Successfully");
      }
      else if(this.lang=='ar')
      {
      this.presentToast("success","تم إرسال الحلم بنجاح");

      }
      this.showLoader2();
    }, (err) => {
      console.log(err);
       loader.dismiss();
      //this.presentToast(err);
     this.presentToast("error",err.message);
    });
  }

//--------------------------------------End-UPLOAD-----------------------------------------------//

//----------------------------------------Voice--------------------------------------------------//

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  start() {
    this.audioList=[];
    if (this.platform.is('ios')) {
     this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
     else if (this.platform.is('android')) {
     this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }

    // else if (this.platform.is('browser')) {
    //   this.media.create('path/to/file.mp3');
    //  }
    this.audio.startRecord();
    this.recording = true;
   

   this.myVar=setTimeout(()=>{
    this.StopRecord();
    if(this.lang=='en')
      {
    this.presentToast("error","Recording Limit Exceeded, Upgrade Your Package Please To Record More .");
      }
      else if(this.lang=='ar')
      {
      this.presentToast("error","لقد تم تخطي عدد ثواني الباقه المسموح بها");

      }
    stop();
  },this.responseData.voice/this.sec)

  // console.log(this.setAudioPosition);
  }

  StopRecord() {
    clearTimeout(this.myVar);
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.play=1;
    this.audio.setVolume(1.8);

}

  stopAudio() {
    clearInterval(this.mediaTimer);
    this.mediaTimer = null;
    this.audio.stop();
  }

  pauseAudio() {
   
    //  SeekTo to 10 seconds after 5 seconds
      this.audio.getCurrentPosition().then((position) => {
        this.setAudioPosition=position;
        console.log((this.setAudioPosition) + " sec");
        // this.audio.seekTo(this.setAudioPosition);
        clearInterval(this.mediaTimer);
        this.mediaTimer = null;
        this.audio.pause();
  });
}

  resumeAudio() {
    this.audio.getCurrentPosition().then((position) => {
      this.setAudioPosition=position;
      console.log((this.setAudioPosition));
      // this.audio.play();
      this.audio.seekTo(this.setAudioPosition);
      console.log((this.setAudioPosition));
})

  }

  showConfirm() {
    if(this.lang=='en'){
      const confirm = this.alertCtrl.create({
        title: 'Delete And Record New Voice ?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              //console.log('Yes clicked');
              this.audio.stop();
              this.audioList=[];
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
        title: 'هل تريد حذف هذا التسجيل ؟',
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
              this.audio.stop();
              this.audioList=[];
            }
          }
        ]
      });
      confirm.present();
    }
    
  }

  
//--------------------------------------Loaders--------------------------------------//
showLoader(){
  if(this.lang=='en'){
    this.loading = this.loadingCtrl.create({
      content: 'Sending, Please Wait ...'
  });
  }
  else if(this.lang=='ar'){
    this.loading = this.loadingCtrl.create({
      content: '... جاري الإرسال ,الرجاء الإنتظار'
  });
  }

  this.loading.present();
}

showLoader2(){
  if(this.lang=='en'){
    this.loading = this.loadingCtrl.create({
      content: 'Getting Dream Details'
  });
  }
  else if(this.lang=='ar'){
    this.loading = this.loadingCtrl.create({
      content: '... جلب بيانات الحلم'
  });
  }
  this.loading.present();
  setTimeout(()=>{
    this.loading.dismiss();
    this.navCtrl.push(PaymentPage);
  },5000)
}

presentToast(type,msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 10000,
    position: 'top',
    cssClass:type,
    // dismissOnPageChange: true
  });

  toast.onDidDismiss(() => {
  });

  toast.present();
}


// captureAudio() {
    //   this.mediaCapture.captureAudio().then(res => {
    //     this.storeMediaFiles(res);
    //   }, (err: CaptureError) => console.error(err));
    // }
    
    // play(myFile) {
    //     const audioFile: MediaObject = this.media.create(myFile.localURL);
    //     audioFile.play();
    // }
   
    // storeMediaFiles(files) {
    //   this.storage.get(MEDIA_FILES_KEY).then(res => {
    //     if (res) {
    //       let arr = JSON.parse(res);
    //       arr = arr.concat(files);
    //       this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
    //     } else {
    //       this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
    //     }
    //     this.mediaFiles = this.mediaFiles.concat(files);
    //   })
    // }

}









