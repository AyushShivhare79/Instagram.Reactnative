import ImageKit from 'imagekit-javascript';
import { IMAGEKIT_URL_ENDPOINT } from '@env';

const imagekitConfigOptions = {
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
};

const imagekit = new ImageKit(imagekitConfigOptions);

const getImagekitUrlFromSrc = function (imageSrc, transformationArray) {
  const ikOptions = {
    src: imageSrc,
    transformation: transformationArray,
  };
  const imageURL = imagekit.url(ikOptions);

  return imageURL;
};

const getImagekitUrlFromPath = function (
  imagePath,
  transformationArray,
  transformationPosition,
) {
  const ikOptions = {
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    path: imagePath,
    transformation: transformationArray,
  };
  if (transformationPosition)
    ikOptions.transformationPosition = transformationPosition;

  const imageURL = imagekit.url(ikOptions);

  return imageURL;
};
