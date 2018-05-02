import { Filter } from '../image';
import { Pixel } from '../pixel';

export function NegativeFilter(image: Pixel[][]) {

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {
      const pixel = image[y][x];
      const {r, g, b, a} = pixel;
      image[y][x] = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b,
        a
      }
    }
  }

  return image;
};