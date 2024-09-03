import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { I18nConfig } from '@libs/base/config/i18n.config';
import { TranslateProvider } from '@libs/base/providers';
import { WelcomeUserComponent } from '@libs/ui/src/lib/components/welcome-user/welcome-user.component';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/remote-config';
import { environment } from 'src/environments/environment.prod';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private translateProvider: TranslateProvider,
    private translateService: TranslateService,
    private modalService: ModalService
  ) {
    this.loadRemoteConfig();
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.translateProvider.loadModule(I18nConfig.modules.DEFAULT).then(() => {
        this.configTranslation();
      });
    });
  }

  private configTranslation() {
    const defaultLang = I18nConfig.defaultLang;

    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

  private async loadRemoteConfig() {
    if (!this.isInitialized()) {
      await firebase.initializeApp(environment.firebaseConfig);
    }

    firebase.remoteConfig().settings.minimumFetchIntervalMillis = 3000;
    await firebase.remoteConfig().fetchAndActivate();
    this.getFeatureFlags();
  }

  async getFeatureFlags() {
    const showWelcome = await this.getRemoteConfig().getBoolean('showWelcome');
    if (showWelcome) {
      this.showModalWelcome();
    }
  }

  isInitialized() {
    return firebase.apps.length > 0;
  }

  private getRemoteConfig(): firebase.remoteConfig.RemoteConfig {
    return firebase.remoteConfig();
  }

  public async showModalWelcome() {
    const modalData = await this.translateProvider.get(
      AppConfig.i18n.modals.welcome
    );
    await this.modalService.show(WelcomeUserComponent, modalData, {
      backdropDismiss: false,
    });
  }
}
