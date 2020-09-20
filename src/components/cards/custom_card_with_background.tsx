import React from 'react';
import ProgressiveImage, { ProgressiveImageProps } from 'react-progressive-image-loading';
import CustomCard from 'components/cards/custom_card';
import { useInView } from 'react-hook-inview';

const CustomCardWithBackground: React.FC<{ children: React.ReactNode; progressiveImageProps: ProgressiveImageProps; backgroundImageStyle?: React.CSSProperties, cardStyle?: React.CSSProperties, photoCredit?: string }> = ({ progressiveImageProps, children, backgroundImageStyle, cardStyle, photoCredit }) => {
  const [inViewRef, inView] = useInView();
  return (
    <ProgressiveImage
      {...progressiveImageProps}
      render={(src, style) => {
        return (
          <CustomCard ref={inViewRef} style = { cardStyle }>
            <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, maxHeight: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', zIndex: -1, opacity: inView ? 1 : 0, ...style, ...backgroundImageStyle, transition: 'all 500ms' }}>

              <p style = {{ fontSize: 12, backgroundColor: 'black', color: 'white', position: 'absolute', right: '1%', top: 56 }}>
                {`Photo credit: ${photoCredit}`}
              </p>
            </div>
            {children}

          </CustomCard>
        );
      }}
    />
  );
};
export default CustomCardWithBackground;
