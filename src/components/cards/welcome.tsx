import React, { useState, useEffect, useRef } from "react";
import { Avatar, Grid, Hidden, Typography } from "@material-ui/core";
import CustomCardWithBackground from "./custom_card_with_background";
import ProgressiveImage from "react-progressive-image-loading";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import GitHubIcon from "@material-ui/icons/GitHub";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: "center",
  },
  greenAvatar: {
    transition: "all ease-in-out 1.5s",
    width: 100,
    height: 100,
    backgroundColor: "green",
  },
  blueAvatar: {
    backgroundBlendMode: "multiply",
    opacity: 0.7,
    transition: "all ease-in-out 1.5s",
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  yellowAvatar: {
    backgroundBlendMode: "multiply",
    opacity: 0.7,
    transition: "all ease-in-out 1.5s",
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    color: "black",
  },
  contactInfo: {
    marginBottom: "0.5em",
  },
  profileAvatar: {
    height: 200,
    width: 200,
    justifyContent: "center",
  },
  iconGrid: {
    display: "flex",
    alignSelf: "center",
    marginRight: 8,
  },
}));
const Welcome: React.FC<{ alertCurrentlyVisible: () => void; backgroundOpacity: number }> = ({ alertCurrentlyVisible, backgroundOpacity }) => {
  const classes = useStyles();
  const [ballsShifted, setBallsShifted] = useState(false);
  const [showFullstack, setShowFullstack] = useState(false);

  //used to calculate the left offset amount
  const ballRowRef = useRef<HTMLDivElement>(null);


  const loadingImage = useRef(false)
  const [srcAndBlur, setSrcAndBlur] = useState({src: require("media/coffee-tiny.jpg"), blur: true})
  useEffect(() => {
    //visible but have not loaded non preview
    if (backgroundOpacity && !loadingImage.current){
      loadingImage.current = true
      var img = new Image();
      img.onload = function() { setSrcAndBlur({src: img.src, blur: false}) }
      img.src = require('media/coffee.jpg');
    }
  }, [srcAndBlur, backgroundOpacity, loadingImage])

  //the width of a row, used to calculate the offset amount
  const [ballRowWidth, setBallRowWidth] = useState(0);
  useEffect(() => {
    const sleepAndShiftBalls = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBallsShifted(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowFullstack(true);
    };
    //if inview trigger animations
    if (0.5 <= backgroundOpacity) {
      alertCurrentlyVisible()
      sleepAndShiftBalls();
    }
  }, [backgroundOpacity]);
  useEffect(() => {
    if (ballRowRef.current) {
      setBallRowWidth(ballRowRef.current.clientWidth - 50);
    }
  }, [ballRowWidth]);
  return (
    <CustomCardWithBackground
      backgroundImageStyle={{ backgroundPosition: "0% 20%" }}
      alertCurrentlyVisible={alertCurrentlyVisible}
      backgroundOpacity={backgroundOpacity}
      srcAndBlur={backgroundOpacity ? { src: require("media/coffee.jpg"), blur: false } : { src: require("media/coffee-tiny.jpg"), blur: true }}
    >
      {0 < backgroundOpacity ? (
        <Grid container justify="space-evenly">
          <Grid item sm={6}>
            <Grid container justify="flex-end">
              <Grid item xs={12}>
                <Typography className={classes.typography} variant="h1">
                  Eerik Saksi
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.typography} variant="h2">
                  Aspiring
                </Typography>
              </Grid>
              {showFullstack ? (
                <Grid item xs={11}>
                  <Grid container justify="center">
                    <Avatar className={classes.greenAvatar}>Fullstack</Avatar>
                  </Grid>
                </Grid>
              ) : (
                <>
                  <Grid ref={ballRowRef} item xs={6}>
                    <Grid container justify="flex-start">
                      <Avatar className={classes.blueAvatar} style={{ left: ballsShifted ? ballRowWidth : 0 }}>
                        Frontend
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justify="flex-end">
                      <Avatar className={classes.yellowAvatar} style={{ right: ballsShifted ? ballRowWidth : 0 }}>
                        Backend
                      </Avatar>
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Typography className={classes.typography} variant="h2">
                  Developer
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3}>
            <Grid className={classes.contactInfo} container justify="center">
              <ProgressiveImage
                preview={require("media/orek-tiny.jpg")}
                src={require("media/orek.jpg")}
                render={(src, style) => <Avatar className={classes.profileAvatar} alt="Eerik Saksi" src={src} style={style} />}
              />
            </Grid>
            <Grid className={classes.contactInfo} container alignItems="flex-end" justify="center">
              <Grid item sm={1} xs={2} className={classes.iconGrid}>
                <PhoneIcon />
              </Grid>
              <Grid item alignItems="flex-start">
                <Typography className={classes.typography} variant="h5">
                  <a href="tel:+44 7519 698 702">
                    <Hidden xsDown>+44 7519 698 702</Hidden>
                    <Hidden smUp>Mobile</Hidden>
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.contactInfo} container alignItems="flex-end" justify="center">
              <Grid className={classes.iconGrid} item sm={1} xs={2}>
                <MailIcon />
              </Grid>
              <Grid item>
                <Typography className={classes.typography} variant="h5">
                  <a href="mailto:saksi.eerik@gmail.com">
                    <Hidden xsDown>saksi.eerik@gmail.com</Hidden>
                    <Hidden smUp>Email</Hidden>
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.contactInfo} container alignItems="flex-end" justify="center">
              <Grid item sm={1} xs={2} className={classes.iconGrid}>
                <GitHubIcon />
              </Grid>
              <Grid item>
                <Typography className={classes.typography} variant="h5">
                  <a href="https://github.com/EerikSaksi" target="_blank" rel="noopener noreferrer">
                    EerikSaksi
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.contactInfo} container alignItems="flex-end" justify="center">
              <Grid item sm={1} xs={2} className={classes.iconGrid}>
                <PictureAsPdfIcon />
              </Grid>
              <Grid item>
                <Typography className={classes.typography} variant="h5">
                  <a href="https://drive.google.com/uc?export=download&id=1ZkthduWcQRQuJ70Ma_PTB11x7ePEzwM7" download>
                    Résumé
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : undefined}
    </CustomCardWithBackground>
  );
};
export default Welcome;
