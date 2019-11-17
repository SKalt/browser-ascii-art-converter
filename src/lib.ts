/* inspired/based off of
https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art.html
and its associated repo, https://github.com/jpetitcolas/ascii-art-converter.
*/

import makeDebugger from './debug'
const debug = makeDebugger('lib')

import GraphemeSplitter from 'grapheme-splitter';
const splitter = new GraphemeSplitter();

type RGB = [number, number, number] | Uint8Array;
type RGBA = [number, number, number, number];
export type GrayScaler = (color: RGBA) => number;

export const DEFAULT_RAMP =
  "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

export function makeGrayScaler(weights: RGB = [0.21, 0.72, 0.07]): GrayScaler {
  return function grayScale(color: RGBA = [0, 0, 0, 0]): number {
    const alpha = (color[3] || 0) / 255;
    if (!alpha || alpha <= .01) {
      return 255; // interpret "blank" as "white"
    } else {
      return (
        color[0] * alpha * weights[0]
        + color[1] * alpha * weights[1]
        + color[2] * alpha * weights[2]
      );
    }
  };
}

export function makeGrayConverter(ramp: string = DEFAULT_RAMP) {
  const grayramp = splitter.splitGraphemes(ramp);
  return function grayToCharacter(gray: number): string {
    return grayramp[Math.ceil((grayramp.length - 1) * (gray / 255))] || '';
  };
}

export function makeCharConverter(
  gray: number[],
  grayConverter: (g: number) => string,
  width: number
) {
  return gray.reduce((chars, gray, index) => {
    return (chars +=
      grayConverter(gray) + ((index + 1) % width === 0 ? "\n" : ""));
  }, "");
}

export function getMonospaceFontRatio(
  doc: HTMLDocument,
  font: string = "monospace"
): number {
  const pre = doc.createElement("pre");
  pre.style.display = "inline";
  pre.style.font = font;
  pre.textContent = " ";
  doc.body.appendChild(pre);
  const { width, height } = pre.getBoundingClientRect();
  doc.body.removeChild(pre);
  return height / width;
}

export function ctxToGrayScale(
  ctx: CanvasRenderingContext2D,
  width: number = 0,
  height: number = 0,
  grayScale: GrayScaler
): [number[], ImageData] {
  ctx.imageSmoothingEnabled = false;
  const imageData = ctx.getImageData(0, 0, width || 1, height || 1);
  const target = ctx.createImageData(width || 1, height || 1);
  const grayScaled = [];
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const rgba: RGBA = [data[i] || 0, data[i + 1] || 0, data[i + 2] || 0, data[i + 3] || 0];
    const gray = grayScale(rgba);
    grayScaled.push(gray);
    target.data[i] = target.data[i + 1] = target.data[i + 2] = gray;
    target.data[i + 3] = 255;
  }
  return [grayScaled, target];
}

interface DimensionalClamp {
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
  fontRatio: number;
}

export function clampDimensions({
  width,
  height,
  maxWidth = 80,
  maxHeight = 80,
  fontRatio
}: DimensionalClamp): [number, number] {
  const rectifiedWidth = Math.floor(fontRatio * width);

  debug({
    rectifiedWidth,
    fontRatio,
    width,
    height,
    maxWidth,
    maxHeight
  });
  if (height > maxHeight) {
    const reducedWidth = Math.floor((rectifiedWidth * maxHeight) / height);
    debug({ reducedWidth });
    return [reducedWidth, maxHeight];
  }

  if (rectifiedWidth > maxWidth) {
    const reducedHeight = Math.floor((height * maxWidth) / rectifiedWidth);
    debug({ reducedHeight });
    return [maxWidth, reducedHeight];
  }
  return [rectifiedWidth, height];
}
export interface FileUploadEvent {
  files: File[];
}

export async function loadFile({ files }: FileUploadEvent): Promise<string> {
  const reader = new FileReader();
  const result = new Promise(resolve => {
    reader.onload = () => resolve(reader.result || "");
    reader.readAsDataURL(files[0]);
  });
  return result.then(r => `${r}`); // TODO: include filename
}
