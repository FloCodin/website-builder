'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import type { Media } from '@/payload-types';

type Image = {
  image: Media;
  alt: string;
};

type Props = {
  images: Image[];
  autoplay?: boolean;
  loop?: boolean;
  showControls?: boolean;
  disableInnerContainer?: boolean;
};

const ImageSlider: FC<Props> = ({
                                  images,
                                  autoplay = true,
                                  loop = true,
                                  showControls = true,
                                }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={showControls}
        loop={loop}
        autoplay={autoplay ? { delay: 5000 } : false}
        className="w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.image?.url}
              alt={img.alt}
              className="w-full h-auto object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
