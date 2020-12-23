import React, { useState, useEffect, useRef } from "react";
import { Grid, Fade, useTheme, Slider, Typography, withStyles } from "@material-ui/core";
import CustomCardWithBackground from "./custom_card_with_background";
import "components/cards/timeline.css";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  timeline: {
    height: "100%",
  },
  typography: {
    textAlign: "center",
  },
  thumb: {
    transition: "all 1000ms"
  },

}));

const dates = [
  { description: "Here's my timeline:", valueLabelDisplay: false },
  {
    description: "MSci in Computing from University of Glasgow with 2nd Year Entry",
    startDate: new Date("2018-09"),
    endDate: new Date("2022-05"),
    valueLabelDisplay: true,
  },
  { description: "Worked at UROS as a Software Development Intern", startDate: new Date("2019-06-25"), endDate: new Date("2019-08-02"), typographyVariant: "h1", valueLabelDisplay: true },
  { description: "Decided to focus on my technology skills because of COVID.", startDate: new Date("2020-05"), endDate: new Date("2020-09"), valueLabelDisplay: true },
];

//estimates the readingTime required to read text
const readingTime = (phrase: string) => {
  return (phrase.length / 12) * 1000;
};

//returns the total difference from the first day to the last day
const getDeltaFromFirst = (date: Date) => {
  //subtract difference from the first dates startDate
  const diffTime = date.getTime() - dates[1].startDate!.getTime();

  //convert to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

//reverse of getDeltaFromFirst, as the slider needs a function to convert the day number to a display date
function dayToDisplayDate(day: number) {
  const diffMillis = Math.floor(day * (1000 * 60 * 60 * 24));
  const displayDate = new Date(dates[1].startDate!.getTime() + diffMillis);

  var options = { year: "numeric", month: "long" };
  return displayDate.toLocaleString("en-US", options);
}

//the maxDate (last days endDate)
const maxDate = getDeltaFromFirst(new Date("2022-05"));

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip style={{ transition: "all 500ms" }} open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
const TimeLine: React.FC<{ alertCurrentlyVisible: () => void; backgroundOpacity: number }> = ({ alertCurrentlyVisible, backgroundOpacity }) => {
  const theme = useTheme();
  const classes = useStyles();

  const loadingImage = useRef(false);
  const [showSliders, setShowSliders] = useState(false);
  const [srcAndBlur, setSrcAndBlur] = useState({ src: require("media/road-tiny.jpg"), blur: true });
  useEffect(() => {
    //visible but have not loaded non preview
    if (backgroundOpacity && !loadingImage.current) {
      loadingImage.current = true;
      var img = new Image();
      img.onload = function () {
        setSrcAndBlur({ src: img.src, blur: false });
      };
      img.src = require("media/road.jpg");
    }
  }, [srcAndBlur, backgroundOpacity, loadingImage]);

  const [sliderValue, setSliderValue] = useState<number[]>([0, 0]);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [dateIndex, setDateIndex] = useState(0);
  const [ranFunction, setRanFunction] = useState(false);
  useEffect(() => {
    const periodicallyIncrementIndex = async () => {
      for (var i = dateIndex; i < dates.length && 0.5 < backgroundOpacity; i++) {
        setDateIndex(i);
        const date = dates[i];
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDescriptionVisible(true);
        await new Promise((resolve) => setTimeout(resolve, readingTime(date.description)));
        setShowSliders(false)
        if (i !== dates.length - 1) {
          setDescriptionVisible(false);
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };
    if (0.5 < backgroundOpacity && !ranFunction) {
      setRanFunction(true);
      alertCurrentlyVisible();
      periodicallyIncrementIndex();
    }
  }, [backgroundOpacity, ranFunction, dateIndex]);
  useEffect(() => {
    const showDatesOnSlider = async () => {
      const date = dates[dateIndex];
      if (date.startDate) {
        setSliderValue([getDeltaFromFirst(date.startDate), getDeltaFromFirst(date.endDate)]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowSliders(true)
      }
    };
    if (dateIndex){
      showDatesOnSlider()
    }
  }, [dateIndex]);
  return (
    <CustomCardWithBackground
      cardStyle={{ height: "60vh", padding: theme.spacing(2) }}
      backgroundImageStyle={{ backgroundPosition: "40% 40%" }}
      alertCurrentlyVisible={alertCurrentlyVisible}
      backgroundOpacity={backgroundOpacity}
      srcAndBlur={srcAndBlur}
    >
      {backgroundOpacity ? (
        <Grid id="timeline" className={classes.timeline} container justify="center">
          <Grid item xs={12}>
            <Fade in={descriptionVisible}>
              <Typography className={classes.typography} variant="h3">
                {dates[dateIndex].description}
              </Typography>
            </Fade>
          </Grid>
          <Grid justify="center" container alignItems="flex-end">
            <Grid item xs={10}>
              <Slider
                value={sliderValue}
                valueLabelFormat={dayToDisplayDate}
                max={maxDate}
                valueLabelDisplay={dates[dateIndex].valueLabelDisplay && showSliders ? "on" : "off"}
                aria-labelledby="range-slider"
                ValueLabelComponent={ValueLabelComponent}
                classes = {{thumb: classes.thumb}}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : undefined}
    </CustomCardWithBackground>
  );
};
export default TimeLine;
