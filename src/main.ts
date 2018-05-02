import { ImageCreator } from './image';
import { FlipHorizontalFilter, FlipVerticalFilter } from './filters/flip.filter';
import { NegativeFilter } from './filters/negative.filter';
import { GreyscaleFilter } from './filters/greyscale.filter';
import { GaussianFilter } from './filters/gaussian.filter';
import { LaplacianFilter } from './filters/laplacian.filter';
import { UnsharpFilter } from './filters/unsharp.filter';
import { EdgyFilter } from './filters/edgy.filter';

const run = async () => {

  const imagesToCreate = [];

  const filters = [
    FlipVerticalFilter,
    FlipHorizontalFilter,
    NegativeFilter,
    GreyscaleFilter,
    GaussianFilter,
    LaplacianFilter,
    EdgyFilter,
    UnsharpFilter
  ];

  const imageUrl = `${__dirname}/imgs/monet.jpg`;

  for (let filter of filters) {
    imagesToCreate.push((await ImageCreator.loadImage(imageUrl)).addFilter(filter).createImage(`${filter.name}.jpg`));
  }

  await Promise.all(imagesToCreate);
};

run();