// import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
export interface CurrentImage {
  image: string; // the md5/id of the image in
}
export interface Dimensions {
  width: number;
  height: number;
}

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
  width: number;
  height: number;
}

export interface FontState {
  current: string | null;
  ratios: FontRatioInfo;
}
export interface FontRatioInfo {
  [font: string]: number;
}

export interface RootState {
  current: CurrentImage;
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
