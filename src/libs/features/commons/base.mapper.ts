export abstract class BaseMapper<Target> {
  public abstract from(...args: unknown[]): Target;

  public fromList(fromTypeList: unknown[]): Target[] {
    return fromTypeList.map((model) => this.from(model)) as Target[];
  }
}
