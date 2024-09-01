import { UrlTree } from '@angular/router';
import {
  AnimationOptions,
  NavigationOptions,
} from '@ionic/angular/common/providers/nav-controller';

export abstract class NavigatorProvider {
  public abstract navigateForward(
    url: string | UrlTree | any[],
    options?: NavigationOptions
  ): Promise<boolean>;

  public abstract navigateBack(
    url: string | UrlTree | any[],
    options?: NavigationOptions
  ): Promise<boolean>;

  public abstract navigateRoot(
    url: string | UrlTree | any[],
    options?: NavigationOptions
  ): Promise<boolean>;

  public abstract back(options?: AnimationOptions): void;
}
