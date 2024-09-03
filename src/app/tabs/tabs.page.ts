import { Component } from '@angular/core';
import { I18nConfig } from '@libs/base/config/i18n.config';
import { TranslateProvider } from '@libs/base/providers';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private translateProvider: TranslateProvider) {
    this.translateProvider.loadModule(I18nConfig.modules.TABS);
  }
}
