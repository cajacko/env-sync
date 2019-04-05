export type EnvVal = string | boolean;

export interface IConfig {
  keys: string[];
  file: string;
}

export interface IExtendedConfig extends IConfig {
  envSyncPath: string;
}
