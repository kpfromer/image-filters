import { Filter } from '../image';
import { Pixel } from '../pixel';

export function GreyscaleFilter(image: Pixel[][]) {

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {
      const pixel = image[y][x];
      const {r, g, b, a} = pixel;

      const average = (r+g+b)/3;

      image[y][x] = {
        r: average,
        g: average,
        b: average,
        a
      }
    }
  }

  return image;
};