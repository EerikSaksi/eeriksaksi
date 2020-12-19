import React, { useEffect } from "react";
import ProgressiveImage, { ProgressiveImageProps } from "react-progressive-image-loading";
import CustomCard from "components/cards/custom_card";
import { useInView } from "react-hook-inview";

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
  const [inViewRef, inView] = useInView();
  const classes = useStyles();
  useEffect(() => {
    if (setInView) {
      setInView(inView);
    }
    if (inView) {
      alertCurrentlyVisible();
    }
  }, [inView, setInView, alertCurrentlyVisible]);
  return (
    <ProgressiveImage
      {...progressiveImageProps}
      render={(src, style) => {
        return (
          <CustomCard ref={inViewRef} style={cardStyle}>
            <div className={classes.backgroundImage} style={{ ...style, ...backgroundImageStyle, opacity: inView ? 1 : 0, backgroundImage: `url(${src})`, transition: 'all 350ms' }}>
              {photoCredit ? <p className={classes.credit}>{`Photo credit: ${photoCredit}`}</p> : null}
              {childrenOutsideCard}
            </div>
            {children}
          </CustomCard>
        );
      }}
    />
  );
};
export default CustomCardWithBackground;
