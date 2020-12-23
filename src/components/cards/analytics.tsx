import React, { useState, useEffect, useRef } from "react";
import { Typography, Slider, Tabs, Grid, Tab, makeStyles } from "@material-ui/core";
import CustomCardWithBackground from "./custom_card_with_background";
import { TimeSpentOnSections } from "types";

const sections = ["Welcome", "Timeline", "UROS", "Rpgym", "tunety.pe", "Analytics"];

const useStyles = makeStyles((theme) => ({
  spacedRow: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(8),
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(12),
    },
  },
  centeredText: {
    textAlign: "center",
  },
}));

const Analytics: React.FC<{ alertCurrentlyVisible: () => void; timeSpentOnSections: TimeSpentOnSections; backgroundOpacity: number }> = ({
  alertCurrentlyVisible,
  timeSpentOnSections,
  backgroundOpacity,
}) => {
  useEffect(() => {
    if (0.5 <= backgroundOpacity) alertCurrentlyVisible()
  }, [backgroundOpacity])

  const loadingImage = useRef(false);
  const [srcAndBlur, setSrcAndBlur] = useState({ src: require("media/cloisters-tiny.jpg"), blur: true });
  useEffect(() => {
    //visible but have not loaded non preview
    if (backgroundOpacity && !loadingImage.current) {
      loadingImage.current = true;
      var img = new Image();
      img.onload = function () {
        setSrcAndBlur({ src: img.src, blur: false });
      };
      img.src = require("media/cloisters.jpg");
    }
  }, [srcAndBlur, backgroundOpacity, loadingImage]);

  const [averageTimeSpent, setAverageTimeSpent] = useState<TimeSpentOnSections | null>(null);
  const [maxValue, setMaxValue] = useState(0.1);
  const [currentTab, setCurrentTab] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    fetch("https://rocky-beyond-02836.herokuapp.com/averages", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setAverageTimeSpent(json);
      });
  }, []);
  useEffect(() => {
    //find the max value (at the start)
    if (averageTimeSpent) {
      var tempMaxValue = 0;
      Object.keys(timeSpentOnSections).forEach((key) => {
        if (timeSpentOnSections[key] > tempMaxValue) {
          tempMaxValue = timeSpentOnSections[key];
        }
      });
      setMaxValue(tempMaxValue);
    }
  }, [averageTimeSpent, timeSpentOnSections]);
  const currentSection = sections[currentTab];

  //whenever a section changes, update the max value (this is to prevent constant ugly maxValue updates but allows for changes in the range (for example in the analytics))
  useEffect(() => {
    if (averageTimeSpent) {
      setMaxValue((maxValue) => {
        return Math.max(timeSpentOnSections[currentSection], Math.max(averageTimeSpent[currentSection], maxValue));
      });
    }
  }, [currentTab, timeSpentOnSections, averageTimeSpent, currentSection]);
  return (
    <CustomCardWithBackground
      backgroundImageStyle={{ backgroundPosition: "25%, 25%" }}
      photoCredit="University of Glasgow Facebook"
      alertCurrentlyVisible={alertCurrentlyVisible}
      cardStyle={{ minHeight: "40vh", marginRight: 0, padding: 0 }}
      srcAndBlur = {srcAndBlur}
      backgroundOpacity={backgroundOpacity}
    >
      {backgroundOpacity ? (
        <Grid container justify="center">
          <Tabs
            value={currentTab}
            onChange={(_event, value) => setCurrentTab(value)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Welcome" />
            <Tab label="Timeline" />
            <Tab label="UROS" />
            <Tab label="Rpgym" />
            <Tab label="tunety.pe" />
            <Tab label="Analytics" />
          </Tabs>
          <Grid item xs={12}>
            <Typography className={classes.centeredText} variant="h5">
              I could talk about how I learned Material UI and TypeScript for this site (which I can't believe I lived without) or I could show you how I've tracked your reading times and use it to
              estimate which sections are and aren't interesting. Here's your and the sites average analytics:{" "}
            </Typography>
          </Grid>
          <Grid item xs={10} className={classes.spacedRow}>
            <Typography className={classes.centeredText} variant="h6">
              Your spent time
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Slider
              style={{ transition: "all 1000ms" }}
              max={maxValue}
              value={timeSpentOnSections[currentSection]}
              valueLabelFormat={(value) => `${value.toFixed(2)}s`}
              valueLabelDisplay="on"
              marks={[
                { value: 0, label: "0s" },
                { value: maxValue, label: `${maxValue.toFixed(2)}s` },
              ]}
            />
          </Grid>
          <Grid className={classes.spacedRow} item xs={10}>
            <Typography className={classes.centeredText} variant="h6">
              Average spent time
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Slider
              max={maxValue}
              value={averageTimeSpent ? averageTimeSpent[currentSection] : 0}
              valueLabelFormat={(value) => `${value.toFixed(2)}s`}
              valueLabelDisplay="on"
              marks={[
                { value: 0, label: "0s" },
                { value: maxValue, label: `${maxValue.toFixed(2)}s` },
              ]}
            />
          </Grid>
        </Grid>
      ) : undefined}
    </CustomCardWithBackground>
  );
};

export default Analytics;
