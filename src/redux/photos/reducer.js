import * as PO from "redux/photos/const";

const initialState = { loading: false };
export default (state = initialState, { payload, type }) => {
  switch (type) {
    case PO.FETCH_ALBUMS.START:
      return { ...state, loading: true };

    case PO.FETCH_ALBUMS.SUCCESS:
      return {
        ...state,
        albums: payload.albums,
        loading: false
      };

    case PO.FETCH_ALBUMS.ERROR:
      return {
        ...state,
        albums: [],
        loading: false
      };
    case PO.FETCH_ALBUM_PHOTOS.START:
      return { ...state, loading: true };

    case PO.FETCH_ALBUM_PHOTOS.SUCCESS:
      return {
        ...state,
        images: payload.images,
        loading: false
      };

    case PO.FETCH_ALBUM_PHOTOS.ERROR:
      return {
        ...state,
        images: [],
        loading: false
      };
    default:
      return state;
  }
};
