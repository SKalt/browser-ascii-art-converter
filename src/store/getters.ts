import {
  GrayScaler,
  makeGrayScaler,
  makeGrayConverter,
  clampDimensions,
  ctxToGrayScale,
  makeCharConverter
} from "../lib";
import makeDebugger from '../debug';
const debug = makeDebugger('getters');
import {
  CurrentImage,
  RootState,
  StateMirror,
  OverallGetters, Dimensions /*, Config, ImageCache */
} from "./types";

export interface RootGetters {
  font: string;
  fontRatio: number;
  currentRaw: ImageDescriptor;
  currentRawImage: HTMLImageElement;
  currentRawImageDataUrl: string;
  currentRawImageDimensions: Dimensions;
}

export function font(state, getters: RootGetters, rootState, rootGetters) {
  return rootState. fontInfo.current;
}

export function fontRatio(state, getters, rootState) {
  return rootState.fontInfo.ratios[getters.font] || 2.125;
}

export function currentRaw(state, getters, rootState) {
  return rootState.rawImage[state.current] || { width: 0, height: 0 };
}
export function currentRawImage(state, getters) {
  const { img } = getters.currentRaw;
  return img ? img() : new Image();
}
export function currentRawImageDataUrl(state, getters, rootState): string {
  return getters.currentRaw.dataUrl || "";
}
export function currentRawImageDimensions(
  state: any,
  getters: RootGetters
): Dimensions {
  const { width = 0, height = 0 } = getters.currentRaw;
  return { width, height };
}

export function clampedDimensions(state, getters, rootState) {
  const raw = getters.currentRawImageDimensions;
  const max = rootState.config;
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
export function grayScaled(state, getters) {
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
export function grayConverter(state, getters, rootState) {
  return makeGrayConverter(rootState.config.grayRamp);
}
export function chArt(state, getters) {
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
  state,
  ignoredGetters,
  rootState,
  rootGetters: OverallGetters
): StateMirror {
  return {
    raw: state.current,
    width: rootGetters["config/strWidth"],
    height: rootGetters["config/strHeight"],
    grayramp: rootState.config.grayramp
  };
}
