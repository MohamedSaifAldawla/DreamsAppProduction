import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DreamInfoPage } from '../pages/dream-info/dream-info';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterationPage } from '../pages/registeration/registeration';
import { RestorePage } from '../pages/restore/restore';
import { DreamsPage } from '../pages/dreams/dreams';
import { ContactPage } from '../pages/contact/contact';
import { AddPage } from '../pages/add/add';
import { ProfilePage } from '../pages/profile/profile';
import { InterpretorProfilePage } from '../pages/interpretor-profile/interpretor-profile';
import { PackagesPage } from '../pages/packages/packages';
import { IHomePage } from '../pages/i-home/i-home';
import { PaymentPage } from '../pages/payment/payment';
import { LangPage } from '../pages/lang/lang';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any=LangPage;  
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public translate: TranslateService ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();   
    });
  }
}
