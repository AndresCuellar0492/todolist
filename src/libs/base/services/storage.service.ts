import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { StorageProvider } from '../providers/storage.provider';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements StorageProvider {
  constructor() {}

  // Establecer una preferencia
  async set(key: string, value: string): Promise<void> {
    try {
      await Preferences.set({
        key,
        value,
      });
    } catch (error) {
      console.error('Error setting preference', error);
    }
  }

  // Obtener una preferencia
  async get(key: string): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key });

      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error('Error getting preference', error);
      return null;
    }
  }

  // Eliminar una preferencia
  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error('Error removing preference', error);
    }
  }

  // Limpiar todas las preferencias
  async clear(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('Error clearing preferences', error);
    }
  }
}
