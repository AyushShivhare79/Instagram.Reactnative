import ImageKit from 'imagekit-javascript';

const imagekitConfigOptions = { urlEndpoint };
if (publicKey) imagekitConfigOptions.publicKey = publicKey;
if (authenticationEndpoint)
  imagekitConfigOptions.authenticationEndpoint = authenticationEndpoint;

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
  transformationPostion,
) {
  const ikOptions = {
    urlEndpoint,
    path: imagePath,
    transformation: transformationArray,
  };
  if (transformationPostion)
    ikOptions.transformationPostion = transformationPostion;

  const imageURL = imagekit.url(ikOptions);

  return imageURL;
};
