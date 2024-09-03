export abstract class StorageProvider {
  abstract setItem(key: string, value: any): void;
  abstract getItem<T>(key: string): T | null;
  abstract removeItem(key: string): void;
}
