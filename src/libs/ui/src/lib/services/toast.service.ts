import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum ToastPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  MIDDLE = 'middle',
}

/* interface ToastParams {
  message: string;
  position?: ToastPosition;
  duration?: number;
  cssClass?: string;
  isBackdropDismiss?: boolean;
}
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly DEFAULT_TIME = 3000;

  constructor(private toastController: ToastController) {}

  async showError(
    message = 'Ocurrió un error al procesar tu solicitud, intenta nuevamente.',
    position = ToastPosition.TOP,
    duration = this.DEFAULT_TIME
  ) {
    await this.validateOpenToast();
    const toast = await this.toastController.create({
      message: message,
      duration,
      cssClass: 'toast-error',
      position,
      icon: 'assets/images/icons/toast/error.svg',
    });
    toast.present();
  }

  async showSuccess(
    message: string,
    position = ToastPosition.TOP,
    duration = this.DEFAULT_TIME
  ) {
    await this.validateOpenToast();
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      cssClass: 'toast-success toast-icon',
      icon: 'assets/images/icons/toast/success.svg',
    });
    toast.present();
  }

  async showInfo(
    message: string,
    position = ToastPosition.TOP,
    duration = this.DEFAULT_TIME
  ) {
    await this.validateOpenToast();
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      cssClass: 'toast-info',
      icon: 'assets/images/icons/toast/info.svg',
    });
    toast.present();
  }

  async showWarning(
    message: string,
    position = ToastPosition.TOP,
    duration = this.DEFAULT_TIME
  ) {
    await this.validateOpenToast();
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      cssClass: 'toast-warning',
      icon: 'assets/images/icons/toast/warning.svg',
    });
    toast.present();
  }

  private async validateOpenToast(): Promise<void> {
    const toast = await this.toastController.getTop();

    if (toast) {
      toast.animated = false;
      await toast.dismiss();
    }
  }
}
