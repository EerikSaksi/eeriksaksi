import React, { useRef, useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ProgressiveImageProps } from "react-progressive-image-loading";
import CustomCardWithBackground from "./custom_card_with_background";
import Loading from "components/cards/loading";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  img: {
    height: "80vh",
    transition: "all 500ms ease-in-out",
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
    transition: "all 500ms ease-in-out",
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
    start: 2.5,
    duration: 2,
  },
  {
    text: "Strength is calculated relative to the weight and the identified gender of the user",
    start: 15,
    duration: 4.611111,
  },
  {
    text: "Getting stronger makes your virtual character stronger",
    start: 18.4,
    duration: 3.0,
  },
  {
    text: "Tracking a workout triggers a fight with your team's current enemy",
    start: 24.9,
    duration: 3.0,
  },
  {
    text: "Killing an enemy progresses your team to the next level",
    start: 33.9,
    duration: 3.055556,
  },
];

const Rpgym: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const classes = useStyles();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [explanation, setExplanation] = useState<string | null>();
  const [explanationsIndex, setExplanationsIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (ref.current && explanationsIndex < explanations.length && !explanation) {
        const currentTime = ref.current.currentTime;
        console.log(currentTime);
        const expl = explanations[explanationsIndex];
        if (expl.start <= currentTime) {
          setTextOpacity(1);
          setExplanationsIndex((index) => index + 1);
          setExplanation(expl.text);
          console.log(expl.text);
          ref.current!.pause();
          await new Promise((resolve) => setTimeout(resolve, expl.duration * 1000));
          setTextOpacity(0);
          await new Promise((resolve) => setTimeout(resolve, 500));
          setExplanation(null);
          ref.current!.play();
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [ref, explanationsIndex]);

  return (
    <CustomCardWithBackground
      progressiveImageProps={{ src: require("media/glasgow.jpg"), preview: require("media/glasgow-tiny.jpg") } as ProgressiveImageProps}
      backgroundImageStyle={{ backgroundPosition: "80% 80%" }}
      photoCredit="Policy Scotland"
      alertCurrentlyVisible={alertCurrentlyVisible}
      cardStyle={{ padding: 0, width: '45vh', height: '80vh', backgroundColor: 'rgba(0, 0, 255, 0)'}}
    >
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <Typography style={{ opacity: textOpacity }} className={classes.text} variant="h3">
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
