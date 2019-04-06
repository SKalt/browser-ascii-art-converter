/* inspired/based off of
https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art.html
and its associated repo, https://github.com/jpetitcolas/ascii-art-converter.
*/
type RGB = [number, number, number] | Uint8Array;
// type RGBA = [number, number, number, number?];
// type Hex = number; // between 0x0 and 0xFFFFFF for rgb, 0xFFFFFFFF for rgba
export type GrayScaler = (color: RGB) => number;

export const DEFAULT_RAMP =
  "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

interface Palette {
  tileRatio: number;
  //
}

type Artist = (img: ImageData, palette: Palette) => string;

export function makeGrayScaler(weights: RGB = [0.21, 0.72, 0.07]): GrayScaler {
  return function grayScale(color: RGB = [0, 0, 0]): number {
    return (
      color[0] * weights[0] + color[1] * weights[1] + color[2] * weights[2]
    );
  };
}

export function makeGrayConverter(ramp: string = DEFAULT_RAMP) {
  return function grayToCharacter(gray: number): string {
    return ramp[Math.ceil((ramp.length - 1) * (gray / 255))];
  };
}

export function makeCharConverter(
  gray: number[],
  grayConverter: (g: number) => string,
  width: number
) {
  return gray.reduce((chars, gray, index) => {
    return (chars += grayConverter(gray) + (index % width === 0 ? "\n" : ""));
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
  width: number,
  height: number,
  grayScale: GrayScaler
): [number[], ImageData] {
  const imageData = ctx.getImageData(0, 0, width, height);
  const target = ctx.createImageData(width, height);
  const grayScaled = [];
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const rgb: RGB = [data[i] || 0, data[i + 1] || 0, data[i + 2] || 0];
    const gray = grayScale(rgb);
    grayScaled.push(gray);
    target.data[i] = target.data[i + 1] = target.data[i + 3] = gray;
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

  if (height > maxHeight) {
    const reducedWidth = Math.floor((rectifiedWidth * maxHeight) / height);
    return [reducedWidth, maxHeight];
  }

  if (width > maxWidth) {
    const reducedHeight = Math.floor((height * maxWidth) / rectifiedWidth);
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
