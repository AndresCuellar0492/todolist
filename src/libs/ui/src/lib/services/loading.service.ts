import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../components/loading/loading.component';

const HIGH_PRIORITY = 9999;

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private modal: HTMLIonModalElement | null = null;
  private backButton$: Subscription | null = null;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
  ) {}

  public get isShown(): boolean {
    return this.modal !== null;
  }

  public async show() {
    this.backButton$?.unsubscribe();
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      HIGH_PRIORITY,
      () => {},
    );

    if (this.isShown) {
      return;
    }

    this.modal = await this.modalController.create({
      component: LoadingComponent,
      cssClass: 'modal--transparent',
      canDismiss: false,
    });

    return this.modal.present();
  }

  public async hide(wasSuccess?: boolean): Promise<void> {
    this.backButton$?.unsubscribe();
    this.backButton$ = null;

    if (this.modal) {
      this.modal.canDismiss = true;
      await new Promise<void>((resolve) =>
        setTimeout(async () => {
          await this.modal?.dismiss();
          this.modal = null;
          resolve();
        }, 500),
      );
      return;
    }
  }
}
