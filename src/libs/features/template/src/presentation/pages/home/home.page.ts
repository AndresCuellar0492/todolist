import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {
  IonAlert,
  IonAvatar,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { MainViewRepository } from '@src/libs/features/main-view/src/core/repositories/main-view.repository';
import { BodyTextDirective } from 'src/libs/ui/src/lib/directives/texts/text-body.directive';
import { SubtitleDirective } from 'src/libs/ui/src/lib/directives/texts/text-sub-title.directive';
import { TitleDirective } from 'src/libs/ui/src/lib/directives/texts/text-title.directive';
import { LoadingService } from 'src/libs/ui/src/lib/services/loading.service';
import { MainViewInteractor } from '../../../core/main-view.interactor';
import { MfpMainViewRepository } from '../../../data/repositories/mfp.main-view.repository';

@Component({
  selector: 'app-main-view',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonAlert,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonSkeletonText,
    IonAvatar,
    IonAlert,
    DatePipe,
    RouterModule,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    TranslateModule,
    TitleDirective,
    SubtitleDirective,
    BodyTextDirective,
  ],
  providers: [
    { provide: MainViewInteractor, deps: [MainViewRepository] },
    { provide: MainViewRepository, useClass: MfpMainViewRepository },
    { provide: ModalController },
    { provide: LoadingService },
  ],
})
export class MainViewPage {
  constructor() {}
}
