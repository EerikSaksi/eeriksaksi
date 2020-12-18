import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ProgressiveImage, { ProgressiveImageProps } from "react-progressive-image-loading";
import CustomCardWithBackground from "./custom_card_with_background";

const Rpgym: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  return (
    <CustomCardWithBackground
      progressiveImageProps={{ src: require("media/glasgow.jpg"), preview: require("media/glasgow-tiny.jpg") } as ProgressiveImageProps}
      backgroundImageStyle={{ backgroundPosition: "80% 80%" }}
      photoCredit="Policy Scotland"
      alertCurrentlyVisible={alertCurrentlyVisible}
      cardStyle={{ width: "auto", padding: 0 }}
      childrenOutsideCard={
        <Typography style = {{textAlign: 'center',  }} variant="h3"> This is my cross-platform multiplayer mobile fitness RPG, RPGym  </Typography>
      }
    >
      <Grid container justify="center" alignItems="center">
        <ProgressiveImage src={require("media/rpgym.gif")} preview={require("media/rpgym-tiny.jpg")} render={(src, style) => <img style={{ height: "80vh", ...style }} src={src} />} />
      </Grid>
    </CustomCardWithBackground>
  );
};

export default Rpgym;
