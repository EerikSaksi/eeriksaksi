import React from "react";
import CustomCard from "components/cards/custom_card";

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
type SrcAndBlur = {src: string, blur: boolean}
const CustomCardWithBackground: React.FC<{
  children: React.ReactNode;
  backgroundImageStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  photoCredit?: string;
  backgroundOpacity: number;
  srcAndBlur: SrcAndBlur
}> = ({ children, backgroundImageStyle, cardStyle, photoCredit, backgroundOpacity, srcAndBlur }) => {
  const classes = useStyles();
  return (
    <CustomCard style={cardStyle}>
      <div className={classes.backgroundImage} style={{...backgroundImageStyle, opacity: backgroundOpacity, backgroundImage: `url(${srcAndBlur?.src})`, filter: srcAndBlur?.blur ? 'blur(8px)' : undefined,  transition: "all 30ms" }}>
        {photoCredit ? <p className={classes.credit}>{`Photo credit: ${photoCredit}`}</p> : null}
      </div>
      {children}
    </CustomCard>
  );
};
export default CustomCardWithBackground;
