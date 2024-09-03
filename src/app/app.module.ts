import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { I18nConfig } from '@libs/base/config/i18n.config';
import { TranslateProvider } from '@libs/base/providers';
import { StorageProvider } from '@libs/base/providers/storage.provider';
import { StorageService } from '@libs/base/services/storage.service';
import { TranslateApplicationService } from '@libs/base/services/translate-application-service';
import { WelcomeUserComponent } from '@libs/ui/src/lib/components/welcome-user/welcome-user.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainViewPageModule } from 'src/libs/features/main-view';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const createTranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(
    http,
    `${I18nConfig.resourcePath}`,
    I18nConfig.suffix
  );

const I18N_CONFIG_TRANSLATE_PROVIDER = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient],
  },
};

@NgModule({
  declarations: [AppComponent, WelcomeUserComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MainViewPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: TranslateProvider, useClass: TranslateApplicationService },
    { provide: StorageProvider, useClass: StorageService },
    TranslatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
