import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkIcon from "@material-ui/icons/Link";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridListTileBar,
  Divider,
  GridListTile,
  GridList,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

import { Loader } from "components";
import { fetchAlbums, getAlbums } from "redux/photos";
import { getLoader } from "redux/ui";

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
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const loading = useSelector(getLoader("photosLoader"));
  const albums = useSelector(getAlbums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <Typography variant="h3">{t("albumCollection")}</Typography>
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            className={classes.divider}
          ></Divider>
          <GridList cellHeight={245} spacing={10} cols={3}>
            {albums.map(tile => (
              <GridListTile key={tile.id}>
                <Card
                  className={classes.card}
                  onClick={() => dispatch(push(`albums/${tile.id}`))}
                >
                  <CardActionArea className={classes.cardActions}>
                    <CardMedia
                      component="img"
                      className={classes.cardMedia}
                      alt={tile.cover_photo.alt_text}
                      image={tile.cover_photo.source}
                    />
                  </CardActionArea>
                  <GridListTileBar
                    title={tile.name}
                    titlePosition="top"
                    actionIcon={
                      <IconButton
                        aria-label={`star ${tile.name}`}
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
