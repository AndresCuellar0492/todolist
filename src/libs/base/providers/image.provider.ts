export abstract class ImageProvider {
  // Método para obtener una imagen desde la galería
  abstract getImageFromGallery(): Promise<string | null>;

  // Método para obtener una imagen usando la cámara
  abstract getImageFromCamera(): Promise<string | null>;
}
