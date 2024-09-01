import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageProvider } from '../providers/image.provider';

@Injectable({
  providedIn: 'root',
})
export class ImageService implements ImageProvider {
  constructor() {}

  // Método para obtener una imagen desde la galería
  public async getImageFromGallery(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos, // Usar la galería
      });

      return image.base64String
        ? `data:image/jpeg;base64,${image.base64String}`
        : null;
    } catch (error) {
      console.error('Error obteniendo la imagen desde la galería', error);
      return null;
    }
  }

  // Método para obtener una imagen usando la cámara
  public async getImageFromCamera(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera, // Usar la cámara
      });

      return image.base64String
        ? `data:image/jpeg;base64,${image.base64String}`
        : null;
    } catch (error) {
      console.error('Error obteniendo la imagen desde la cámara', error);
      return null;
    }
  }
}
