import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Dialog, Fab, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";

import { getPrevImage, getNextImage, getImageByID } from "redux/photos";

const useStyles = makeStyles(theme => ({
  content: {
    padding: "20px"
  },
  title: {
    textAlign: "center"
  },
  image: {
    objectFit: "contain",
    maxHeight: "80vh",
    maxWidth: "100%"
  },
  navigateLeft: {
    position: "fixed",
    left: "35px",
    top: "50%",
    transform: "scale(1.5) translateY(-50%)",
    "& .MuiSvgIcon-root": {
      position: "relative",
      left: "5px"
    }
  },
  navigateRight: {
    position: "fixed",
    right: "35px",
    top: "50%",
    transform: "scale(1.5) translateY(-50%)"
  }
}));

const ImageModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { albumID, imageID } = useParams();
  const prevImage = useSelector(getPrevImage(imageID));
  const nextImage = useSelector(getNextImage(imageID));
  const image = useSelector(getImageByID(imageID));

  return (
    <div>
      {image && prevImage && nextImage ? (
        <Dialog
          open={true}
          maxWidth="xl"
          onClose={() => dispatch(push(`/albums/${albumID}/`))}
          className={classes.root}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={classes.content}>
            <img
              className={classes.image}
              src={image.source}
              alt={image.alt_text}
            ></img>
          </DialogContent>
          <Fab
            onClick={() => dispatch(push(`/albums/${albumID}/${prevImage.id}`))}
            color="primary"
            size={"small"}
            className={classes.navigateLeft}
          >
            <ArrowBackIosIcon />
          </Fab>
          <Fab
            onClick={() => dispatch(push(`/albums/${albumID}/${nextImage.id}`))}
            color="primary"
            size={"small"}
            className={classes.navigateRight}
          >
            <ArrowForwardIosIcon />
          </Fab>
        </Dialog>
      ) : null}
    </div>
  );
};

export default ImageModal;
