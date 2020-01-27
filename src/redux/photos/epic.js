import * as PO from "redux/photos/const";
import { ofType } from "redux-observable";
import { mergeMap, catchError, map } from "rxjs/operators";
import { from, of, throwError, forkJoin } from "rxjs";

import { facebookAPI } from "services";
import { getUserID } from "redux/login";

export const fetchAlbumPhotos = (action$, state$) =>
  action$.pipe(
    ofType(PO.FETCH_ALBUM_PHOTOS.START),

    mergeMap(({ payload: { id } }) =>
      from(facebookAPI.request(`/${id}/photos`, "get")).pipe(
        map(response => response.data),
        catchError(err => throwError(err))
      )
    ),
    catchError(err => throwError(err)),
    mergeMap(pictures => {
      const requests = [];
      pictures.forEach(({ id }) =>
        requests.push(
          from(
            facebookAPI.request(`/${id}/`, "get", {
              fields: "link,name,width,height,images,alt_text,webp_images,id"
            })
          ).pipe(
            map(({ images, name, alt_text, id, link }) => ({
              name,
              id,
              alt_text,
              link,
              ...images[0]
            })),
            catchError(error => throwError(error))
          )
        )
      );
      return forkJoin(...requests).pipe(catchError(error => throwError(error)));
    }),
    catchError(err => throwError(err)),
    map(images => ({
      type: PO.FETCH_ALBUM_PHOTOS.SUCCESS,
      payload: { images }
    })),
    catchError(err =>
      of({
        type: PO.FETCH_ALBUM_PHOTOS.ERROR,
        meta: { error: err.message || JSON.stringify(err) }
      })
    )
  );

export const fetchAlbums = (action$, state$) =>
  action$.pipe(
    ofType(PO.FETCH_ALBUMS.START),
    mergeMap(() =>
      from(
        facebookAPI.request(`/${getUserID(state$.value)}/albums/`, "get")
      ).pipe(
        map(response => response.data),
        catchError(err => throwError(err))
      )
    ),
    catchError(err => throwError(err)),
    mergeMap(albums => {
      const requests = [];
      albums.forEach(({ id }) =>
        requests.push(
          from(
            facebookAPI.request(`/${id}`, "get", {
              fields: "cover_photo,id,name,link,location,place"
            })
          ).pipe(
            map(({ cover_photo, id, name, place, link }) => ({
              cover_photo,
              id,
              name,
              link,
              place
            })),
            catchError(error => throwError(error)),
            mergeMap(album =>
              from(
                facebookAPI.request(`/${album.cover_photo.id}/`, "get", {
                  fields:
                    "link,name,width,height,images,alt_text,webp_images,id"
                })
              ).pipe(
                map(({ images, name, alt_text, id }) => ({
                  ...album,
                  cover_photo: {
                    name,
                    id,
                    alt_text,
                    ...images[0]
                  }
                })),
                catchError(error => throwError(error))
              )
            ),
            catchError(error => throwError(error))
          )
        )
      );
      return forkJoin(...requests).pipe(catchError(error => throwError(error)));
    }),
    catchError(err => throwError(err)),
    map(albums => ({
      type: PO.FETCH_ALBUMS.SUCCESS,
      payload: { albums }
    })),
    catchError(err =>
      of({
        type: PO.FETCH_ALBUMS.ERROR,
        meta: { error: err.message || JSON.stringify(err) }
      })
    )
  );
