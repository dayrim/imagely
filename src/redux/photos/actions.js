import * as PO from "redux/photos/const";

export const fetchAlbums = payload => ({
  type: PO.FETCH_ALBUMS.START,
  payload: { ...payload, loading: true }
});

export const fetchAlbumPhotos = payload => ({
  type: PO.FETCH_ALBUM_PHOTOS.START,
  payload: { ...payload, loading: true }
});
