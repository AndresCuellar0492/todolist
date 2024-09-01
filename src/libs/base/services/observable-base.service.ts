import { Subject, Subscription } from 'rxjs';

export abstract class ObservableBaseService<T> {
  public subject = new Subject<T>();
  private subscription!: Subscription;

  public subscribe(handler: (params: T) => void) {
    this.subscription = this.subject.subscribe(handler);
  }

  public unsubscribe(): void {
    this.subscription?.unsubscribe();
  }

  public emit(model: T): void {
    this.subject.next(model);
  }
}
