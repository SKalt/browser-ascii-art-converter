// import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
export interface CurrentImage {
  current: string; // the md5/id of the image in
}
export type RootState = CurrentImage;

export interface ImageCache {
  [md5: string]: string; // dataURI of the image
}

export interface Config {
  width: number;
  height: number;
  grayramp: string;
}

export interface FontState {
  current: string | null;
}
export interface FontRatioInfo {
  [font: string]: number;
}

export interface OverallState extends CurrentImage {
  rawImage: ImageCache;
  processedImage: ImageCache;
  config: Config;
  fontInfo: FontInfo;
}

export interface OverallGetters {
  "config/strWidth": string;
  "config/strHeight": string;
  "config/grayramp": string;
}

// for the URL
export interface StateMirror {
  raw: string;
  width: string;
  height: string;
  grayramp: string;
}
