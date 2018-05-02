import { Filter } from '../image';
import { Pixel } from '../pixel';
import { cloneDeep, get } from 'lodash';
import {
  arrayMutiplication,
  getArrayValidSum,
  getAverageFromRadius,
  getRadiusArray,
  setSectionOfArray
} from '../array.helper';

export function EdgyFilter(image: Pixel[][]) {
  const original = cloneDeep(image);

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {

      // get 2d array with radius
      const radiusArray = getRadiusArray<Pixel>(original, 1, x, y);
      // Get rgba values
      for (const color of ['r', 'g', 'b']) {

        const colorValueArray = radiusArray.map(yPixels => yPixels.map(xPixel => get(xPixel, [color], null)));

        const center = colorValueArray[1][1];

        colorValueArray[1][1] = 0;

        const values = colorValueArray.reduce((prevValue, currArray) => prevValue + currArray.reduce((prev, curr) => prev + curr, 0), 0);

        let final = center * 9 - values;

        if (final < 0) {
          final = 0;
        } else if (final > 255) {
          final = 255;
        }

        // const {invalid, sum} = getArrayValidSum(colorValueArray);

        // const average = sum / (Math.pow(radius * 2 + 1, 2) - invalid);

        image[y][x][color] = Math.trunc(final);
      }

    }
  }

  return image;
};