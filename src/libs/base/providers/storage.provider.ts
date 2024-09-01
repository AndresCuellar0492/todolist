export abstract class StorageProvider {
  // Establecer un valor en el almacenamiento
  abstract set(key: string, value: string): Promise<void>;

  // Obtener un valor del almacenamiento
  abstract get(key: string): Promise<string | null>;

  // Eliminar un valor del almacenamiento
  abstract remove(key: string): Promise<void>;

  // Limpiar todo el almacenamiento
  abstract clear(): Promise<void>;
}
