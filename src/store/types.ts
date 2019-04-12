// import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
export interface CurrentImage {
  current: string; // the md5/id of the image in
}
export interface Dimensions {
  width: number;
  string: number;
}
export type RootState = CurrentImage;

export interface ImageDescriptor extends Dimensions {
  // thin variant on HTMLImageElement that has loaded
  dataUrl: string;
  img: () => HTMLImageElement;
}

export interface ImageCache {
  [md5: string]: ImageDescriptor; // dataURI of the image
}

export interface Config extends Dimensions {
  grayramp: string;
}

export interface FontState {
  current: string | null;
  ratios: FontRatioInfo;
}
export interface FontRatioInfo {
  [font: string]: number;
}

export interface OverallState extends CurrentImage {
  rawImage: ImageCache;
  processedImage: ImageCache;
  config: Config;
  fontInfo: FontState;
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
