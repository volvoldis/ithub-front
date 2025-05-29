export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  src: string;
  html: string;
  dist: string;
  env: string;
  static: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
}
