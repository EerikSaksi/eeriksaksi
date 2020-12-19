import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ProgressiveImage, { ProgressiveImageProps } from "react-progressive-image-loading";
import CustomCardWithBackground from "./custom_card_with_background";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  img: {
    height: "80vh",
  },
  typography: {
    textAlign: "center",
  },
}));
const Rpgym: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const classes = useStyles();
  return (
    <CustomCardWithBackground
      progressiveImageProps={{ src: require("media/glasgow.jpg"), preview: require("media/glasgow-tiny.jpg") } as ProgressiveImageProps}
      backgroundImageStyle={{ backgroundPosition: "80% 80%" }}
      photoCredit="Policy Scotland"
      alertCurrentlyVisible={alertCurrentlyVisible}
      cardStyle={{ width: "auto", padding: 0 }}
      childrenOutsideCard={
        <Grid container justify="center" alignItems="center">
          <Typography className={classes.typography} variant="h3">
            {" "}
            This is my cross-platform multiplayer mobile fitness RPG, RPGym{" "}
          </Typography>
        </Grid>
      }
    >
      <Grid container justify="center" alignItems="center">
        <ProgressiveImage src={require("media/rpgym.gif")} preview={require("media/rpgym-tiny.jpg")} render={(src, style) => <img className={classes.img} src={src} style = { style } alt = "App demo" />} />
      </Grid>
    </CustomCardWithBackground>
  );
};

export default Rpgym;
