import {
  GrayScaler,
  makeGrayScaler,
  makeGrayConverter,
  clampDimensions,
  ctxToGrayScale,
  makeCharConverter
} from "../lib";
import { GetterTree } from 'vuex'
import makeDebugger from '../debug';
const debug = makeDebugger('getters');
import {
  CurrentImage,
  RootState,
  StateMirror,
  OverallGetters, Dimensions, /*, Config, ImageCache */
  ImageDescriptor
} from "./types";

export interface RootGetters {
  font: string;
  fontRatio: number;
  currentRaw: ImageDescriptor;
  currentRawImage: HTMLImageElement;
  currentRawImageDataUrl: string;
  currentRawImageDimensions: Dimensions;
  'config/strHeight': string;
  'config/strWidth': string;
  grayConverter: (g: number) => string;
  clampedDimensions: Dimensions;
  grayScaled: { data: number[], dataUrl: string };
  chArt: string;
}

export function font(state: RootState, getters: RootGetters): string | null {
  return state.fontInfo.current;
}

export function fontRatio(state: RootState, getters: RootGetters): number {
  return state.fontInfo.ratios[getters.font] || 2.125;
}

export function currentRaw(state: RootState, getters: RootGetters): ImageDescriptor {
  return state.rawImage[state.current.image] || { width: 0, height: 0, img: () => new Image() };
}
export function currentRawImage(state: RootState, getters: RootGetters) {
  const { img } = getters.currentRaw;
  return img ? img() : new Image();
}
export function currentRawImageDataUrl(state: RootState, getters: RootGetters): string {
  return getters.currentRaw.dataUrl || "";
}
export function currentRawImageDimensions(
  state: RootState,
  getters: RootGetters
): Dimensions {
  const { width = 0, height = 0 } = getters.currentRaw.img();
  return { width, height };
}

export function clampedDimensions(state: RootState, getters: RootGetters): Dimensions {
  const raw = getters.currentRawImageDimensions;
  const max = state.config;
  const { fontRatio } = getters;
  const [width, height] = clampDimensions({
    width: raw.width,
    height: raw.height,
    maxWidth: max.width,
    maxHeight: max.height,
    fontRatio
  });
  return { width, height };
}
// grayscaler
export function grayScaled(state: RootState, getters: RootGetters): { data: null | number[], dataUrl: string } {
  const grayScaler = makeGrayScaler();
  const canvas = document.createElement("canvas");
  debug(getters.clampedDimensions);
  const { height, width } = getters.clampedDimensions;

  const img = getters.currentRawImage;
  canvas.height = height || 2;
  canvas.width = width || 2;
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    return {
      data: null,
      dataUrl: ""
    };
  }
  ctx.drawImage(img, 0, 0, width, height);
  const [grayScaled, target] = ctxToGrayScale(ctx, width, height, grayScaler);
  ctx.putImageData(target, 0, 0);
  return {
    data: grayScaled,
    dataUrl: canvas.toDataURL()
  };
}
export function grayConverter(state: RootState, getters: RootGetters) {
  return makeGrayConverter(state.config.grayramp);
}

export function chArt(state: RootState, getters: RootGetters) {
  debug('chArt generated')
  const {
    grayConverter,
    grayScaled: { data },
    clampedDimensions: { width }
  } = getters;
  return makeCharConverter(data, grayConverter, width);
}
// grayScaler(state, getters, rootState): GrayScaler {
//   return rootState.config
// },
export function urlObj(
  state: RootState,
  getters: RootGetters,
): StateMirror {
  return {
    raw: state.current.image,
    width: getters["config/strWidth"],
    height: getters["config/strHeight"],
    grayramp: state.config.grayramp
  };
}
const getters: GetterTree<RootState, RootState> = {
  urlObj,
  font,
  fontRatio,
  currentRaw,
  currentRawImage,
  currentRawImageDataUrl,
  currentRawImageDimensions,
  grayConverter,
  clampedDimensions,
  grayScaled,
  chArt,
}
export default getters;
