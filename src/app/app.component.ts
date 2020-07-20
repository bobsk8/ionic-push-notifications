import { Component } from '@angular/core';
import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.initializeFirebase();
    });
  }

  private initializeFirebase() {
    const options: PushOptions = {
      android: {
        senderID: 'Seu codigo aqui'
      }
    }

    const pushObject: PushObject = this.push.init(options)

    pushObject.on('registration').subscribe(res => console.log(` ${res.registrationId}`))

    pushObject.on('notification').subscribe(res => alert(`Já chegou o disco voador: ${res.message}`))
  }
}
