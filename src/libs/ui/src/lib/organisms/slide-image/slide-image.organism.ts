import { Component, Input, OnInit } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonTextarea,
} from '@ionic/angular/standalone';
import { NavigatorProvider } from '@src/libs/base/providers';
import { SwiperOrganismComponent } from '@src/libs/ui/src/lib/organisms/swiper-organism/swiper.organism';
import { ModalService } from '@src/libs/ui/src/lib/services/modal.service';

@Component({
  selector: 'app-slide-image',
  templateUrl: './slide-image.organism.html',
  styleUrls: ['./slide-image.organism.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonButton,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    SwiperOrganismComponent,
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SlideImageOrganism implements OnInit {
  @Input() imagesData!: string[];
  @Input() pathStorage!: string;
  @Input() isImageLocal = false;

  constructor(
    private modalService: ModalService,
    private navigatorProvider: NavigatorProvider,
  ) {}

  ngOnInit() {
    console.log('');
  }

  goBack() {
    if (this.modalService.isOpen) {
      this.modalService.close();
      return;
    }

    this.navigatorProvider.back();
  }
}
