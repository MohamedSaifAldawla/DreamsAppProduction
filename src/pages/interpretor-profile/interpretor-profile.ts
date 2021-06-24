import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the InterpretorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-interpretor-profile',
  templateUrl: 'interpretor-profile.html',
})
export class InterpretorProfilePage {

  public responseData : any;
  public userDetails : any;
  public stats : any;
  public lang:any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,public translate: TranslateService) {

      const dataa = localStorage.getItem("lan");
      this.lang = dataa;
      console.log(this.lang);

    const data = JSON.parse(localStorage.getItem("userData"));
    this.responseData = data;

    const data2 = JSON.parse(localStorage.getItem("userStats"));
    this.stats = data2;

  }


}
