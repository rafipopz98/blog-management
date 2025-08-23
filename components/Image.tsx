import { IMAGEKIT_URL_ENDPOINT } from "@/helpers/constants/projectConstants";
import { IKImage } from "imagekitio-react";

type Props = {
  src: string;
  className?: string;
  w: number;
  h: number;
  alt: string;
};

const Image: React.FC<Props> = ({ src, className, w, h, alt }) => {
  return (
    <IKImage
      urlEndpoint={IMAGEKIT_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
};

export default Image;
