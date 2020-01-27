import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkIcon from "@material-ui/icons/Link";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridListTileBar,
  GridListTile,
  Card,
  CardActionArea,
  CardMedia,
  GridList,
  Divider,
  IconButton,
  Typography
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { push } from "connected-react-router";

import { fetchAlbumPhotos, getAlbumByID, getImages } from "redux/photos";
import { getLoader } from "redux/ui";
import { Loader } from "components";

const useStyles = makeStyles(theme => ({
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  },
  card: {
    height: "100%"
  },
  cardActions: {
    height: "100%"
  },
  cardMedia: {
    height: "100%"
  },
  divider: {
    marginBottom: "50px"
  }
}));

const Album = () => {
  const { albumID } = useParams();
  const classes = useStyles();

  const { t } = useTranslation("translation");
  const loading = useSelector(getLoader("photosLoader"));
  const images = useSelector(getImages);
  const album = useSelector(getAlbumByID(albumID));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAlbumPhotos({ id: albumID }));
  }, [albumID, dispatch]);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <Typography variant="h3">
            {t("album")} {(album && album.name) || ""}
          </Typography>
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            light="true"
            className={classes.divider}
          ></Divider>
          <GridList cellHeight={245} spacing={10} cols={3}>
            {images.map(tile => (
              <GridListTile key={tile.id}>
                <Card
                  className={classes.card}
                  onClick={() =>
                    dispatch(push(`/albums/${albumID}/${tile.id}`))
                  }
                >
                  <CardActionArea className={classes.cardActions}>
                    <CardMedia
                      component="img"
                      className={classes.cardMedia}
                      alt={tile.alt_text}
                      image={tile.source}
                    />
                  </CardActionArea>
                  <GridListTileBar
                    title={tile.name || tile.alt_text}
                    titlePosition="top"
                    actionIcon={
                      <IconButton
                        aria-label={`star ${tile.name || tile.alt_text}`}
                        className={classes.icon}
                        onClick={() => window.location.assign(tile.link)}
                      >
                        <LinkIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </>
      )}
    </div>
  );
};

export default Album;
