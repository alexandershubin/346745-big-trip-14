import {generateForData, generateDescription, createPhotoTemplate} from '../utils/point';
import {getRandomInteger} from '../utils/common';
import {pointType, cities, description, offers} from '../const';

export const generatePoint = () => {
  return {
    pointTypes: generateForData(pointType),
    cities: generateForData(cities),
    description: generateDescription(description),
    offers: generateForData(offers),
    photos: createPhotoTemplate(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

