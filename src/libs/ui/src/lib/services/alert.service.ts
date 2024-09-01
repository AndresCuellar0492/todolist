import { Injectable } from '@angular/core';
import { AlertButton, AlertController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

export interface AlertHandler {
  accept?: () => void;
  cancel?: () => void;
}

export interface AlertButtons {
  accept?: string;
  cancel?: string;
}

export interface AlertMessage {
  header: string;
  message: string;
  buttons?: AlertButtons;
}

export interface AlertParameters {
  texts: AlertMessage;
  handlers?: AlertHandler;
  backdropDismiss?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  public cssClass = 'doggy-alert';

  private subscription!: Subscription;
  private alertList: HTMLIonAlertElement[] = [];

  constructor(
    private alertController: AlertController,
    private platform: Platform,
  ) {}

  public async show({
    texts,
    handlers,
    backdropDismiss = true,
  }: AlertParameters): Promise<void> {
    const { accept = '', cancel } = texts?.buttons || {};

    // Configuración de botones
    const buttons: AlertButton[] = [
      {
        text: accept,
        handler: handlers?.accept,
      },
    ];

    if (cancel) {
      buttons.unshift({
        text: cancel,
        handler: handlers?.cancel,
      });
    }

    // Creación de la alerta
    const alert = await this.alertController.create({
      header: texts?.header,
      cssClass: this.cssClass,
      message: texts?.message,
      buttons,
      backdropDismiss,
      mode: 'md',
    });

    // Presentación de la alerta
    await alert.present();

    // Agregar la alerta a la lista
    this.alertList.push(alert);

    // Configurar acción del botón de retroceso
    this.handleBackButtonAction(texts, handlers);

    // Esperar a que la alerta se cierre
    await alert.onDidDismiss();

    // Manejo de suscripciones y limpieza
    this.cleanupAlert(alert);
  }

  public async showError({
    texts,
    backdropDismiss = true,
  }: AlertParameters): Promise<void> {
    // Configuración de los botones de la alerta
    const defaultButtonText = 'Listo';
    const buttons: AlertButton[] = [
      {
        text: texts?.buttons?.accept ?? defaultButtonText,
      },
    ];

    // Configuración del mensaje de la alerta
    const defaultMessage = 'Por favor inténtalo más tarde';
    const message = texts?.message?.trim() || defaultMessage;

    // Creación de la alerta
    const alert = await this.alertController.create({
      header: 'Ha ocurrido un error',
      cssClass: this.cssClass,
      message,
      buttons,
      backdropDismiss,
      mode: 'md',
    });

    // Presentación de la alerta
    await alert.present();

    // Agregar la alerta a la lista
    this.alertList.push(alert);

    // Esperar a que la alerta se cierre
    await alert.onDidDismiss();

    // Manejo de suscripciones y limpieza
    this.cleanupAlert(alert);
  }

  private cleanupAlert(alert: HTMLIonAlertElement): void {
    const alertIndex = this.alertList.indexOf(alert);
    if (alertIndex > -1) {
      this.alertList.splice(alertIndex, 1);
    }
    this.subscription?.unsubscribe();
  }

  private handleBackButtonAction(
    messages: AlertMessage,
    handlers?: AlertHandler,
  ) {
    if (handlers?.accept || handlers?.cancel) {
      this.subscription = this.platform.backButton.subscribeWithPriority(
        101,
        (processNextHandler: Function) => {
          if (messages?.buttons?.cancel) {
            handlers.cancel?.();
          } else if (handlers.accept) {
            handlers.accept?.();
          }

          processNextHandler();
        },
      );
    }
  }
}
