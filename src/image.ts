import * as Jimp from 'jimp';
import { Pixel } from './pixel';

export type Filter = (image: Pixel[][]) => Pixel[][];

// TODO: make copy for unaltered data

export class Image {

  filters: Filter[] = [];

  constructor(public image: Jimp) {}

  static getPixels(image: Jimp): Pixel[][] {

    const pixels = [];

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      if (pixels[y] === undefined) {
        pixels[y] = [];
      }

      pixels[y][x] = {
        r: this.bitmap.data[ idx ],
        g: this.bitmap.data[ idx + 1 ],
        b: this.bitmap.data[ idx + 2 ],
        a: this.bitmap.data[ idx + 3 ]
      };
    });

    return pixels;
  }

  static getImageFromPixels(originalImage: Jimp, pixels: Pixel[][]): Jimp {
    originalImage.scan(0, 0, originalImage.bitmap.width, originalImage.bitmap.height, function (x, y, idx) {

      const pixel = pixels[y][x];

      const {r, g, b, a} = pixel;

      this.bitmap.data[ idx ] = r;
      this.bitmap.data[ idx + 1 ] = g;
      this.bitmap.data[ idx + 2 ] = b;
      this.bitmap.data[ idx + 3 ] = a;
    });

    return originalImage;
  }

  addFilter(filter: Filter): this {
    this.filters.push(filter);
    return this;
  }

  async getImage(): Promise<Jimp> {
    return Image.getImageFromPixels(
      this.image,
      this.filters.reduce(
        (previousPixels, currentFilter) => currentFilter(previousPixels),
        Image.getPixels(this.image))
    );
  }

  async createImage(imageUrl: string) {
    const finishedImage = await this.getImage();
    return finishedImage.write(`${__dirname}/out/${imageUrl}`);
  }
}


export const ImageCreator = new class {
  async loadImage(imageUrl: string): Promise<Image> {
    return new Image(await Jimp.read(imageUrl));
  }
};