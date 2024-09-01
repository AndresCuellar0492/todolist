import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  AnimationOptions,
  NavigationOptions,
} from '@ionic/angular/common/providers/nav-controller';
import { NavigatorProvider } from '../providers';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService implements NavigatorProvider {
  private isNavigationInProgress: boolean = false;

  constructor(private navCtrl: NavController, private router: Router) {}

  public async navigateForward(
    url: string | UrlTree | any[],
    options?: NavigationOptions
  ): Promise<boolean> {
    if (this.isNavigationInProgress) return false;
    this.isNavigationInProgress = true;
    const result = await this.navCtrl.navigateForward(url, options);
    this.isNavigationInProgress = false;
    return result;
  }

  public async navigateBack(
    url: string | UrlTree | any[],
    options?: NavigationOptions
  ): Promise<boolean> {
    if (this.isNavigationInProgress) return false;
    this.isNavigationInProgress = true;
    const result = await this.navCtrl.navigateBack(url, options);
    this.isNavigationInProgress = false;
    return result;
  }

  public async navigateRoot(
    url: string | UrlTree | any[],
    options?: NavigationExtras
  ): Promise<boolean> {
    if (this.isNavigationInProgress) return false;
    this.isNavigationInProgress = true;
    const result = await this.navCtrl.navigateRoot(url, options);
    history.replaceState(null, '', url.toString());
    this.isNavigationInProgress = false;
    return result;
  }

  public back(options?: AnimationOptions): void {
    if (this.isNavigationInProgress) return;
    this.isNavigationInProgress = true;
    this.navCtrl.back(options);
    this.isNavigationInProgress = false;
  }
}
