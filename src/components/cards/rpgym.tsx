import React, { useRef, useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ProgressiveImageProps } from "react-progressive-image-loading";
import CustomCardWithBackground from "./custom_card_with_background";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  img: {
    height: "80vh",
    transition: "all 500ms",
  },
  pausedImg: {
    filter: "blur(8px)",
    height: "80vh",
    WebkitFilter: "blur(8px)",
    animation: "all 500ms",
  },
  typography: {
    textAlign: "center",
  },
  container: {
    position: "relative",
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },
  text: {
    textAlign: "center",
  },
}));

const explanations = [
  {
    text: "This is a cross-platform multiplayer fitness RPG I have been working on.",

    start: 0,
    duration: 4,
  },
  {
    text: "You can track hundreds of exercises.",
    start: 2,
    duration: 2,
  },
];
const Rpgym: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const classes = useStyles();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [explanation, setExplanation] = useState<string | null>();
  const [explanationsIndex, setExplanationsIndex] = useState(0);
  useEffect(() => {
    const handleEvent = async () => {
      //check that we can get the video duration,
      if (explanationsIndex < explanations.length && !explanation) {
        var currentTime: number;
        try {
          currentTime = ref.current!.played.end(0);
        } catch (error) {
          console.log(error);
          return;
        }
        console.log(currentTime);
        const expl = explanations[explanationsIndex];
        if (expl.start <= currentTime) {
          setExplanationsIndex((index) => index + 1);
          setExplanation(expl.text);
          console.log(expl.text);
          ref.current!.pause();
          await new Promise((resolve) => setTimeout(resolve, expl.duration * 1000));
          setExplanation(null);
          ref.current!.play();
        }
      }
    };
    return () => ref.current?.removeEventListener("progress", handleEvent);
  }, [ref, explanationsIndex]);
  return (
    <CustomCardWithBackground
      progressiveImageProps={{ src: require("media/glasgow.jpg"), preview: require("media/glasgow-tiny.jpg") } as ProgressiveImageProps}
      backgroundImageStyle={{ backgroundPosition: "80% 80%" }}
      photoCredit="Policy Scotland"
      alertCurrentlyVisible={alertCurrentlyVisible}
      cardStyle={{ padding: 0, height: "80vh", width: "45vh" }}
    >
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <Typography className={classes.text} variant="h3">
            {explanation}
          </Typography>
        </div>
        <Grid container justify="center" alignItems="center">
          <video className={explanation ? classes.pausedImg : classes.img} ref={ref} controls={false} muted={true} src={require("media/rpgym.webm")}></video>
        </Grid>
      </div>
    </CustomCardWithBackground>
  );
};

export default Rpgym;
