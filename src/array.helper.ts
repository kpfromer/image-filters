import { get } from 'lodash';

export const getRadiusArray = <T>(array: T[][], radius: number, x: number, y: number): T[][] => {

  const newArray: T[][] = [];

  for (let r = y - radius, realR = 0; r <= y + radius; r++, realR++) {
    newArray[realR] = [];
    for (let c = x - radius, realC = 0; c <= x + radius; c++, realC++) {
      newArray[realR][realC] = get(array, [r, c], null);
    }
  }

  return newArray;
};

export const setSectionOfArray = (x: number, y: number, totalArray: any[][], sectionArray: any[][]) => {
  const yRadius = sectionArray.length - 1;
  const xRadius = sectionArray[0].length - 1;

  for (let r = y - yRadius, realR = 0; r <= y + yRadius; r++, realR++) {
    for (let c = x - xRadius, realC = 0; c <= x + xRadius; c++, realC++) {
      if (get(totalArray, `[${r}][${c}]`) && get(sectionArray, `[${realR}][${realC}]`)) {
        console.log('working');
        // console.log(sectionArray.map(x => x.map(y => y)));
        totalArray[r][c] = sectionArray[realR][realC];
      }
    }
  }

  return totalArray;
};

export const getArrayValidSum = (array: number[][]): {sum: number, invalid: number} => {
  let sum = 0;
  let invalid = 0;
  for (const y of array) {
    for (const x of y) {
      if (x) {
        sum += x;
      } else {
        invalid += 1
      }
    }
  }
  return {
    sum,
    invalid
  };
};

export const getAverageFromRadius = (sum: number, radius: number): number => {
  return sum / Math.pow(radius * 2 + 1, 2)
};

export const arrayMutiplication = (arr1: number[][], arr2: number[][]) => {
  const newArray = [];

  for (let y = 0; y < arr1.length; y++) {

    if (arr1[y].length !== arr2.length) {
      throw new TypeError('Invalid dimensions');
    }

    newArray[y] = [];

    for (let x = 0; x < arr1[y].length; x++) {

      newArray[y][x] = arr1[y][x] * arr2[y][x];
    }
  }

  return newArray;
};