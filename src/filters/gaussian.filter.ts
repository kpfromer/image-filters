import { Pixel } from '../pixel';
import { Filter } from '../image';
import { cloneDeep, get } from 'lodash';
import { getArrayValidSum, getRadiusArray } from '../array.helper';

export function GaussianFilter(image: Pixel[][]) {
  const original = cloneDeep(image);

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {

      // get 2d array with radius
      const radiusArray = getRadiusArray<Pixel>(original, 1, x, y);
      // Get rgba values
      for (const color of ['r', 'g', 'b']) {

        const colorValueArray = radiusArray.map(yPixels => yPixels.map(xPixel => get(xPixel, [color], null)));

        const {invalid, sum} = getArrayValidSum(colorValueArray);

        const average = sum / (9 - invalid);

        image[y][x][color] = Math.trunc(average);
      }

    }
  }

  return image;
};