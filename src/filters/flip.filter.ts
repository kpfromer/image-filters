import { Filter } from '../image';
import { Pixel } from '../pixel';

export function FlipHorizontalFilter(image: Pixel[][]) {
  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length / 2; x++) {
      const temp = image[y][x];
      image[y][x] = image[y][image[y].length - x - 1];
      image[y][image[y].length - x - 1] = temp;
    }
  }

  return image;
};

export function FlipVerticalFilter(image: Pixel[][]) {
  for (let y = 0; y < image.length / 2; y++) {
    for (let x = 0; x < image[y].length; x++) {
      const temp = image[y][x];
      image[y][x] = image[image.length - y - 1][x];
      image[image.length - y - 1][x] = temp;
    }
  }

  return image;
};