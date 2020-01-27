export const getAlbums = state => state.photos.albums || [];
export const getAlbumByID = albumID => state =>
  state.photos.albums && state.photos.albums.find(({ id }) => albumID === id);
export const getImages = state => state.photos.images || [];
export const getImageByID = imageID => state =>
  state.photos.images && state.photos.images.find(({ id }) => imageID === id);
export const getPrevImage = imageID => state => {
  if (!state.photos.images) return undefined;
  const currentImageIndex = state.photos.images.findIndex(
    ({ id }) => imageID === id
  );
  if (currentImageIndex === 0) return undefined;
  return state.photos.images[currentImageIndex - 1];
};
export const getNextImage = imageID => state => {
  if (!state.photos.images) return undefined;
  const currentImageIndex = state.photos.images.findIndex(
    ({ id }) => imageID === id
  );
  if (currentImageIndex === state.photos.images.length - 1) return undefined;
  return state.photos.images[currentImageIndex + 1];
};
