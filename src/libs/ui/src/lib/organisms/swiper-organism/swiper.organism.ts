import { NgFor, NgIf } from '@angular/common';
import {
  AfterContentChecked,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IonicSlides } from '@ionic/angular/standalone';
import { environment } from '@src/environments/environment';
import Swiper from 'swiper';

@Component({
  selector: 'app-swiper-organism',
  templateUrl: './swiper.organism.html',
  styleUrls: ['./swiper.organism.scss'],
  standalone: true,
  imports: [NgFor, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperOrganismComponent implements AfterContentChecked {
  swiperModules = [IonicSlides];
  @Input() imagesData!: string[];
  @Input() pathStorage!: string;
  @Input() isImageLocal = false;
  public ready = false;
  @ViewChild('swiper')
  pathImages!: string;

  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  images: string[] = [];

  ngAfterContentChecked() {
    this.pathImages = environment.pathImages;
  }

  public getImage(image: string) {
    return this.isImageLocal
      ? image
      : this.pathImages + this.pathStorage + image;
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }

  public swiperSlideChanged(event: any) {
    //console.log('change:  ', event);
  }
}

/*   images = [
    'https://www.laclinicaveterinaria.com/wp-content/uploads/2022/02/Captura-de-pantalla-2022-02-02-a-las-13.49.23_resultado-scaled.webp',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1488229297570-58520851e868',
  ]; */
