import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform   } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { IDreamsPage } from '../../pages/i-dreams/i-dreams';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the IDreamsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-i-dreams-info',
  templateUrl: 'i-dreams-info.html',
})
export class IDreamsInfoPage {

  recording: boolean = false;
  filePath: any;
  fileName: any;
  audio: MediaObject;
  audioList: any[] = [];

  public responseData : any;
  public isToggled: boolean;
  loading: any;
  dreamData = {"dtype":"1","id":"","ibody":""};
  public lang:any;

  constructor(public navCtrl: NavController, private transfer: FileTransfer, public navParams: NavParams, public authService:AuthServiceProvider, 
    public loadingCtrl: LoadingController, private toastCtrl: ToastController, private media: Media, private file: File, public platform: Platform) {

      const dataa = localStorage.getItem("lan");
    this.lang = dataa;
    console.log(this.lang);
    
    const data = JSON.parse(localStorage.getItem("dreamData"));
    this.responseData = data;
    this.dreamData.id = this.responseData.id;
  }

  ionViewDidLoad() {}

  notify() { this.isToggled = !this.isToggled; } 


  Reply()
  {
    if(this.dreamData.dtype=='1')
    {
      console.log(this.dreamData);
      this.showLoader();
      this.authService.Reply(localStorage.getItem("access_token"),
      this.dreamData).then((result) => { 
      this.responseData= result;
      //console.log(this.responseData); 
      this.loading.dismiss();
      if(this.lang=='en'){
        this.presentToast("success","Dream Solved ");
      }
      else if(this.lang=='ar'){
        this.presentToast("success","تم تفسير الحلم");
      }
      this.navCtrl.push(IDreamsPage);
      }, (err) => { 
      console.log(err); 
      this.loading.dismiss();
      //this.presentToast("err");
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
    else if(this.dreamData.dtype=='0')
    {
      this.uploadFile();
      // this.navCtrl.push(IDreamsPage);
    }
  }

  //------------------------------------Return----------------------------------------------//

  Return()
{
  console.log(this.dreamData.id); 
  this.showLoader();
  this.authService.Return(localStorage.getItem("access_token"),
  this.dreamData.id).then((result) => { 
  this.responseData= result;
    console.log(this.responseData); 
   // localStorage.setItem('userData',this.responseData);
   this.loading.dismiss();
   if(this.lang=='en'){
    this.presentToast("success","Returned Successfully")
    }
  else if(this.lang=='ar'){
    this.presentToast("success","تم إرجاع الحلم");
  }
    this.navCtrl.push(IDreamsPage);
    }, (err) => { 
    console.log(err); 
    this.loading.dismiss();
    // this.presentToast("Connection Error...");
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

//------------------------------------UPLOAD----------------------------------------------//

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
     loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'ivoice',
      fileName: this.fileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      httpMethod : 'post',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
      'Accept': 'application/json'
      },
      
      //-------------------------------Params------------------------------------------//
      
      params :{ 
      'dtype':this.dreamData.dtype,
      'id':this.dreamData.id
    }
     
      
    }

    console.log(this.dreamData.dtype);
    console.log(this.dreamData.id);
    // fileTransfer.upload(this.filePath, 'http://10.117.18.35:8000/api/dreams', options)
     fileTransfer.upload(this.filePath, 'https://dreamsapp.net/api/interpret/reply', options)
    //fileTransfer.upload(this.filePath, 'http://196.1.228.150:8000/api/voice4', options)
      .then((data) => {
      //console.log(data+" Created Successfully ");
      console.log(data);
      loader.dismiss();
      if(this.lang=='en'){
        this.presentToast("success","Dream Solved ");
      }
      else if(this.lang=='ar'){
        this.presentToast("success","تم تفسير الحلم");
      }
      this.navCtrl.push(IDreamsPage);
    }, (err) => {
      console.log(err);
       loader.dismiss();
      //this.presentToast(err);
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

//--------------------------------------End-UPLOAD-----------------------------------------------//

//----------------------------------------Voice--------------------------------------------------//

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  startRecord() {
    if (this.platform.is('ios')) {
     this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
     this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;

     // Stop recording after 10 sec
    //  var recTime = 0;
    //  var recInterval = setInterval(function() {
    //      recTime = recTime + 1;
    //      setAudioPosition(recTime + " sec");
    //      if (recTime >= 10) {
    //          clearInterval(recInterval);
    //          this.audio.stopRecord();
    //      }
    //  }, 1000);

    // Stop recording after 10 seconds
  //   setTimeout(function() {
  //     this.stopRecord();
  // }, 10000);


  }

  stopRecord() {
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
    this.audio.setVolume(1.8);
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
      content: 'Returning, Please Wait ...'
  });

  }
  else if(this.lang=='ar'){
    this.loading = this.loadingCtrl.create({
      content: '... إرجاع الحلم ,الرجاء الإنتظار'
  });

  }
 
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
  });

  toast.present();
}




}
