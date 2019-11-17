import { HttpClientModule } from  '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TranslateService } from '@ngx-translate/core';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ITabsPage } from '../pages/i-tabs/i-tabs';
import { LoginPage } from '../pages/login/login';
import { HelpPage } from '../pages/help/help';
import { DreamInfoPage } from '../pages/dream-info/dream-info';
import { ArticlesPage } from '../pages/articles/articles';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterationPage } from '../pages/registeration/registeration';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestorePage } from '../pages/restore/restore';
import { DreamsPage } from '../pages/dreams/dreams';
import { AddPage } from '../pages/add/add';
import { NotificationsPage } from '../pages/notifications/notifications';
import { PackagesPage } from '../pages/packages/packages';
import { InterpretorProfilePage } from '../pages/interpretor-profile/interpretor-profile';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { IHomePage } from '../pages/i-home/i-home';
import { IDreamsPage } from '../pages/i-dreams/i-dreams';
import { IDreamsInfoPage } from '../pages/i-dreams-info/i-dreams-info';
import { PaymentPage } from '../pages/payment/payment';
import { LangPage } from '../pages/lang/lang';
import { LanguagePage } from '../pages/language/language';


import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


 // Your web app's Firebase configuration
 const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCNUR6X4fW05TcHbpSLQtGR2Kw_DmOIQWY",
    authDomain: "ioniclogintwitter.firebaseapp.com",
    databaseURL: "https://ioniclogintwitter.firebaseio.com",
    projectId: "ioniclogintwitter",
    storageBucket: "",
    messagingSenderId: "36536793169",
    appId: "1:36536793169:web:837b408c65cbada8"
  }
};
// Initialize Firebase

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    ITabsPage,
    RegisterationPage,
    RestorePage,
    DreamsPage,
    AddPage,
    HelpPage,
    DreamInfoPage,
    ArticlesPage,
    ProfilePage,
    InterpretorProfilePage,
    PackagesPage,
    NotificationsPage,
    IHomePage,
    IDreamsPage,
    IDreamsInfoPage,
    PaymentPage,
    LangPage,
    LanguagePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    TranslateModule.forRoot(
      {
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
      }),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    ITabsPage,
    RegisterationPage,
    RestorePage,
    DreamsPage,
    AddPage,
    HelpPage,
    DreamInfoPage,
    ArticlesPage,
    ProfilePage,
    InterpretorProfilePage,
    PackagesPage,
    NotificationsPage,
    IHomePage,
    IDreamsPage,
    IDreamsInfoPage,
    PaymentPage,
    LangPage,
    LanguagePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TwitterConnect,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    FileTransfer,
  FileTransferObject,
    MediaCapture, 
    Media,
    File,
    Facebook,
    TranslateService,
    InAppPurchase
  ]
  
})
export class AppModule {}
