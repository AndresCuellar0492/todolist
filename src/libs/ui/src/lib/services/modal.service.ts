import { Injectable, Type } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalProps } from './../organisms/modal-props.interface';

import { OverlayEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modal!: HTMLIonModalElement;
  private isModalOpen = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private modalController: ModalController,
    private platform: Platform
  ) {}

  async show<T>(
    component: Type<T>,
    componentProps?: Partial<T>,
    modalProps?: ModalProps
  ): Promise<any> {
    if (this.isOpen) return;
    this.isModalOpen = true;

    this.modal = await this.modalController.create({
      component,
      componentProps,
      backdropDismiss: modalProps?.backdropDismiss ?? true,
      cssClass: 'modal--transparent',
    });

    this.modal.onDidDismiss().then((detail: OverlayEventDetail<any>) => {
      this.isModalOpen = false;
      return detail.data;
    });

    if (modalProps?.nativeBackButtonAction || modalProps?.disableBackButton) {
      const backButtonSubscription =
        this.platform.backButton.subscribeWithPriority(
          modalProps.disableBackButton ? 9999 : 10,
          () => {
            if (modalProps.nativeBackButtonAction) {
              modalProps.nativeBackButtonAction();
            }
          }
        );

      this.subscriptions.push(backButtonSubscription);

      this.modal.onDidDismiss().then(() => {
        backButtonSubscription.unsubscribe();
        this.subscriptions = this.subscriptions.filter(
          (sub) => sub !== backButtonSubscription
        );
      });
    }

    await this.modal.present();
    return this.modal;
  }

  public get isOpen(): boolean {
    return this.isModalOpen;
  }

  async close(data?: any): Promise<boolean> {
    this.isModalOpen = false;
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
    return this.modalController.dismiss(data);
  }
}
