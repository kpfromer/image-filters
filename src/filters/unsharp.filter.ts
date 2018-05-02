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

export function UnsharpFilter(image: Pixel[][]) {
  const original = cloneDeep(image);

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {

      // get 2d array with radius
      const radiusArray = getRadiusArray<Pixel>(original, 1, x, y);
      // Get rgba values
      for (const color of ['r', 'g', 'b']) {

        const colorValueArray = radiusArray.map(yPixels => yPixels.map(xPixel => get(xPixel, [color], null)));

        const center = colorValueArray[1][1];
        // console.log(center);

        colorValueArray[1][1] = 0;

        const values = colorValueArray
          .reduce((prev, curr) => [...prev, ...curr])
          .reduce((prev, curr, index) => {
            // console.log(`index: ${index}`, (index + 1) % 2 === 0);
            return prev + (index + 1) % 2 === 0 ? curr * 2 : curr
          }, 0);

        // const values = colorValueArray.reduce(((previousValue, currentValue, currentIndex) => {
        //   if (currentIndex === 1) {
        //     return currentValue.reduce((prev, curr) => prev + 2 * curr, previousValue);
        //   } else {
        //     return currentValue.reduce((prev, curr, pos) => prev + pos === 1 ? 2 * curr : curr, previousValue);
        //   }
        // }), 0);

        // const {invalid, sum} = getArrayValidSum(colorValueArray);

        // const average = sum / (Math.pow(radius * 2 + 1, 2) - invalid);

        let final = Math.trunc( (center * 28 - values) / 16);

        if (final < 0) {
          final = 0;
        } else if (final > 255) {
          final = 255;
        }

        image[y][x][color] = final;
      }

    }
  }

  return image;
};