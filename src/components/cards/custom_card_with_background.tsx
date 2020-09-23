import React, { useEffect } from 'react';
import ProgressiveImage, { ProgressiveImageProps } from 'react-progressive-image-loading';
import CustomCard from 'components/cards/custom_card';
import { useInView } from 'react-hook-inview';

const CustomCardWithBackground: React.FC<{ children: React.ReactNode; progressiveImageProps: ProgressiveImageProps; backgroundImageStyle?: React.CSSProperties; cardStyle?: React.CSSProperties; photoCredit?: string; setInView?: (arg: boolean) => void, alertCurrentlyVisible: () => void }> = ({ progressiveImageProps, children, backgroundImageStyle, cardStyle, photoCredit, setInView, alertCurrentlyVisible }) => {
  const [inViewRef, inView] = useInView();
  useEffect(() => {
    if (setInView) {
      setInView(inView);
    }
    if (inView && alertCurrentlyVisible){
      alertCurrentlyVisible()
    }
  }, [inView]);
  return (
    <ProgressiveImage
      {...progressiveImageProps}
      render={(src, style) => {
        return (
          <CustomCard ref={inViewRef} style={cardStyle}>
            <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, maxHeight: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', zIndex: -1, opacity: inView ? 1 : 0, ...style, ...backgroundImageStyle, transition: 'all 500ms' }}>{photoCredit ? <p style={{ fontSize: 12, backgroundColor: 'black', color: 'white', position: 'absolute', right: '1%', top: 56 }}>{`Photo credit: ${photoCredit}`}</p> : null}</div>
            {children}
          </CustomCard>
        );
      }}
    />
  );
};
export default CustomCardWithBackground;
