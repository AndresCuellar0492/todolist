export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

interface CacheConfig {
  [key: string]: any;
  keys?: Record<string, string>;
  ttls?: Record<string, number>;
  groupKeys?: Record<string, string>;
}

interface I18nConfig {
  [key: string]: any;
  moduleKey?: string;
}

export abstract class ModuleConfigProvider {
  public i18n?: I18nConfig;
  public cache?: CacheConfig;
  public applicationData?: Record<string, string>;
}
