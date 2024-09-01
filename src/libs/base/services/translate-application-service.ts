import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nMessages, TranslateProvider } from 'src/libs/features/commons/src';
import { I18nConfig } from '../config/i18n.config';

@Injectable({ providedIn: 'root' })
export class TranslateApplicationService implements TranslateProvider {
  constructor(
    private translateService: TranslateService,
    private http: HttpClient
  ) {}

  /**
   * Obtiene una traducción instantánea para la clave proporcionada.
   * @param key La clave de traducción a obtener.
   * @returns La traducción como una cadena de texto.
   */

  public get<T = I18nMessages>(
    i18nKey: string,
    interpolateParams?: Record<string, string>
  ): T {
    return this.translateService.instant(i18nKey, interpolateParams);
  }
  /**
   * Carga las traducciones para un módulo o vista específica y las establece en ngx-translate.
   * @param viewName Nombre de la vista para la cual cargar las traducciones.
   */
  public async loadModule(viewName: string): Promise<void> {
    try {
      const currentLang = this.translateService.currentLang || 'es';
      const path = `${I18nConfig.resourceUri}${viewName}/${currentLang}.json`;
      const translations = await this.http
        .get<Record<string, any>>(path)
        .toPromise();

      // Asegura que las traducciones no sean undefined antes de proceder
      if (translations) {
        this.translateService.setTranslation(currentLang, translations, true);
      } else {
        console.error(`No se pudieron cargar las traducciones para ${path}`);
      }
    } catch (error) {
      console.log('error es:  ', error);
    }
  }
}
