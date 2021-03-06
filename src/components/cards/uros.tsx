import React, { lazy, useState, useEffect, useRef, Suspense } from "react";
import { Grid, Avatar, Hidden, Typography, CircularProgress } from "@material-ui/core";
import CustomCardWithBackground from "./custom_card_with_background";
import { makeStyles } from "@material-ui/core/styles";
const QAndAAccordion = lazy(() => import("components/q_and_a_accordion"));

const useStyles = makeStyles((theme) => ({
  whatDid: {
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  typography: {
    textAlign: "center",
  },
  avatar: {
    justifyContent: "center",
    textAlign: "center",
    height: 100,
    width: 100,
  },
  testimonial: {
    marginBottom: theme.spacing(2),
  },
}));
const Uros: React.FC<{ alertCurrentlyVisible: () => void; backgroundOpacity: number }> = ({ alertCurrentlyVisible, backgroundOpacity }) => {
  const classes = useStyles();

  const loadingImage = useRef(false);
  const [srcAndBlur, setSrcAndBlur] = useState({ src: require("media/uros-tiny.png"), blur: true });
  useEffect(() => {
    //visible but have not loaded non preview
    if (backgroundOpacity && !loadingImage.current) {
      loadingImage.current = true;
      var img = new Image();
      img.onload = function () {
        setSrcAndBlur({ src: img.src, blur: false });
      };
      img.src = require("media/uros.png");
    }
  }, [srcAndBlur, backgroundOpacity, loadingImage]);

  useEffect(() => {
    if (0.5 <= backgroundOpacity) alertCurrentlyVisible();
  }, [backgroundOpacity, alertCurrentlyVisible]);

  const jobDescription = (
    <Grid container justify="center">
      <Grid item>
        <Hidden xsDown>
          <Typography className={classes.whatDid} variant="h4">
            What did I do at UROS?
          </Typography>
        </Hidden>
        <Typography className={classes.typography} variant="h5">
          I was given a legacy system running where data from a MYSQL database was being processed by LabVIEW and a neural network written in C. I managed to reverse engineer and replace LabVIEW and
          the C library with a singular Python program, which allowed UROS to use a newer neural network technology whilst maintaining backwards compatibility.
        </Typography>
      </Grid>
    </Grid>
  );
  const testimonial = (
    <Grid item xs={12}>
      <Hidden xsDown>
        <Typography className={classes.typography} variant="h4">
          UROS Internship
        </Typography>
      </Hidden>
      <Grid item xs={12} className={classes.testimonial}>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item xs={12} sm={2}>
            <Grid container justify="center">
              <Avatar className={classes.avatar} src={require("media/jyrki.jpeg")} />
              <Typography className={classes.typography} variant="h5">
                Jyrki Hyvärinen, my supervisor
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h5">
              "Eerik filled very well his position as a trainee in our software development team. Eerik has enthusiastic attitude towards learning new areas, even difficult ones. This mindset helped
              us to achieve good goals in a short time. Promising young talent."
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <CustomCardWithBackground backgroundImageStyle={{ backgroundPosition: "100% 100%" }} photoCredit="kolster.fi" backgroundOpacity={backgroundOpacity} srcAndBlur={srcAndBlur}>
      {backgroundOpacity ? (
        <React.Fragment>
          <Hidden smUp>
            <Suspense fallback = {<CircularProgress/>}>
              <QAndAAccordion
                questionAnswers={[
                  { question: "Supervisor's comment", answer: testimonial },
                  { question: "What did I do at UROS?", answer: jobDescription },
                ]}
              />
            </Suspense>
          </Hidden>
          <Hidden only="xs">
            <Grid container justify="center">
              {testimonial}
              {jobDescription}
            </Grid>
          </Hidden>
        </React.Fragment>
      ) : undefined}
    </CustomCardWithBackground>
  );
};

export default Uros;
