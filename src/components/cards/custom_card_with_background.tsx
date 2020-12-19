import React, { useEffect } from "react";
import ProgressiveImage, { ProgressiveImageProps } from "react-progressive-image-loading";
import CustomCard from "components/cards/custom_card";
import { useInView } from "react-intersection-observer";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  backgroundImage: {
    position: "absolute",
    top: 0,

    right: 0,
    left: 0,
    bottom: 0,
    maxHeight: "100%",
    backgroundSize: "cover",
    zIndex: -1,
  },
  credit: {
    fontSize: 12,
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    right: "1%",
    bottom: 0,
  },
}));
const threshold = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
const CustomCardWithBackground: React.FC<{
  children: React.ReactNode;
  progressiveImageProps: ProgressiveImageProps;
  backgroundImageStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  photoCredit?: string;
  setInView?: (arg: boolean) => void;
  alertCurrentlyVisible: () => void;
  childrenOutsideCard?: React.ReactNode;
}> = ({ progressiveImageProps, children, backgroundImageStyle, cardStyle, photoCredit, setInView, alertCurrentlyVisible, childrenOutsideCard }) => {
  const classes = useStyles();
  const { inView, ref, entry } = useInView({
    /* Optional options */
    threshold 
  });
  useEffect(() => {
    if (entry && entry.intersectionRatio >= 0.5) {
      if (setInView) setInView(true);
      alertCurrentlyVisible();
    }
  }, [entry, setInView, alertCurrentlyVisible]);
  return (
    <ProgressiveImage
      {...progressiveImageProps}
      render={(src, style) => {
        return (
          <React.Fragment>
          <CustomCard ref={ref} style={cardStyle}>
            <div className={classes.backgroundImage} style={{ ...style, ...backgroundImageStyle, opacity: inView && entry ? entry.intersectionRatio : 0, backgroundImage: `url(${src})`,  transition: 'all 50ms'}}>
              {photoCredit ? <p className={classes.credit}>{`Photo credit: ${photoCredit}`}</p> : null}
              {children}
            </div>

          </CustomCard>
        </React.Fragment>
        );
      }}
    />
  );
};
export default CustomCardWithBackground;
