import React from 'react';
import ProgressiveImage, {ProgressiveImageProps} from 'react-progressive-image-loading';
import CustomCard from 'components/cards/custom_card';
import { useInView } from 'react-hook-inview';

const CustomCardWithBackground: React.FC<{children: React.ReactNode; progressiveImageProps: ProgressiveImageProps, }> = ({progressiveImageProps, children}) => {
  const [inViewRef, inView] = useInView();
  console.log(progressiveImageProps)
  return (
    <ProgressiveImage
      {...progressiveImageProps}
      render={(src, style) => {
          return(
            <CustomCard ref={inViewRef}>
              <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, maxHeight: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', zIndex: -1, opacity: inView ? 1 : 0, ...style, transition: 'all 500ms', backgroundPosition: '80% 80%' }}></div>
              {children}
            </CustomCard>
          )
        }
      }
    />
  );
};
export default CustomCardWithBackground;
